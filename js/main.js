/**
 * TamilSelvan V - Portfolio Interaction & Animation Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

// If DOMContentLoaded already fired before script execution
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  initApp();
}

let appInitialized = false;

function initApp() {
  if (appInitialized) return;
  appInitialized = true;

  const REDUCE_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const IS_TOUCH = window.matchMedia('(hover:none)').matches;
  const IS_LOW_END = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ---------- Lenis smooth / inertia scroll ---------- */
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

  /* ---------- Custom cursor: glow, trailing, magnetic, ripple ---------- */
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

  /* ---------- Character-by-character heading reveal ---------- */
  function splitReveal(el) {
    const text = el.textContent;
    el.setAttribute('aria-label', text);
    el.innerHTML = '';
    const words = text.split(' ');
    words.forEach((word, wi) => {
      const wordWrap = document.createElement('span');
      wordWrap.className = 'split-line';
      word.split('').forEach(ch => {
        const c = document.createElement('span');
        c.className = 'split-char';
        c.textContent = ch;
        wordWrap.appendChild(c);
      });
      el.appendChild(wordWrap);
      if (wi < words.length - 1) el.appendChild(document.createTextNode('\u00A0'));
    });
  }

  if (!REDUCE_MOTION && window.gsap && window.ScrollTrigger) {
    document.querySelectorAll('.sec-heading').forEach(h => {
      if (h.closest('#hero')) return;
      splitReveal(h);
      const chars = h.querySelectorAll('.split-char');
      gsap.set(chars, { yPercent: 120, opacity: 0 });
      gsap.to(chars, {
        yPercent: 0, opacity: 1, duration: .7, stagger: .014, ease: 'power3.out',
        scrollTrigger: { trigger: h, start: 'top 85%' }
      });
    });
  }

  /* ---------- Blur-to-sharp paragraph reveals ---------- */
  if (!REDUCE_MOTION && window.gsap && window.ScrollTrigger) {
    gsap.utils.toArray('.sec-sub').forEach(p => {
      if (p.closest('#hero')) return;
      gsap.fromTo(p, { opacity: 0, y: 20, filter: 'blur(8px)' }, {
        opacity: 1, y: 0, filter: 'blur(0px)', duration: .9, ease: 'power3.out',
        scrollTrigger: { trigger: p, start: 'top 88%' }
      });
    });
  }

  /* ---------- Light-sweep sheen on glass surfaces ---------- */
  document.querySelectorAll('.glass').forEach(el => el.classList.add('sheen-hover'));

  /* ================================================================
     DATA DEFINITIONS
     ================================================================ */
  const skillCategories = [
    { icon: 'search', title: 'Search Engine Optimization', desc: 'Improve organic visibility through strategic SEO implementation.', chips: ['Keyword Research', 'On-Page SEO', 'Technical SEO', 'Off-Page SEO', 'Local SEO', 'SEO Audit', 'Content Optimization'] },
    { icon: 'layout-template', title: 'WordPress', desc: 'Develop, manage, and optimize WordPress websites for performance and search.', chips: ['WordPress CMS', 'Elementor', 'Theme Customization', 'Plugin Management', 'Performance Optimization', 'WooCommerce'] },
    { icon: 'bar-chart-3', title: 'Analytics & Tracking', desc: 'Measure user behaviour and website performance using modern analytics tools.', chips: ['GA4', 'Search Console', 'Tag Manager', 'Microsoft Clarity', 'Conversion Tracking'] },
    { icon: 'toolbox', title: 'SEO & Marketing Tools', desc: 'Daily tools used for research, optimization, and reporting.', chips: ['Semrush', 'Ahrefs', 'Ubersuggest', 'Screaming Frog', 'Google Business Profile', 'Canva'] },
    { icon: 'code-2', title: 'Web Technologies', desc: 'Foundational web technologies used while working with websites.', chips: ['HTML5', 'CSS3', 'Responsive Design', 'JavaScript Basics'] },
    { icon: 'users', title: 'Professional Skills', desc: 'Essential workplace and communication skills.', chips: ['Problem Solving', 'Communication', 'Time Management', 'Attention to Detail'] },
  ];

  const toolsList = [
    { icon: 'https://cdn.simpleicons.org/wordpress/21759B', name: 'WordPress' },
    { icon: 'https://cdn.simpleicons.org/googleanalytics/E37400', name: 'Google Analytics 4' },
    { icon: 'https://cdn.simpleicons.org/googlesearchconsole/458CF5', name: 'Search Console' },
    { icon: 'https://cdn.simpleicons.org/googletagmanager/246FDB', name: 'Tag Manager' },
    { icon: 'https://www.google.com/s2/favicons?domain=business.google.com&sz=64', name: 'Business Profile' },
    { icon: 'https://cdn.simpleicons.org/semrush/FF642D', name: 'Semrush' },
    { icon: 'https://www.google.com/s2/favicons?domain=ahrefs.com&sz=64', name: 'Ahrefs' },
    { icon: 'https://www.google.com/s2/favicons?domain=screamingfrog.co.uk&sz=64', name: 'Screaming Frog' },
    { icon: 'https://www.google.com/s2/favicons?domain=clarity.microsoft.com&sz=64', name: 'Microsoft Clarity' },
    { icon: 'https://cdn.simpleicons.org/canva/00C4CC', name: 'Canva' },
    { icon: 'https://cdn.simpleicons.org/html5/E34F26', name: 'HTML5' },
    { icon: 'https://cdn.simpleicons.org/css3/1572B6', name: 'CSS3' },
    { icon: 'https://cdn.simpleicons.org/googlechrome/4285F4', name: 'Chrome DevTools' },
  ];

  const projects = [
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

  const certificates = [
    { name: 'Google Analytics Certification', issuer: 'Google', meta: 'Issued Dec 15, 2025 · Expires Dec 15, 2026', img: 'assets/images/cert-google-analytics.jpg' },
    { name: 'SEO Toolkit Crash Course', issuer: 'Semrush Academy', meta: 'Completed · Expires 13 Nov 2026', img: 'assets/images/cert-semrush-toolkit.jpg' },
    { name: 'SEO Certified', issuer: 'HubSpot Academy', meta: 'Valid Nov 14 2025 · Dec 14 2026', img: 'assets/images/cert-hubspot-seo.jpg' },
    { name: 'Social Media Certified', issuer: 'HubSpot Academy', meta: 'Valid Nov 14 2025 · Dec 14 2027', img: 'assets/images/cert-hubspot-social-media.jpg' },
    { name: 'Fundamentals of Digital Marketing', issuer: 'Digital Marketing Course', meta: 'Completed 13 Nov 2025', img: 'assets/images/cert-digital-marketing-fundamentals.jpg' },
    { name: 'Digital Marketing Strategy', issuer: 'Great Learning', meta: 'Completed Nov 23, 2025', img: 'assets/images/cert-great-learning-strategy.jpg' },
  ];

  /* ---------- Skills ---------- */
  const skillsGrid = document.getElementById('skills-grid');
  if (skillsGrid && skillsGrid.children.length === 0) {
    skillCategories.forEach(s => {
      const el = document.createElement('div');
      el.className = 'glass skill-card reveal';
      el.innerHTML = `<div class="top"><div class="ic"><i data-lucide="${s.icon}"></i></div><h4>${s.title}</h4></div>
        <p>${s.desc}</p>
        <div class="chip-row">${s.chips.map(c => `<span>${c}</span>`).join('')}</div>`;
      skillsGrid.appendChild(el);
    });
  }

  /* ---------- Tools marquee ---------- */
  const marqueeTrack = document.getElementById('marquee-track');
  if (marqueeTrack && marqueeTrack.children.length === 0) {
    const doubled = [...toolsList, ...toolsList];
    doubled.forEach(t => {
      const el = document.createElement('div');
      el.className = 'tool-badge';
      el.innerHTML = `<img src="${t.icon}" alt="${t.name}" loading="lazy" /><span>${t.name}</span>`;
      marqueeTrack.appendChild(el);
    });
  }

  /* ---------- Projects ---------- */
  const projGrid = document.getElementById('proj-grid');
  if (projGrid && projGrid.children.length === 0) {
    projects.forEach((p, i) => {
      const el = document.createElement('div');
      el.className = 'glass proj-card reveal';
      el.onclick = () => openModal(i);
      el.innerHTML = `
        <div class="proj-thumb">
          <span class="cat">${p.cat}</span>
        </div>
        <div class="proj-body">
          <h4>${p.name}</h4>
          <p>${p.overview}</p>
          <div class="proj-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
          <span class="proj-link">View Case Study <i data-lucide="arrow-right"></i></span>
        </div>`;
      projGrid.appendChild(el);
    });
  }

  /* ---------- Certificates ---------- */
  const certGrid = document.getElementById('cert-grid');
  if (certGrid && certGrid.children.length === 0) {
    certificates.forEach((c, i) => {
      const el = document.createElement('div');
      el.className = 'glass cert-card reveal';
      el.onclick = () => openCertModal(i);
      el.innerHTML = `
        <div class="cert-thumb">
          <img src="${c.img}" alt="${c.name}" loading="lazy" />
          <div class="cert-view"><i data-lucide="zoom-in"></i> View Certificate</div>
        </div>
        <div class="cert-body">
          <div class="cert-issuer">${c.issuer}</div>
          <h4>${c.name}</h4>
          <div class="cert-meta">${c.meta}</div>
        </div>`;
      certGrid.appendChild(el);
    });
  }

  /* ---------- Initialize Lucide Icons ---------- */
  if (window.lucide && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
  }

  /* ---------- Project Modals ---------- */
  window.openModal = function (i) {
    const p = projects[i];
    const box = document.getElementById('modal-box');
    if (!box) return;
    box.innerHTML = `
      <button class="modal-close" id="modal-close-btn" aria-label="Close modal"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
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
    document.getElementById('modal-close-btn').addEventListener('click', closeModal);
    document.getElementById('proj-modal').classList.add('open');
  };

  window.closeModal = function () {
    const m = document.getElementById('proj-modal');
    if (m) m.classList.remove('open');
  };

  const projModal = document.getElementById('proj-modal');
  if (projModal) {
    projModal.addEventListener('click', (e) => {
      if (e.target.id === 'proj-modal') closeModal();
    });
  }

  /* ---------- Certificate Modals ---------- */
  window.openCertModal = function (i) {
    const c = certificates[i];
    const box = document.getElementById('cert-modal-box');
    if (!box) return;
    box.innerHTML = `
      <button class="modal-close" id="cert-modal-close" aria-label="Close modal"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
      <span class="cat-tag">${c.issuer}</span>
      <h3 style="font-size:20px;margin-bottom:6px;">${c.name}</h3>
      <div class="role" style="margin-bottom:14px;">${c.meta}</div>
      <img src="${c.img}" alt="${c.name}" style="width:100%;border-radius:12px;" />
    `;
    document.getElementById('cert-modal-close').addEventListener('click', closeCertModal);
    document.getElementById('cert-modal').classList.add('open');
  };

  window.closeCertModal = function () {
    const m = document.getElementById('cert-modal');
    if (m) m.classList.remove('open');
  };

  const certModal = document.getElementById('cert-modal');
  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target.id === 'cert-modal') closeCertModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeCertModal();
    }
  });

  /* ---------- Subtle Ambient Floating Micro-Dots (Apple Keynote / Nothing Inspired) ---------- */
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

    const PCOUNT = window.innerWidth < 768 ? 24 : 45;
    for (let i = 0; i < PCOUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - .5) * .22,
        vy: (Math.random() - .5) * .22,
        r: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.35 + 0.15,
        baseAlpha: Math.random() * 0.35 + 0.15,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        angle: Math.random() * Math.PI * 2
      });
    }

    function drawParticles() {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.angle) * 0.12;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const dmx = p.x - mouseX;
        const dmy = p.y - mouseY;
        const distMouse = Math.sqrt(dmx * dmx + dmy * dmy);
        if (distMouse < 100) {
          const force = (1 - distMouse / 100) * 0.5;
          p.x += (dmx / distMouse) * force;
          p.y += (dmy / distMouse) * force;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 102, 255, ${Math.max(0.05, p.alpha)})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            const lineAlpha = (1 - dist / 110) * 0.12;
            ctx.strokeStyle = `rgba(0, 102, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(drawParticles);
    }
    drawParticles();
  }

  /* ---------- Cursor spotlight ---------- */
  const spotlight = document.getElementById('spotlight');
  if (spotlight) {
    window.addEventListener('mousemove', (e) => {
      spotlight.style.setProperty('--x', e.clientX + 'px');
      spotlight.style.setProperty('--y', e.clientY + 'px');
    }, { passive: true });
  }

  /* ---------- Hero glass-frame mouse tilt ---------- */
  const hvStage = document.getElementById('hv-stage');
  const hvFrameWrap = document.getElementById('hv-frame-wrap');
  if (hvStage && hvFrameWrap) {
    hvStage.addEventListener('mousemove', (e) => {
      const r = hvStage.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rotY = (px - .5) * 10;
      const rotX = (py - .5) * -10;
      hvFrameWrap.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
    });
    hvStage.addEventListener('mouseleave', () => {
      hvFrameWrap.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });
  }

  /* ================================================================
     LOADER DISMISSAL & HERO INTRO SEQUENCE
     ================================================================ */
  let loaderDismissed = false;

  function dismissLoader() {
    if (loaderDismissed) return;
    loaderDismissed = true;

    const loaderEl = document.getElementById('loader');
    const bar = document.getElementById('loader-bar');

    if (bar && window.gsap) {
      gsap.to(bar, { width: '100%', duration: 0.6, ease: 'power2.inOut' });
    }

    setTimeout(() => {
      if (loaderEl) {
        if (window.gsap) {
          gsap.to(loaderEl, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => {
              loaderEl.style.display = 'none';
              runIntro();
            }
          });
        } else {
          loaderEl.style.opacity = '0';
          loaderEl.style.transition = 'opacity 0.5s ease';
          setTimeout(() => {
            loaderEl.style.display = 'none';
            runIntro();
          }, 500);
        }
      } else {
        runIntro();
      }
    }, 400);
  }

  // Trigger loader dismissal
  if (document.readyState === 'complete') {
    dismissLoader();
  } else {
    window.addEventListener('load', dismissLoader);
    setTimeout(dismissLoader, 800); // Safety fallback: max 800ms wait
  }

  /* ---------- Intro / Hero Animation ---------- */
  let introAnimated = false;

  function runIntro() {
    if (introAnimated) return;
    introAnimated = true;

    if (!window.gsap) {
      document.querySelectorAll('.reveal, .hero-h1 .line, .hv-dash').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    gsap.set('.hero-h1 .line', { y: 40 });
    gsap.set('.hero-visual.reveal', { scale: .94 });
    gsap.set('.hv-dash', { opacity: 0, y: 16 });

    gsap.timeline()
      .to('.hero-h1 .line', { y: 0, opacity: 1, duration: .9, stagger: .12, ease: 'power3.out' }, 0)
      .to('.eyebrow.reveal', { opacity: 1, y: 0, duration: .6 }, 0)
      .to('.hero-desc.reveal', { opacity: 1, y: 0, duration: .7 }, .3)
      .to('.hero-btns.reveal', { opacity: 1, y: 0, duration: .7 }, .45)
      .to('.tech-row.reveal', { opacity: 1, y: 0, duration: .7 }, .55)
      .to('.hero-badges.reveal', { opacity: 1, y: 0, duration: .7 }, .65)
      .to('.hero-visual.reveal', { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }, .3)
      .to('.hv-dash', { opacity: 1, y: 0, duration: .8, ease: 'power3.out' }, .9);

    /* Dashboard counters */
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
  document.querySelectorAll('#resume-btn-nav, #resume-btn-hero').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Resume download: Please connect your resume PDF file.');
    });
  });

  /* ---------- Contact form handling ---------- */
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const submitLabel = document.getElementById('submit-label');
  const successMsg = document.getElementById('form-success');
  const errorMsg = document.getElementById('form-error');

  if (form && submitBtn && submitLabel) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (successMsg) successMsg.classList.remove('show');
      if (errorMsg) errorMsg.classList.remove('show');
      submitLabel.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitLabel.textContent = 'Send Message';
        if (successMsg) successMsg.classList.add('show');
        form.reset();
      }, 1200);
    });
  }
}
