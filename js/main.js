/* =========================================================
   ABROLE STUDIO — main.js
   Motion system, interactivity, content rendering
   ========================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------
     CONFIG — edit these values to personalise the site
     --------------------------------------------------------- */
  const CONFIG = {
    email: 'abrolestudio@gmail.com',
    phone: '+91 99188 52661',
    whatsapp: 'https://wa.me/919918852661',
    instagram: 'https://instagram.com/abrolestudio',
    youtube: 'https://youtube.com/@abrolestudio',
    resume: 'assets/Abhi_Yadav_Resume.pdf',
    /* Replace with YOUR YouTube video ID (the part after watch?v= ) */
    showreelId: 'aqz-KE-bpKQ',
    /* Add a Formspree / Getform endpoint to receive inquiries by email.
       Leave empty to fall back to opening the visitor's mail app. */
    formEndpoint: ''
  };

  /* ---------------------------------------------------------
     PORTFOLIO DATA — replace images / titles / add video IDs
     size: 'wide' (2 cols) | 'half' (1.5 cols) | 'sm' (1 col)
     video: YouTube ID to enable in-modal playback (optional)
     --------------------------------------------------------- */
  const WORK = [
    { title: 'Cinematic Video Editing', cat: 'Film · Edit · Grade', size: 'wide',
      img: 'assets/work-cinematic.jpg', video: '',
      desc: 'Narrative edits with cinematic pacing, colour grading and sound design built for emotion.',
      tags: ['Premiere Pro', 'Colour Grade', 'Sound Design'] },
    { title: 'Reels & Short-Form', cat: 'Social · Vertical', size: 'sm',
      img: 'assets/work-reels.jpg', video: '',
      desc: 'Scroll-stopping vertical content engineered for retention and reach.',
      tags: ['Reels', 'Hooks', 'Captions'] },
    { title: 'Motion Graphics', cat: 'Animation · VFX', size: 'sm',
      img: 'assets/work-motion.jpg', video: '',
      desc: 'Kinetic typography, animated logos and dynamic transitions that move with intent.',
      tags: ['Kinetic Type', 'Logo Reveal', 'Transitions'] },
    { title: 'Promotional Videos', cat: 'Ads · Product', size: 'sm',
      img: 'assets/work-promo.jpg', video: '',
      desc: 'High-impact promos that sell the story and the product in seconds.',
      tags: ['Product', 'Ad Film', 'Voiceover'] },
    { title: 'Brand Films & Commercials', cat: 'Brand · Commercial', size: 'sm',
      img: 'assets/work-brand.jpg', video: '',
      desc: 'Premium brand films with a strong visual language and confident storytelling.',
      tags: ['Brand Film', 'Story', 'Cinematic'] },
    { title: 'Graphic Design & Social Creatives', cat: 'Design · Campaign', size: 'half',
      img: 'assets/work-design.jpg', video: '',
      desc: 'Campaign visuals, social creatives and brand-focused design systems.',
      tags: ['Photoshop', 'Campaign', 'Branding'] },
    { title: 'AI-Powered Visual Content', cat: 'AI · Next-Gen', size: 'half',
      img: 'assets/work-ai.jpg', video: '',
      desc: 'AI-assisted visuals and cinematic AI scenes for next-generation content.',
      tags: ['AI Visuals', 'Concept', 'VFX'] }
  ];

  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.prototype.slice.call((c || document).querySelectorAll(s));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touch  = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  /* =========================================================
     1. PORTFOLIO RENDER
     ========================================================= */
  function renderWork() {
    const grid = $('#workGrid');
    if (!grid) return;
    const playSvg = '<svg viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>';
    grid.innerHTML = WORK.map(function (w, i) {
      const sizeClass = w.size === 'wide' ? ' work-card--wide' : w.size === 'half' ? ' work-card--half' : '';
      const play = w.video ? '<div class="work-play"><i>' + playSvg + '</i></div>' : '';
      return '' +
        '<article class="work-card' + sizeClass + '" data-index="' + i + '" tabindex="0" role="button" aria-label="View project: ' + w.title + '" data-reveal="up">' +
          '<div class="work-media"><img src="' + w.img + '" alt="' + w.title + '" loading="lazy" /></div>' +
          '<div class="work-tint"></div>' + play +
          '<span class="work-view">View Project ↗</span>' +
          '<div class="work-body">' +
            '<div class="work-cat">' + w.cat + '</div>' +
            '<h3 class="work-title">' + w.title + '</h3>' +
            '<p class="work-desc">' + w.desc + '</p>' +
          '</div>' +
        '</article>';
    }).join('');

    grid.addEventListener('click', function (e) {
      const card = e.target.closest('.work-card');
      if (card) openModal(+card.dataset.index);
    });
    grid.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const card = e.target.closest('.work-card');
      if (card) { e.preventDefault(); openModal(+card.dataset.index); }
    });
  }

  /* =========================================================
     2. MODAL
     ========================================================= */
  const modal = $('#modal');
  let lastFocus = null;

  function openModal(i) {
    const w = WORK[i];
    if (!w || !modal) return;
    lastFocus = document.activeElement;
    $('#modalCat').textContent = w.cat;
    $('#modalTitle').textContent = w.title;
    $('#modalDesc').textContent = w.desc;
    $('#modalTags').innerHTML = (w.tags || []).map(function (t) { return '<span>' + t + '</span>'; }).join('');
    $('#modalMedia').innerHTML = w.video
      ? '<iframe src="https://www.youtube-nocookie.com/embed/' + w.video + '?autoplay=1&rel=0" title="' + w.title + '" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>'
      : '<img src="' + w.img + '" alt="' + w.title + '" />';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    $('.modal-close', modal).focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    setTimeout(function () { $('#modalMedia').innerHTML = ''; }, 400);
    if (lastFocus) lastFocus.focus();
  }

  $$('[data-close]').forEach(function (el) { el.addEventListener('click', closeModal); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  /* =========================================================
     3. SHOWREEL
     ========================================================= */
  function initReel() {
    const play = $('#reelPlay');
    const frame = $('#reelFrame');
    if (!play || !frame) return;
    play.addEventListener('click', function () {
      const id = CONFIG.showreelId;
      if (!id) {
        const ov = $('#reelOverlay');
        ov.innerHTML = '<p style="font-family:var(--font-label);letter-spacing:.2em;text-transform:uppercase;font-size:.75rem;color:#cdd8ee">Showreel coming soon</p>';
        return;
      }
      const ov = $('#reelOverlay');
      if (ov) ov.remove();
      const ifr = document.createElement('iframe');
      ifr.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      ifr.title = 'ABROLE STUDIO showreel';
      ifr.allow = 'autoplay; encrypted-media; picture-in-picture';
      ifr.allowFullscreen = true;
      frame.appendChild(ifr);
    });
  }

  /* =========================================================
     4. HEADER / NAV / MENU
     ========================================================= */
  function initHeader() {
    const header = $('#header');
    const progress = $('#progress');
    function onScroll() {
      const y = window.scrollY || window.pageYOffset;
      header.classList.toggle('is-scrolled', y > 40);
      if (progress) {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = 'scaleX(' + (h > 0 ? y / h : 0) + ')';
      }
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const burger = $('#burger');
    const menu = $('#mobileMenu');
    burger.addEventListener('click', function () {
      const open = menu.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('no-scroll', open);
    });
    $$('#mobileMenu a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      });
    });

    /* active link on scroll */
    const links = $$('.nav a');
    const map = {};
    links.forEach(function (l) { map[l.getAttribute('href').slice(1)] = l; });
    const sections = ['home', 'portfolio', 'services', 'about', 'contact']
      .map(function (id) { return document.getElementById(id); }).filter(Boolean);
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          links.forEach(function (l) { l.classList.remove('is-active'); });
          map[en.target.id].classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* =========================================================
     5. CUSTOM CURSOR + MAGNETIC
     ========================================================= */
  function initCursor() {
    if (touch || reduce) return;
    const dot = $('#cursorDot'), ring = $('#cursorRing');
    let mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my;
    window.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)'; });
    (function loop() {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();
    const hoverSel = 'a, button, .work-card, input, select, textarea, .reel-play';
    document.addEventListener('mouseover', function (e) { if (e.target.closest(hoverSel)) ring.classList.add('is-hover'); });
    document.addEventListener('mouseout', function (e) { if (e.target.closest(hoverSel)) ring.classList.remove('is-hover'); });
    document.addEventListener('mouseleave', function () { dot.classList.add('is-hidden'); ring.classList.add('is-hidden'); });
    document.addEventListener('mouseenter', function () { dot.classList.remove('is-hidden'); ring.classList.remove('is-hidden'); });
  }

  function initMagnetic() {
    if (touch || reduce) return;
    $$('[data-magnetic]').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) / r.width;
        const y = (e.clientY - r.top - r.height / 2) / r.height;
        el.style.transform = 'translate(' + (x * 10) + 'px,' + (y * 8) + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* =========================================================
     6. COUNT-UP
     ========================================================= */
  function initCount() {
    const nums = $$('[data-count]');
    if (!nums.length) return;
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        const el = en.target;
        io.unobserve(el);
        const target = +el.dataset.count;
        if (reduce) { el.textContent = target; return; }
        const dur = 1900, t0 = performance.now();
        (function tick(now) {
          const p = Math.min((now - t0) / dur, 1);
          const e = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * e);
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
      });
    }, { threshold: 0.6 });
    nums.forEach(function (n) { io.observe(n); });
  }

  /* =========================================================
     7. GSAP MOTION
     ========================================================= */
  function initMotion() {
    if (!window.gsap) { document.documentElement.classList.add('no-motion'); return; }
    const gsap = window.gsap;
    if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);
    if (reduce) { document.documentElement.classList.add('no-motion'); return; }

    /* ---- Hero entrance ---- */
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo('.brand', { opacity: 0, x: -22 }, { opacity: 1, x: 0, duration: 0.8 })
      .fromTo('.nav a', { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07 }, '-=0.45')
      .fromTo('.header-cta .btn--draw', { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.35')
      .fromTo('.hero-hi', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.2')
      .fromTo('.hero-name .ln > span', { yPercent: 116, y: 0 }, { yPercent: 0, y: 0, duration: 1.05, stagger: 0.12, ease: 'power4.out' }, '-=0.35')
      .fromTo('.hero-role', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
      .fromTo('.hero-tag', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.52')
      .fromTo('.hero-actions .btn', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 }, '-=0.5')
      .fromTo('.hero-stats', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.42')
      .fromTo('.portrait', { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }, '-=1.15')
      .fromTo('.identity', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.75')
      .fromTo('.hero-socials .social-btn', { opacity: 0, x: 22 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.08 }, '-=0.6')
      .fromTo('.scroll-ind', { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.4');

    /* ---- Portrait light sweep ---- */
    const sweep = $('#portraitSweep');
    if (sweep) gsap.fromTo(sweep, { left: '-60%' }, { left: '130%', duration: 1.6, delay: 0.9, ease: 'power2.inOut' });

    /* ---- Scroll reveals ---- */
    if (window.ScrollTrigger) {
      $$('[data-reveal]').forEach(function (el) {
        if (el.closest('#hero')) return;
        const type = el.dataset.reveal;
        let from = { opacity: 0, y: 36 }, to = { opacity: 1, y: 0 };
        if (type === 'left')  { from = { opacity: 0, x: -48 }; to = { opacity: 1, x: 0 }; }
        if (type === 'right') { from = { opacity: 0, x: 48 };  to = { opacity: 1, x: 0 }; }
        if (type === 'scale') { from = { opacity: 0, scale: 0.94, y: 26 }; to = { opacity: 1, scale: 1, y: 0 }; }
        if (type === 'mask')  { from = { opacity: 0, scale: 1.05 }; to = { opacity: 1, scale: 1 }; }
        gsap.fromTo(el, from, Object.assign({}, to, {
          duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' }
        }));
      });

      /* ---- Parallax ---- */
      gsap.to('.hero-monogram', { yPercent: -14, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.portrait-wrap', { yPercent: 7, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
      $$('.work-card').forEach(function (card) {
        const img = $('.work-media img', card);
        if (img) gsap.fromTo(img, { yPercent: -4 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true } });
      });

      /* ---- Workflow line + steps ---- */
      const line = $('#flowLine');
      if (line) gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '#flow', start: 'top 78%', end: 'bottom 70%', scrub: true } });
      $$('.flow-step').forEach(function (step) {
        window.ScrollTrigger.create({
          trigger: step, start: 'top 70%', end: 'bottom 40%',
          onEnter: function () { step.classList.add('is-active'); },
          onEnterBack: function () { step.classList.add('is-active'); }
        });
      });
    }

    /* ---- Hero mouse parallax ---- */
    if (!touch) {
      const hero = $('#hero');
      hero.addEventListener('mousemove', function (e) {
        const cx = (e.clientX / window.innerWidth - 0.5);
        const cy = (e.clientY / window.innerHeight - 0.5);
        gsap.to('.hero-monogram', { x: cx * 34, y: cy * 22, duration: 1.1, ease: 'power2.out', overwrite: 'auto' });
        gsap.to('.portrait-wrap', { x: cx * -16, y: cy * -10, duration: 1.1, ease: 'power2.out', overwrite: 'auto' });
      });
    }
  }

  /* =========================================================
     8. CONTACT FORM
     ========================================================= */
  function initForm() {
    const form = $('#inquiryForm');
    if (!form) return;
    const status = $('#formStatus');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const type = (data.get('projectType') || '').toString().trim();
      const details = (data.get('details') || '').toString().trim();
      if (!name || !email || !type || !details) {
        status.className = 'form-status err';
        status.textContent = 'Please complete the required fields.';
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.className = 'form-status err';
        status.textContent = 'Please enter a valid email address.';
        return;
      }
      const subject = 'Project Inquiry — ' + type + ' — ' + name;
      const body = 'Name: ' + name + '\nEmail: ' + email + '\nProject Type: ' + type +
                   '\nBudget: ' + (data.get('budget') || '—') + '\n\n' + details;

      if (CONFIG.formEndpoint) {
        status.className = 'form-status';
        status.textContent = 'Sending…';
        fetch(CONFIG.formEndpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: data })
          .then(function (r) {
            if (r.ok) { status.className = 'form-status ok'; status.textContent = 'Thank you — your inquiry has been sent. I will reply shortly.'; form.reset(); }
            else { throw new Error('bad'); }
          })
          .catch(function () { status.className = 'form-status err'; status.textContent = 'Something went wrong. Please email abrolestudio@gmail.com directly.'; });
      } else {
        window.location.href = 'mailto:' + CONFIG.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        status.className = 'form-status ok';
        status.textContent = 'Opening your email app to send the inquiry…';
      }
    });
  }

  /* =========================================================
     9. MISC
     ========================================================= */
  function initMisc() {
    const y = $('#year'); if (y) y.textContent = new Date().getFullYear();
    /* smooth anchor scroll with header offset */
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        const id = a.getAttribute('href');
        if (id === '#' || id.length < 2) return;
        const t = document.querySelector(id);
        if (!t) return;
        e.preventDefault();
        const top = t.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' });
      });
    });
  }

  /* =========================================================
     BOOT
     ========================================================= */
  function boot() {
    renderWork();
    initHeader();
    initCursor();
    initMagnetic();
    initCount();
    initReel();
    initForm();
    initMisc();
    initMotion();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
