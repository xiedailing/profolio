/* 頂端導覽列（.site-header）：固定在頂端；往下捲動時收起，往上捲動時馬上出現；頁面最頂端時一律顯示。
   首頁與兩個案例頁共用。
   同步兩個 CSS 變數（寫在 <html> 上），讓固定小標題與側邊導覽在導覽列出現時往下讓位：
   --header-h       導覽列的高度（也用在 scroll-padding-top，錨點跳轉時不被導覽列蓋住）
   --header-offset  目前露出的高度（收起時為 0） */
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;

  var root = document.documentElement;
  var hidden = false;
  var lastY = window.scrollY;
  var ticking = false;
  var THRESHOLD = 6;   /* 小於這個捲動量不算（避免觸控板抖動讓導覽列閃爍） */

  function setVars() {
    var h = header.offsetHeight;
    root.style.setProperty('--header-h', h + 'px');
    root.style.setProperty('--header-offset', hidden ? '0px' : h + 'px');
  }
  function show() { if (hidden) { hidden = false; header.classList.remove('is-hidden'); setVars(); } }
  function hide() { if (!hidden) { hidden = true; header.classList.add('is-hidden'); setVars(); } }

  function update() {
    var y = window.scrollY, d = y - lastY;
    if (y <= 8) { show(); lastY = y; }
    else if (d > THRESHOLD && y > header.offsetHeight) { hide(); lastY = y; }
    else if (d < -THRESHOLD) { show(); lastY = y; }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', setVars);
  /* 收起後導覽列不可見（見 styles.css 的 visibility: hidden），連結無法被聚焦；用鍵盤往上 Shift+Tab 時，頁面往上捲會讓導覽列先出現。 */

  setVars();
})();
