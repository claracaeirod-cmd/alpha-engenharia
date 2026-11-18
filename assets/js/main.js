/* ==========================================================================
   ALPHA Engenharia e Construção — Interações
   JavaScript puro, sem dependências.
   ========================================================================== */
(function () {
  'use strict';

  var WHATSAPP_NUMBER = '5521993674473'; // altere aqui se o número mudar
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');

  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function waLink(text) { return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text); }

  /* ---------- NAV: muda ao rolar + link ativo ---------- */
  var nav = $('#nav');
  function onScrollNav() { nav.classList.toggle('scrolled', window.scrollY > 40); }
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });

  var navLinks = $$('.nav__links a');
  if ('IntersectionObserver' in window && navLinks.length) {
    var sectionObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          navLinks.forEach(function (a) {
            var on = a.getAttribute('href') === '#' + e.target.id;
            a.classList.toggle('is-active', on);
            if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.forEach(function (a) { var t = $(a.getAttribute('href')); if (t) sectionObs.observe(t); });
  }

  /* ---------- MENU MOBILE ---------- */
  var toggle = $('#navToggle');
  var mobileNav = $('#mobileNav');
  function setMenu(open) {
    nav.classList.toggle('menu-open', open);
    mobileNav.classList.toggle('active', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    mobileNav.setAttribute('aria-hidden', String(!open));
    if ('inert' in mobileNav) mobileNav.inert = !open;
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) { var first = $('a', mobileNav); if (first) first.focus(); }
  }
  if (toggle && mobileNav) {
    if ('inert' in mobileNav) mobileNav.inert = true;
    toggle.addEventListener('click', function () { setMenu(!mobileNav.classList.contains('active')); });
    $$('a', mobileNav).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) { setMenu(false); toggle.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth >= 1024 && mobileNav.classList.contains('active')) setMenu(false); });
  }

  /* ---------- REVEAL AO ROLAR ---------- */
  var reveals = $$('.reveal');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { revealObs.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- PARALLAX: foto do hero + linhas douradas ---------- */
  var heroImg = $('.hero__frame img');
  var curves = $$('[data-parallax]');
  var timeline = $('.timeline');
  var progress = $('.timeline__progress');
  var ticking = false;
  function onScrollFx() {
    var y = window.scrollY;
    var vh = window.innerHeight;
    if (!reduceMotion) {
      if (heroImg && y < vh * 1.2) heroImg.style.transform = 'scale(1.06) translateY(' + (y * 0.08) + 'px)';
      curves.forEach(function (el) {
        var r = el.parentElement.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.15;
        var base = el.getAttribute('data-flip') ? 'scaleX(-1) ' : '';
        el.style.transform = base + 'translateY(' + ((r.top - vh / 2) * -speed).toFixed(1) + 'px)';
      });
    }
    if (timeline && progress) {
      var t = timeline.getBoundingClientRect();
      var p = Math.min(1, Math.max(0, (vh * 0.6 - t.top) / t.height));
      progress.style.height = (p * (t.height - 16)) + 'px';
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { requestAnimationFrame(onScrollFx); ticking = true; } }, { passive: true });
  onScrollFx();

  /* ---------- CONTADORES ---------- */
  var counters = $$('[data-count]');
  function runCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var valueEl = $('.value', el) || el;
    if (reduceMotion) { valueEl.textContent = target; return; }
    var start = null, dur = 1400;
    function step(ts) {
      if (!start) start = ts;
      var k = Math.min(1, (ts - start) / dur);
      var eased = 1 - Math.pow(1 - k, 3);
      valueEl.textContent = Math.round(target * eased);
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var countObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { runCounter(e.target); countObs.unobserve(e.target); } });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { countObs.observe(el); });
  }

  /* ---------- ACORDEÃO DE SERVIÇOS ---------- */
  var accItems = $$('.acc-item');
  accItems.forEach(function (item) {
    var btn = $('.acc-trigger', item);
    var panel = $('.acc-panel', item);
    btn.addEventListener('click', function () {
      var willOpen = !item.classList.contains('is-open');
      accItems.forEach(function (other) {
        other.classList.remove('is-open');
        $('.acc-trigger', other).setAttribute('aria-expanded', 'false');
        if ('inert' in other) $('.acc-panel', other).inert = true;
      });
      if (willOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        if ('inert' in panel) panel.inert = false;
      }
    });
    if (!item.classList.contains('is-open') && 'inert' in panel) panel.inert = true;
  });

  /* ---------- FILTRO DE OBRAS ---------- */
  var chips = $$('.chip[data-filter]');
  var works = $$('.work');
  var status = $('#worksStatus');
  chips.forEach(function (chip) {
    var f = chip.getAttribute('data-filter');
    var n = f === 'todos' ? works.length : works.filter(function (w) { return w.getAttribute('data-cat') === f; }).length;
    var c = $('.count', chip); if (c) c.textContent = '(' + n + ')';
    chip.addEventListener('click', function () {
      chips.forEach(function (c2) { c2.setAttribute('aria-pressed', 'false'); });
      chip.setAttribute('aria-pressed', 'true');
      var shown = 0;
      works.forEach(function (w) {
        var show = f === 'todos' || w.getAttribute('data-cat') === f;
        w.hidden = !show;
        if (show) { shown++; w.classList.add('visible'); }
      });
      if (status) status.textContent = shown + (shown === 1 ? ' obra exibida' : ' obras exibidas');
    });
  });

  /* ---------- MODAL DE OBRA ---------- */
  var modal = $('#workModal');
  var modalContent = $('#workModalContent');
  var lastTrigger = null;
  var currentGallery = [];

  function openWork(id, trigger) {
    var tpl = document.getElementById('obra-' + id);
    if (!tpl || !modal) return;
    lastTrigger = trigger;
    modalContent.innerHTML = '';
    modalContent.appendChild(tpl.content.cloneNode(true));
    currentGallery = $$('.gallery button', modalContent).map(function (b) {
      return { src: b.getAttribute('data-full'), alt: $('img', b).getAttribute('alt') };
    });
    $$('.gallery button', modalContent).forEach(function (b, i) {
      b.addEventListener('click', function () { openLightbox(i, b); });
    });
    if (typeof modal.showModal === 'function') modal.showModal(); else modal.setAttribute('open', '');
    document.body.style.overflow = 'hidden';
    $('.modal__scroll', modal).scrollTop = 0;
    $('.modal__close', modal).focus();
  }
  function closeWork() {
    if (!modal) return;
    if (typeof modal.close === 'function') modal.close(); else modal.removeAttribute('open');
  }
  if (modal) {
    modal.addEventListener('close', function () { document.body.style.overflow = ''; if (lastTrigger) lastTrigger.focus(); });
    $('.modal__close', modal).addEventListener('click', closeWork);
    modal.addEventListener('click', function (e) { if (e.target === modal) closeWork(); });
  }
  $$('.work__btn').forEach(function (b) {
    b.addEventListener('click', function () { openWork(b.getAttribute('data-work'), b); });
  });

  /* ---------- LIGHTBOX ---------- */
  var lb = $('#lightbox');
  var lbImg = lb ? $('img', lb) : null;
  var lbCount = lb ? $('.lightbox__count', lb) : null;
  var lbIndex = 0, lbTrigger = null;
  function showLb(i) {
    if (!currentGallery.length) return;
    lbIndex = (i + currentGallery.length) % currentGallery.length;
    lbImg.src = currentGallery[lbIndex].src;
    lbImg.alt = currentGallery[lbIndex].alt;
    lbCount.textContent = (lbIndex + 1) + ' de ' + currentGallery.length;
  }
  function openLightbox(i, trigger) {
    lbTrigger = trigger; showLb(i);
    if (typeof lb.showModal === 'function') lb.showModal(); else lb.setAttribute('open', '');
    $('.lightbox__close', lb).focus();
  }
  if (lb) {
    $('.lightbox__close', lb).addEventListener('click', function () { lb.close(); });
    $('.lightbox__prev', lb).addEventListener('click', function () { showLb(lbIndex - 1); });
    $('.lightbox__next', lb).addEventListener('click', function () { showLb(lbIndex + 1); });
    lb.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') showLb(lbIndex - 1);
      if (e.key === 'ArrowRight') showLb(lbIndex + 1);
    });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lightbox__stage')) lb.close(); });
    lb.addEventListener('close', function () { if (lbTrigger) lbTrigger.focus(); });
    var touchX = null;
    lb.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) showLb(lbIndex + (dx < 0 ? 1 : -1));
      touchX = null;
    });
  }

  /* ---------- FORMULÁRIO → WHATSAPP ---------- */
  var form = $('#contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      $$('[required]', form).forEach(function (input) {
        var field = input.closest('.field');
        var valid = input.value.trim() !== '';
        field.classList.toggle('invalid', !valid);
        input.setAttribute('aria-invalid', String(!valid));
        if (!valid && ok) { input.focus(); ok = false; }
      });
      if (!ok) return;
      var v = function (n) { return (form.elements[n].value || '').trim(); };
      var lines = [
        'Olá, ALPHA Engenharia! Vim pelo site e gostaria de solicitar um orçamento.',
        '',
        '*Nome:* ' + v('nome'),
        v('empresa') ? '*Empresa:* ' + v('empresa') : null,
        '*Tipo de projeto:* ' + v('tipo'),
        v('mensagem') ? '*Mensagem:* ' + v('mensagem') : null
      ].filter(function (l) { return l !== null; });
      window.open(waLink(lines.join('\n')), '_blank', 'noopener');
    });
    $$('[required]', form).forEach(function (input) {
      input.addEventListener('input', function () {
        if (input.value.trim()) { input.closest('.field').classList.remove('invalid'); input.setAttribute('aria-invalid', 'false'); }
      });
    });
  }

  /* ---------- ANO NO RODAPÉ ---------- */
  var year = $('#year'); if (year) year.textContent = new Date().getFullYear();
})();
