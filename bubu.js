/* 補補 Bubu case study — 側邊導覽列（章節亮起、到「下一個專案」時淡出）與圖片點擊放大（燈箱）。 */
(function () {
  var toc = document.getElementById('bbToc');
  var links = Array.prototype.slice.call(toc.querySelectorAll('a'));
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  var overview = document.getElementById('overview');
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
  var dlg = document.getElementById('bbLightbox');
  var img = dlg.querySelector('img'), cap = dlg.querySelector('figcaption');
  var prev = dlg.querySelector('.bb-lightbox__prev'), next = dlg.querySelector('.bb-lightbox__next');
  var items = [], idx = 0, opener = null;
  var targets = document.querySelectorAll('main .bb-screen__img, main .cs-iphone__screen, main .bb-zoom__crop');
  Array.prototype.forEach.call(targets, function (el) {
    var im = el.querySelector('img'); if (!im) return;
    el.classList.add('bb-zoomable'); el.setAttribute('role', 'button'); el.setAttribute('tabindex', '0');
    el.setAttribute('aria-label', '放大圖片：' + im.alt);
    el.addEventListener('click', function () { open(el); });
    el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(el); } });
  });
  function groupOf(el) { return el.closest('.cs-stage, .bb-ut') || document; }
  function open(el) {
    opener = el;
    items = Array.prototype.slice.call(groupOf(el).querySelectorAll('.bb-zoomable'));
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
  dlg.querySelector('.bb-lightbox__close').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') step(-1); if (e.key === 'ArrowRight') step(1); });
  dlg.addEventListener('close', function () { document.documentElement.style.overflow = ''; if (opener) opener.focus(); });
})();
