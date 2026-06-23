const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { kv } = require('@vercel/kv');

// Prevents HTML injection in the email body
function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    name,
    phone,
    email,
    message,
    _gotcha,
    formToken,
    'g-recaptcha-response': recaptchaToken,
  } = req.body || {};

  // Basic field validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  // ── LAYER 1: HONEYPOT ────────────────────────────────────────────────────
  // A real user never sees or fills _gotcha. If it has a value, it's a bot.
  // We return 200 (not 400) to deceive the bot into thinking it succeeded.
  if (_gotcha) {
    return res.status(200).json({ success: true });
  }

  // ── LAYER 2: RATE LIMITING ───────────────────────────────────────────────
  // 5 submissions per IP per hour. Vercel KV persists the counter across
  // all serverless function instances (in-memory would reset on each cold start).
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  try {
    const rateLimitKey = `rl:${ip}`;
    const count = await kv.incr(rateLimitKey);
    if (count === 1) {
      await kv.expire(rateLimitKey, 3600); // 1-hour sliding window
    }
    if (count > 5) {
      return res.status(429).json({ error: 'Too many submissions. Please try again in an hour.' });
    }
  } catch {
    // KV not yet configured — skip rate limiting rather than break the form
  }

  // ── LAYER 3: RECAPTCHA v3 ────────────────────────────────────────────────
  // We verify the token server-side with our secret key. The frontend token
  // alone is worthless — anyone can read the site key from the HTML source.
  // Google returns a score: 1.0 = definitely human, 0.0 = definitely bot.
  if (process.env.RECAPTCHA_SECRET_KEY && recaptchaToken) {
    try {
      const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}&remoteip=${ip}`,
      });
      const result = await verifyRes.json();
      if (!result.success || result.score < 0.5) {
        return res.status(403).json({ error: 'Bot verification failed. Please try again.' });
      }
    } catch {
      // If reCAPTCHA is unreachable, allow the submission through
    }
  }

  // ── LAYER 4: HMAC TIME CHECK ─────────────────────────────────────────────
  // formToken = "<timestamp>.<hmac-signature>"
  // We re-compute the expected HMAC and compare. If it doesn't match, the
  // token was forged. If age < 2s, it was submitted by a script, not a human.
  if (process.env.FORM_SECRET && formToken) {
    const dotIndex = formToken.lastIndexOf('.');
    const timestamp = formToken.slice(0, dotIndex);
    const signature = formToken.slice(dotIndex + 1);
    const expected = crypto
      .createHmac('sha256', process.env.FORM_SECRET)
      .update(timestamp)
      .digest('hex');
    const age = Date.now() - parseInt(timestamp, 10);
    if (signature !== expected || age < 2000 || age > 3_600_000) {
      return res.status(403).json({ error: 'Form session expired. Please refresh and try again.' });
    }
  }

  // ── EMAIL ────────────────────────────────────────────────────────────────
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"SmartHub Website" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    replyTo: email,
    subject: `New Enquiry — ${escapeHtml(name)}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;">
        <h2 style="color:#0A2846;border-bottom:2px solid #1AB5AD;padding-bottom:8px;">
          New Contact Form Submission
        </h2>
        <table style="border-collapse:collapse;width:100%;">
          <tr>
            <td style="padding:10px 8px;font-weight:600;color:#555;width:100px;">Name</td>
            <td style="padding:10px 8px;">${escapeHtml(name)}</td>
          </tr>
          <tr style="background:#f9f9f9;">
            <td style="padding:10px 8px;font-weight:600;color:#555;">Phone</td>
            <td style="padding:10px 8px;">${escapeHtml(phone || 'Not provided')}</td>
          </tr>
          <tr>
            <td style="padding:10px 8px;font-weight:600;color:#555;">Email</td>
            <td style="padding:10px 8px;">
              <a href="mailto:${escapeHtml(email)}" style="color:#1AB5AD;">${escapeHtml(email)}</a>
            </td>
          </tr>
          <tr style="background:#f9f9f9;">
            <td style="padding:10px 8px;font-weight:600;color:#555;vertical-align:top;">Message</td>
            <td style="padding:10px 8px;">${escapeHtml(message).replace(/\n/g, '<br>')}</td>
          </tr>
        </table>
        <p style="color:#aaa;font-size:11px;margin-top:24px;">
          Submitted via smarthubc.com &nbsp;·&nbsp; IP: ${escapeHtml(ip)}
        </p>
      </div>
    `,
  });

  return res.status(200).json({ success: true });
};
