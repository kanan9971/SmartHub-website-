const crypto = require('crypto');

// Issues a signed timestamp. The contact endpoint verifies this to prove
// (a) the token came from our server and (b) at least 2 seconds have passed.
module.exports = function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac('sha256', process.env.FORM_SECRET)
    .update(timestamp)
    .digest('hex');
  res.status(200).json({ token: `${timestamp}.${signature}` });
};
