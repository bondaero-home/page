/* 모든 페이지 공통: 모바일 메뉴 / (하위 페이지) 맨 위로·아코디언·블로그 필터·글 갤러리 — SiteFooter에서 불러온다 */
(function(){
  var isHome = document.body.getAttribute('data-page') === 'home';

  /* 모바일 메뉴 */
  var mnav = document.querySelector('.mnav'), btn = document.querySelector('.menu-btn');
  if (mnav && btn) {
    function open(){ mnav.classList.add('open'); document.body.classList.add('lock'); btn.setAttribute('aria-expanded','true'); }
    function close(){ mnav.classList.remove('open'); document.body.classList.remove('lock'); btn.setAttribute('aria-expanded','false'); }
    btn.addEventListener('click', open);
    mnav.querySelector('.mnav-close').addEventListener('click', close);
    mnav.addEventListener('click', function(e){ if (e.target === mnav) close(); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') close(); });
    mnav.querySelectorAll('nav a').forEach(function(a){ a.addEventListener('click', close); });
  }

  if (isHome) return; /* 메인은 자체 스크립트가 아래 기능을 이미 가지고 있음 */

  /* 맨 위로 */
  var top = document.querySelector('.to-top');
  if (top) {
    window.addEventListener('scroll', function(){ top.classList.toggle('show', scrollY > 600); }, {passive:true});
    top.addEventListener('click', function(){ scrollTo({top:0, behavior:'smooth'}); });
  }

  /* 아코디언 (그룹 단위로 하나만 열림) */
  document.querySelectorAll('.acc').forEach(function(group){
    var items = [].slice.call(group.querySelectorAll('.acc-item'));
    function setH(it){ var p = it.querySelector('.acc-panel'); p.style.height = it.classList.contains('open') ? p.scrollHeight + 'px' : '0px'; }
    items.forEach(function(it){
      setH(it);
      it.querySelector('button').addEventListener('click', function(){
        var was = it.classList.contains('open');
        items.forEach(function(o){ o.classList.remove('open'); o.querySelector('button').setAttribute('aria-expanded','false'); setH(o); });
        if (!was) { it.classList.add('open'); it.querySelector('button').setAttribute('aria-expanded','true'); setH(it); }
      });
    });
    window.addEventListener('resize', function(){ items.forEach(setH); });
  });

  /* 블로그 카테고리 필터 (#cases 로 들어오면 시공사례만) */
  var chips = document.querySelectorAll('[data-filter]');
  if (chips.length) {
    chips.forEach(function(c){
      c.addEventListener('click', function(){
        var f = c.getAttribute('data-filter');
        chips.forEach(function(o){ o.classList.toggle('on', o === c); });
        document.querySelectorAll('[data-cat]').forEach(function(p){
          p.hidden = !(f === 'all' || p.getAttribute('data-cat') === f);
        });
      });
    });
    if (location.hash === '#cases') {
      var cc = document.querySelector('[data-filter="시공사례"]');
      if (cc) cc.click();
    }
  }

  /* 글 상세 갤러리: 썸네일 누르면 큰 사진 교체, 큰 사진 누르면 다음 장 */
  var gal = document.querySelector('.gal');
  if (gal) {
    var items = JSON.parse(gal.getAttribute('data-items')), cur = 0;
    var mainImg = gal.querySelector('.gal-main img'), cnt = gal.querySelector('.gal-count'),
        cap = gal.querySelector('.gal-cap'), thumbs = [].slice.call(gal.querySelectorAll('.gal-thumbs button'));
    function show(i){
      cur = (i + items.length) % items.length;
      mainImg.style.opacity = 0;
      setTimeout(function(){ mainImg.src = items[cur].src; mainImg.alt = items[cur].alt; mainImg.style.opacity = 1; }, 150);
      cnt.textContent = (cur + 1) + ' / ' + items.length;
      cap.textContent = items[cur].cap || '';
      thumbs.forEach(function(t){ t.classList.toggle('on', +t.getAttribute('data-i') === cur); });
    }
    thumbs.forEach(function(t){
      t.addEventListener('click', function(){
        var i = +t.getAttribute('data-i');
        show(t.querySelector('.more') && cur === i ? i + 1 : i);
      });
    });
    gal.querySelector('.gal-main').addEventListener('click', function(){ show(cur + 1); });
  }
})();
