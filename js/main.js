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
    name: 'Right Educate', cat: 'Education', role: 'SEO Specialist & Digital Marketing Executive',
    overview: 'Improved the online visibility of an education consultancy through SEO, Google Business Profile optimization, website optimization, and digital marketing activities.',
    responsibilities: ['Google Business Profile optimization', 'Weekly Google Posts & review management', 'Website content optimization', 'Keyword research & Local SEO', 'Technical SEO improvements', 'Performance monitoring'],
    tools: ['GBP', 'GA4', 'Search Console', 'WordPress', 'Semrush', 'Clarity'], tags: ['SEO', 'Local SEO', 'WordPress', 'GBP']
  },
  {
    name: 'Natural Agarbatti', cat: 'E-Commerce', role: 'SEO Specialist',
    overview: 'Improved search engine visibility and website performance for an e-commerce business selling natural agarbatti products.',
    responsibilities: ['On-page SEO & meta optimization', 'Image ALT optimization', 'Product page optimization', 'Internal linking', 'Technical SEO improvements', 'Website performance improvements'],
    tools: ['WordPress', 'Search Console', 'Google Analytics', 'Semrush', 'Ahrefs'], tags: ['E-Commerce SEO', 'Technical SEO', 'Content SEO']
  },
  {
    name: 'Trust Gold', cat: 'Financial Services', role: 'SEO Specialist',
    overview: 'Improved website structure and local SEO strategy to strengthen online visibility for financial service locations.',
    responsibilities: ['Keyword research', 'Local SEO', 'Google Business Profile', 'Landing page optimization', 'Website audit', 'Content optimization'],
    tools: ['GBP', 'WordPress', 'Search Console'], tags: ['SEO', 'Local SEO', 'Technical SEO']
  },
  {
    name: 'AdmissionGyan', cat: 'Study Abroad Consultancy', role: 'SEO Specialist',
    overview: 'Optimized study abroad landing pages targeting high-intent search keywords while improving website structure and organic search visibility.',
    responsibilities: ['Landing page SEO', 'Keyword research', 'Blog optimization', 'Internal linking', 'Technical SEO', 'Content strategy'],
    tools: ['WordPress', 'Search Console', 'GA4'], tags: ['SEO', 'Content Marketing', 'WordPress']
  },
  {
    name: 'Boston Institute of Analytics', cat: 'Education', role: 'SEO Specialist',
    overview: 'Worked on improving SEO performance for professional certification course pages through content optimization and technical improvements.',
    responsibilities: ['Keyword mapping', 'Technical SEO', 'Website optimization', 'Content improvements', 'Metadata optimization'],
    tools: ['WordPress', 'GA4', 'Search Console'], tags: ['SEO', 'Analytics', 'Education']
  },
];

/* ---------- Globally accessible modal triggers ---------- */
window.openCertModal = function (i) {
  const c = certificatesData[i];
  if (!c) return;
  const box = document.getElementById('cert-modal-box');
  const modal = document.getElementById('cert-modal');
  if (!box || !modal) return;

  box.innerHTML = `
    <button class="cert-lightbox-close" id="cert-lightbox-close" aria-label="Close modal">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>
    <div class="cert-lightbox-header">
      <div>
        <span class="eyebrow" style="margin-bottom:8px; padding:4px 12px; font-size:10.5px;">${c.issuer}</span>
        <h3 class="cert-lightbox-title">${c.name}</h3>
        <div class="cert-lightbox-meta">${c.meta}</div>
      </div>
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

  box.innerHTML = `
    <button class="modal-close" id="modal-close-btn" aria-label="Close modal">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>
    <span class="cat-tag">${p.cat}</span>
    <h3>${p.name}</h3>
    <div class="role">${p.role}</div>
    <h5>Project Overview</h5>
    <p>${p.overview}</p>
    <h5>Key Responsibilities & Deliverables</h5>
    <ul>${p.responsibilities.map(r => `<li>${r}</li>`).join('')}</ul>
    <h5>Tools & Technologies Used</h5>
    <div class="proj-tags" style="margin-top:10px;">${p.tools.map(t => `<span>${t}</span>`).join('')}</div>
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

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

if (document.readyState === 'interactive' || document.readyState === 'complete') {
  initApp();
}

let appInitialized = false;

function initApp() {
  if (appInitialized) return;
  appInitialized = true;

  const REDUCE_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const IS_TOUCH = window.matchMedia('(hover:none)').matches;

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ---------- Lenis smooth scroll ---------- */
  let lenis;
  if (!REDUCE_MOTION && window.Lenis && window.gsap && window.ScrollTrigger) {
    try {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.1
      });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    } catch (e) {
      console.warn('Lenis scroll init warning:', e);
    }
  }

  /* ---------- Custom cursor ---------- */
  if (!REDUCE_MOTION && !IS_TOUCH && window.gsap) {
    const cursor = document.getElementById('cursor');
    if (cursor) {
      document.documentElement.classList.add('has-cursor');
      const ring = cursor.querySelector('.cur-ring');
      const dot = cursor.querySelector('.cur-dot');
      const glow = cursor.querySelector('.cur-glow');

      if (ring && dot && glow) {
        const quickDot = gsap.quickTo(dot, 'x', { duration: .12, ease: 'power3.out' });
        const quickDotY = gsap.quickTo(dot, 'y', { duration: .12, ease: 'power3.out' });
        const quickRing = gsap.quickTo(ring, 'x', { duration: .35, ease: 'power3.out' });
        const quickRingY = gsap.quickTo(ring, 'y', { duration: .35, ease: 'power3.out' });
        const quickGlow = gsap.quickTo(glow, 'x', { duration: .55, ease: 'power3.out' });
        const quickGlowY = gsap.quickTo(glow, 'y', { duration: .55, ease: 'power3.out' });

        window.addEventListener('mousemove', (e) => {
          quickDot(e.clientX); quickDotY(e.clientY);
          quickRing(e.clientX); quickRingY(e.clientY);
          quickGlow(e.clientX); quickGlowY(e.clientY);
          cursor.classList.add('active');
        }, { passive: true });

        window.addEventListener('mousedown', () => cursor.classList.add('down'));
        window.addEventListener('mouseup', () => cursor.classList.remove('down'));

        const hoverTargets = 'a, button, .btn, .glass, .skill-card, .proj-card, .cert-card, input, textarea, .tech-pill';
        document.addEventListener('mouseover', (e) => {
          if (e.target.closest && e.target.closest(hoverTargets)) cursor.classList.add('hovering');
        });
        document.addEventListener('mouseout', (e) => {
          if (e.target.closest && e.target.closest(hoverTargets)) cursor.classList.remove('hovering');
        });
      }
    }
  }

  /* ---------- Magnetic buttons ---------- */
  if (!REDUCE_MOTION && !IS_TOUCH && window.gsap) {
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const relX = e.clientX - r.left - r.width / 2;
        const relY = e.clientY - r.top - r.height / 2;
        gsap.to(btn, { x: relX * 0.28, y: relY * 0.45, duration: .4, ease: 'power3.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: .5, ease: 'elastic.out(1,0.4)' });
      });
    });
  }

  /* ---------- Close modals on backdrop click or ESC ---------- */
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
    }
  });

  /* ---------- Subtle Ambient Floating Micro-Dots ---------- */
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];
    let mouseX = -1000, mouseY = -1000;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    class Particle {
      constructor() {
        this.reset(true);
      }
      reset(initial = false) {
        this.x = Math.random() * w;
        this.y = initial ? Math.random() * h : h + 10;
        this.size = Math.random() * 1.6 + 0.8;
        this.baseSpeedY = Math.random() * 0.35 + 0.15;
        this.speedX = (Math.random() - 0.5) * 0.25;
        this.alpha = Math.random() * 0.4 + 0.2;
        this.pulse = Math.random() * Math.PI;
      }
      update() {
        this.pulse += 0.02;
        this.y -= this.baseSpeedY;
        this.x += this.speedX + Math.sin(this.pulse) * 0.15;

        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const force = (140 - dist) / 140;
          this.x += (dx / dist) * force * 1.8;
          this.y += (dy / dist) * force * 1.8;
        }

        if (this.y < -10 || this.x < -10 || this.x > w + 10) {
          this.reset();
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        const currentAlpha = Math.max(0.1, Math.min(0.65, this.alpha + Math.sin(this.pulse) * 0.15));
        ctx.fillStyle = `rgba(0, 102, 255, ${currentAlpha})`;
        ctx.fill();
      }
    }

    const count = Math.min(38, Math.floor(window.innerWidth / 35));
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
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

    gsap.utils.toArray('.about-photo-card').forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 30, scale: .95 }, {
        opacity: 1, y: 0, scale: 1, duration: .8, ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%'
        }
      });
    });

    gsap.utils.toArray('.skill-card, .strength, .edu-card, .proj-card, .t-item, .cert-card').forEach((el, i) => {
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

  /* ---------- Mobile Menu ---------- */
  const burger = document.getElementById('burger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-close');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => mobileMenu.classList.add('open'));
  }
  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
  }
  document.querySelectorAll('.m-link').forEach(a => {
    a.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.remove('open');
    });
  });

  /* ---------- Resume button handling ---------- */
  document.querySelectorAll('#resume-btn-nav, #resume-btn-hero, #resume-btn-cta').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Resume download: Please connect your resume PDF file.');
    });
  });
}
