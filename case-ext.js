/* Case study 共用腳本（補補、TROVA 共用）：
   1. 側邊導覽列：捲過頁首才出現、依目前章節亮起、到「下一個專案」時淡出。需要 #overview、#next 與 .cs-toc。
   2. 圖片點擊放大（燈箱）：對所有 [data-zoom] 容器生效，自動建立 <dialog>。 */

(function () {
  var toc = document.querySelector('.cs-toc');
  var overview = document.getElementById('overview');
  if (!toc || !overview) return;
  var links = Array.prototype.slice.call(toc.querySelectorAll('a'));
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  function update() {
    var pastHero = overview.getBoundingClientRect().bottom < 160;
    var nextEl = document.getElementById('next');
    var atNext = nextEl && nextEl.getBoundingClientRect().top < window.innerHeight * 0.75;
    toc.classList.toggle('is-on', pastHero && !atNext);
    var current = null;
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = id;
    });
    links.forEach(function (a) { a.classList.remove('is-active'); });
    if (current && pastHero) map[current].classList.add('is-active');
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

(function () {
  var targets = document.querySelectorAll('main [data-zoom]');
  if (!targets.length || !window.HTMLDialogElement) return;

  var dlg = document.createElement('dialog');
  dlg.className = 'cs-lightbox';
  dlg.setAttribute('aria-label', '圖片放大檢視');
  dlg.setAttribute('lang', 'zh-Hant');
  dlg.innerHTML =
    '<button class="cs-lightbox__close" type="button" aria-label="關閉">✕</button>' +
    '<button class="cs-lightbox__prev" type="button" aria-label="上一張">‹</button>' +
    '<figure><img alt=""><figcaption></figcaption></figure>' +
    '<button class="cs-lightbox__next" type="button" aria-label="下一張">›</button>';
  document.body.appendChild(dlg);

  var img = dlg.querySelector('img'), cap = dlg.querySelector('figcaption');
  var prev = dlg.querySelector('.cs-lightbox__prev'), next = dlg.querySelector('.cs-lightbox__next');
  var items = [], idx = 0, opener = null;

  Array.prototype.forEach.call(targets, function (el) {
    var im = el.querySelector('img'); if (!im) return;
    el.classList.add('cs-zoomable'); el.setAttribute('role', 'button'); el.setAttribute('tabindex', '0');
    el.setAttribute('aria-label', '放大圖片：' + im.alt);
    el.addEventListener('click', function () { open(el); });
    el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(el); } });
  });

  /* 切換範圍：有 data-zoom-group 就用它（例如 TROVA 的核心解法 A–D 連續切換），否則只在同一個 .cs-stage 內切換 */
  function groupOf(el) { return el.closest('[data-zoom-group]') || el.closest('.cs-stage') || document; }
  function open(el) {
    opener = el;
    items = Array.prototype.slice.call(groupOf(el).querySelectorAll('.cs-zoomable'));
    idx = items.indexOf(el); show(); dlg.showModal(); document.documentElement.style.overflow = 'hidden';
  }
  function show() {
    var im = items[idx].querySelector('img');
    img.src = im.currentSrc || im.src; img.alt = im.alt; cap.textContent = im.alt;
    prev.hidden = next.hidden = items.length < 2;
  }
  function step(d) { if (items.length < 2) return; idx = (idx + d + items.length) % items.length; show(); }
  prev.addEventListener('click', function () { step(-1); });
  next.addEventListener('click', function () { step(1); });
  dlg.querySelector('.cs-lightbox__close').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') step(-1); if (e.key === 'ArrowRight') step(1); });
  dlg.addEventListener('close', function () { document.documentElement.style.overflow = ''; if (opener) opener.focus(); });
})();
