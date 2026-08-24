/**
 * TamilSelvan V - Portfolio Interaction & Animation Engine
 */

const certificatesData = [
  { name: 'Google Analytics Certification', issuer: 'Google', meta: 'Issued Dec 15, 2025 · Expires Dec 15, 2026', img: 'assets/images/cert-google-analytics.jpg' },
  { name: 'SEO Toolkit Crash Course', issuer: 'Semrush Academy', meta: 'Completed · Expires 13 Nov 2026', img: 'assets/images/cert-semrush-toolkit.jpg' },
  { name: 'SEO Certified', issuer: 'HubSpot Academy', meta: 'Valid Nov 14 2025 · Dec 14 2026', img: 'assets/images/cert-hubspot-seo.jpg' },
  { name: 'Social Media Certified', issuer: 'HubSpot Academy', meta: 'Valid Nov 14 2025 · Dec 14 2027', img: 'assets/images/cert-hubspot-social-media.jpg' },
  { name: 'Fundamentals of Digital Marketing', issuer: 'Digital Marketing Course', meta: 'Completed 13 Nov 2025', img: 'assets/images/cert-digital-marketing-fundamentals.jpg' },
  { name: 'Digital Marketing Strategy', issuer: 'Great Learning', meta: 'Completed Nov 23, 2025', img: 'assets/images/cert-great-learning-strategy.jpg' },
];

const projectsData = [
  {
    name: 'Digital Marketer & SEO Specialist',
    company: 'Right Educate | Chennai, India',
    cat: 'Digital Marketing & SEO',
    period: 'May 2025 – Present',
    role: 'Digital Marketer & SEO Specialist',
    overview: 'Working on end-to-end digital marketing activities to help businesses grow online and improve their brand visibility.',
    responsibilities: [
      'Managed and optimized Google Business Profiles (GMB) including posts, products, services, photos, and reviews.',
      'Monitored insights and performance to improve calls, direction requests, and website clicks.',
      'Improved local visibility, engagement, and customer interactions through GMB optimization.',
      'Responded to reviews and maintained a strong business reputation.',
      'Created and published regular Google Posts and offers to increase reach and engagement.',
      'Helped businesses improve local SEO and generate quality leads consistently.'
    ],
    tools: ['Google Business Profile (GMB)', 'Local SEO', 'Google Analytics (GA4)', 'Search Console', 'Google Posts', 'Lead Generation'],
    tags: ['GMB', 'Local SEO', 'Google Posts', 'Lead Generation']
  },
  {
    name: 'WordPress Developer',
    company: 'WordPress Engineering | Chennai, India',
    cat: 'WordPress Development',
    period: 'Jan 2024 – Present',
    role: 'WordPress Developer',
    overview: 'Designed, developed, and optimized WordPress websites that are fast, responsive, and SEO-friendly.',
    responsibilities: [
      'Built and customized WordPress websites using themes, plugins & page builders.',
      'Optimized website speed, performance, and mobile responsiveness.',
      'Implemented on-page SEO, meta optimization, schema, and clean URL structure.',
      'Handled website content updates, landing pages, and blog management.'
    ],
    tools: ['WordPress CMS', 'Elementor', 'Speed Optimization', 'Schema & Metadata', 'Clean URL Structure', 'WooCommerce'],
    tags: ['WordPress', 'Speed Optimization', 'On-Page SEO', 'Elementor']
  },
  {
    name: 'SEO & Keyword Ranking',
    company: 'SEO & Content Strategy | Chennai, India',
    cat: 'SEO & Ranking',
    period: 'Jan 2024 – Present',
    role: 'SEO & Keyword Ranking Specialist',
    overview: 'Worked on multiple SEO projects and improved keyword rankings with result-driven strategies.',
    achievements: [
      '"Natural Agarbatti" – Ranked on Top Positions',
      '"Palo Santo Stick" – Ranked on Top Positions'
    ],
    responsibilities: [
      'Performed keyword research, competitor analysis & search intent mapping.',
      'On-page SEO: Title, Meta, Headers, Content, Internal Linking, Image SEO.',
      'Off-page SEO: Link building, directory submissions, article submissions.',
      'Technical SEO: Site speed, mobile-friendliness, schema, sitemap, robots.txt.',
      'Monitored keyword rankings using GSC, SEMrush, and other SEO tools.'
    ],
    tools: ['Keyword Research', 'Technical SEO', 'Search Console', 'Semrush', 'Ahrefs', 'Link Building'],
    tags: ['Technical SEO', 'Keyword Ranking', 'Search Console', 'Semrush']
  }
];

/* ---------- Globally accessible modal triggers ---------- */
window.openCertModal = function (i) {
  const c = certificatesData[i];
  if (!c) return;
  const box = document.getElementById('cert-modal-box');
  const modal = document.getElementById('cert-modal');
  if (!box || !modal) return;

  box.innerHTML = `
    <button class="modal-close" id="cert-lightbox-close" aria-label="Close modal">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>
    <div style="margin-bottom:14px;">
      <span class="eyebrow" style="margin-bottom:8px; padding:4px 12px; font-size:10.5px;">${c.issuer}</span>
      <h3 style="font-size:20px; margin-bottom:4px;">${c.name}</h3>
      <div style="font-size:12px; color:var(--dim); font-family:var(--font-mono);">${c.meta}</div>
    </div>
    <div class="cert-lightbox-img-wrap" onclick="window.open('${c.img}', '_blank')">
      <img src="${c.img}" alt="${c.name}" title="Click to view full original image" />
    </div>
  `;

  document.getElementById('cert-lightbox-close').addEventListener('click', (e) => {
    e.stopPropagation();
    window.closeCertModal();
  });

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeCertModal = function (e) {
  if (e && e.target && e.target.id !== 'cert-modal' && e.target.id !== 'cert-lightbox-close' && !e.target.closest('#cert-lightbox-close')) {
    return;
  }
  const m = document.getElementById('cert-modal');
  if (m) {
    m.classList.remove('open');
    document.body.style.overflow = '';
  }
};

window.openModal = function (i) {
  const p = projectsData[i];
  if (!p) return;
  const box = document.getElementById('modal-box');
  const modal = document.getElementById('proj-modal');
  if (!box || !modal) return;

  let achieveHTML = '';
  if (p.achievements && p.achievements.length) {
    achieveHTML = `
      <div class="achieve-box-card" style="margin: 16px 0;">
        <div class="achieve-card-title">🏆 Key Achievements</div>
        ${p.achievements.map(a => `<span class="achieve-card-chip">${a}</span>`).join('')}
      </div>
    `;
  }

  box.innerHTML = `
    <button class="modal-close" id="modal-close-btn" aria-label="Close modal">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>
    <span class="cat-tag">${p.cat}</span>
    <h3>${p.name}</h3>
    <div class="role">${p.company || p.role}</div>
    <h5>Project Overview</h5>
    <p style="font-size:14px; color:var(--muted); line-height:1.65;">${p.overview}</p>
    ${achieveHTML}
    <h5>Key Responsibilities & Deliverables</h5>
    <ul>${p.responsibilities.map(r => `<li>${r}</li>`).join('')}</ul>
    <h5>Tools & Technologies Used</h5>
    <div class="chip-row" style="margin-top:10px;">${p.tools.map(t => `<span>${t}</span>`).join('')}</div>
  `;

  document.getElementById('modal-close-btn').addEventListener('click', window.closeModal);
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeModal = function () {
  const m = document.getElementById('proj-modal');
  if (m) {
    m.classList.remove('open');
    document.body.style.overflow = '';
  }
};

document.addEventListener('DOMContentLoaded', initApp);
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  initApp();
}

let appInitialized = false;

function initApp() {
  if (appInitialized) return;
  appInitialized = true;

  /* ---------- SILKY BUTTER SMOOTH SCROLL (Calibrated Momentum Damping) ---------- */
  let lenis = null;
  if (typeof Lenis !== 'undefined' && !REDUCE_MOTION) {
    lenis = new Lenis({
      duration: 1.35, // Smooth glide duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple cubic-exponential glide
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.85, // Calibrated so it never scrolls too fast
      touchMultiplier: 1.1,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (window.ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }

    // Smooth ease-in-out anchor scrolling helper
    window.smoothScrollToTarget = function(targetEl) {
      if (!targetEl) return;
      const headerHeight = 76;
      if (lenis) {
        lenis.scrollTo(targetEl, {
          offset: -headerHeight,
          duration: 1.6, // Gentle duration
          // Gentle cubic ease-in-out curve
          easing: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
        });
      } else {
        const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight;
        const startPos = window.scrollY;
        const distance = targetPos - startPos;
        const duration = 1300;
        let startTime = null;
        function easeInOutCubic(t) {
          return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }
        function step(time) {
          if (!startTime) startTime = time;
          const progress = Math.min((time - startTime) / duration, 1);
          window.scrollTo(0, startPos + distance * easeInOutCubic(progress));
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      }
    };

    // Universal navigation links listener with gentle ease-in-out
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const mobileMenu = document.getElementById('mobile-menu');
          const burger = document.getElementById('burger-btn');
          if (mobileMenu && mobileMenu.classList.contains('open')) {
            mobileMenu.classList.remove('open');
            if (burger) burger.classList.remove('open');
            document.body.style.overflow = '';
          }
          window.smoothScrollToTarget(target);
        }
      });
    });
  }

  const REDUCE_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const IS_FINE_POINTER = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ---------- Mobile Menu Toggle (Instant 2-way toggle) ---------- */
  const burger = document.getElementById('burger-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (burger && mobileMenu) {
    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileMenu.classList.toggle('open');
      burger.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    document.querySelectorAll('.m-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        burger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close when clicking backdrop area
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove('open');
        burger.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

            /* ---------- FLAWLESS BUTTER-SMOOTH CUSTOM CURSOR ENGINE ---------- */
  const curDot = document.querySelector('.cur-dot');
  const curRing = document.querySelector('.cur-ring');
  const curGlow = document.querySelector('.cur-glow');

  if (curDot && curRing) {
    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let glowX = -100, glowY = -100;

    function onPointerMove(e) {
      const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : null);
      const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : null);
      if (clientX === null || clientY === null) return;

      mouseX = clientX;
      mouseY = clientY;

      // Dot follows immediately without lag
      curDot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
    }

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchstart', onPointerMove, { passive: true });

    // Hover detection on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .btn, .glass, .skill-card, .cert-card, .edu-card, .tool-badge, .tech-pill, input, textarea, .logo, .stat-card');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => curRing.classList.add('hovering'));
      el.addEventListener('mouseleave', () => curRing.classList.remove('hovering'));
    });

    // 120fps smooth elastic interpolation loop for the ring and glow
    function animateCursorRing() {
      ringX += (mouseX - ringX) * 0.20;
      ringY += (mouseY - ringY) * 0.20;

      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;

      const isHovered = curRing.classList.contains('hovering');
      const ringHalfSize = isHovered ? 30 : 18;

      curRing.style.transform = `translate3d(${(ringX - ringHalfSize).toFixed(2)}px, ${(ringY - ringHalfSize).toFixed(2)}px, 0)`;

      if (curGlow) {
        curGlow.style.transform = `translate3d(${(glowX - 120).toFixed(2)}px, ${(glowY - 120).toFixed(2)}px, 0)`;
      }

      requestAnimationFrame(animateCursorRing);
    }
    animateCursorRing();
  }

  /* ---------- Modals handling on backdrop or ESC ---------- */
  const projModal = document.getElementById('proj-modal');
  if (projModal) {
    projModal.addEventListener('click', (e) => {
      if (e.target.id === 'proj-modal') window.closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeModal();
      window.closeCertModal();
      if (mobileMenu && burger) {
        mobileMenu.classList.remove('open');
        burger.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  });

  /* ---------- Background Micro Ambient Dots Canvas ---------- */
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    class Particle {
      constructor() { this.reset(true); }
      reset(initial = false) {
        this.x = Math.random() * w;
        this.y = initial ? Math.random() * h : h + 10;
        this.size = Math.random() * 1.5 + 0.8;
        this.speedY = Math.random() * 0.3 + 0.1;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.alpha = Math.random() * 0.35 + 0.15;
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        if (this.y < -10 || this.x < -10 || this.x > w + 10) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 102, 255, ${this.alpha})`;
        ctx.fill();
      }
    }

    const count = Math.min(28, Math.floor(window.innerWidth / 50));
    for (let i = 0; i < count; i++) particles.push(new Particle());

    function animate() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      requestAnimationFrame(animate);
    }
    animate();
  }

  /* ---------- Dashboard counter numbers animation ---------- */
  if (window.gsap) {
    const dashTargets = [
      { id: 'dash-traffic', val: 180 },
      { id: 'dash-keywords', val: 50 },
      { id: 'dash-leads', val: 75 }
    ];
    dashTargets.forEach(t => {
      const el = document.getElementById(t.id);
      if (!el) return;
      gsap.to({ n: 0 }, {
        n: t.val, duration: 1.6, delay: 1.1, ease: 'power2.out',
        onUpdate: function () { el.textContent = Math.round(this.targets()[0].n); }
      });
    });
  }

  /* ---------- Scroll Triggers for Page Sections ---------- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.utils.toArray('.reveal').forEach((el) => {
      if (el.closest('#hero')) return;
      gsap.fromTo(el, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: .8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });

    gsap.utils.toArray('.skill-card, .strength, .edu-card, .cert-card').forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: .7, ease: 'power3.out', delay: (i % 3) * 0.08,
        scrollTrigger: { trigger: el, start: 'top 90%' }
      });
    });

    /* Rank counter loop */
    const rankEl = document.getElementById('rank-number');
    if (rankEl) {
      gsap.timeline({ repeat: -1, repeatDelay: 2 })
        .to({ val: 47 }, {
          val: 1, duration: 2.2, ease: 'power2.out', onUpdate: function () {
            rankEl.textContent = Math.round(this.targets()[0].val);
          }
        })
        .to({}, { duration: 2 });
    }
  }

  /* ---------- Header scroll state + progress bar + active nav ---------- */
  const header = document.getElementById('site-header');
  const backTop = document.getElementById('back-top');
  const progress = document.getElementById('progress');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 50);
    if (backTop) backTop.classList.toggle('show', y > 600);

    if (progress) {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = docH > 0 ? (y / docH * 100) + '%' : '0%';
    }

    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      if (y >= top) current = sec.id;
    });
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }, { passive: true });

  if (backTop) {
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Contact form direct mailto dispatcher ---------- */
  const form = document.getElementById('contact-form');
  const msgEl = document.getElementById('form-msg');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name')?.value || '';
      const email = document.getElementById('email')?.value || '';
      const service = document.getElementById('service')?.value || '';
      const message = document.getElementById('message')?.value || '';

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Opening Email App...';
      }

      const subject = encodeURIComponent('New Project Inquiry from ' + name + (service ? ' [' + service + ']' : ''));
      const bodyText = `Hi Tamilselvan,\n\nHere are my project details:\n\n• Name: ${name}\n• Email: ${email}\n• Service: ${service || 'General Inquiry'}\n\n• Message:\n${message}\n\nLooking forward to hearing from you.`;
      const mailtoUrl = 'mailto:tamilselvan3002@gmail.com?subject=' + subject + '&body=' + encodeURIComponent(bodyText);

      if (msgEl) {
        msgEl.className = 'form-msg show success';
        msgEl.innerHTML = 'Opening your email client to send message to <strong>tamilselvan3002@gmail.com</strong>...';
      }

      setTimeout(() => {
        window.location.href = mailtoUrl;
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Send Message <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
        }
        form.reset();
      }, 600);
    });
  }
}
