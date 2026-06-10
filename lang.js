(function () {
  const KEY = 'smarthub_lang';

  function applyLang(lang) {
    document.documentElement.setAttribute('data-lang', lang);
    localStorage.setItem(KEY, lang);
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var saved = localStorage.getItem(KEY) || 'en';
    applyLang(saved);

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLang(btn.dataset.lang);
      });
    });
  });
})();
