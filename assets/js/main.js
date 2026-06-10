const PAGE = document.body.dataset.page || 'home';

const cursor = document.querySelector('.custom-cursor');
const cursorRing = document.querySelector('.cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

if (cursor) {
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
  });
  document.querySelectorAll('a, button, .trinity-card, .god-card, .persian-god-card, .egypt-god-card, .greek-god-card, .yazata-card, .cycle-node').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('expanded'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('expanded'));
  });
  function animRing() {
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;
    if (cursorRing) cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(animRing);
  }
  animRing();
}

const nav = document.querySelector('.site-nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// Hamburger mobile menu
(function initHamburger() {
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile-menu');
  const closeBtn = document.querySelector('.nav-mobile-close');
  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // Close on backdrop click (outside the links)
  mobileMenu.addEventListener('click', e => {
    if (e.target === mobileMenu) closeMenu();
  });

  // Close on link click (navigation)
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
})();

function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));
}
initReveal();

const canvas = document.querySelector('.bg-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], animId;

  const THEMES = {
    home: { particleColor: '201,168,76', bgGrad: ['#0a0806', '#120f0a'], numParticles: 80, lines: true },
    persia: { particleColor: '212,160,23', bgGrad: ['#0c0401', '#160703'], numParticles: 60, lines: false },
    egypt: { particleColor: '200,169,110', bgGrad: ['#070502', '#0f0a04'], numParticles: 70, lines: false },
    greek: { particleColor: '91,141,184', bgGrad: ['#030608', '#05080f'], numParticles: 75, lines: true },
  };
  const T = THEMES[PAGE] || THEMES.home;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildParticles();
  }

  function buildParticles() {
    particles = Array.from({ length: T.numParticles }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      o: Math.random() * 0.6 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    }));
  }

  function drawBg() {
    const grd = ctx.createLinearGradient(0, 0, 0, H);
    grd.addColorStop(0, T.bgGrad[0]);
    grd.addColorStop(1, T.bgGrad[1]);
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);
  }

  function drawNebula() {
    const cx = W * 0.5, cy = H * 0.4;
    const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.5);
    grd.addColorStop(0, `rgba(${T.particleColor},0.04)`);
    grd.addColorStop(0.5, `rgba(${T.particleColor},0.015)`);
    grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);
  }

  function drawGeometry() {
    if (PAGE === 'persia') drawPersianGeometry();
    else if (PAGE === 'egypt') drawEgyptGeometry();
    else if (PAGE === 'greek') drawGreekGeometry();
    else drawHomeGeometry();
  }

  function drawPersianGeometry() {
    ctx.save();
    ctx.strokeStyle = `rgba(${T.particleColor},0.04)`;
    ctx.lineWidth = 0.5;
    const cx = W / 2, cy = H / 2;
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const r1 = Math.min(W, H) * 0.25;
      const r2 = Math.min(W, H) * 0.45;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * r1, cy + Math.sin(angle) * r1);
      ctx.lineTo(cx + Math.cos(angle) * r2, cy + Math.sin(angle) * r2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, r1 + i * 8, 0, Math.PI * 2);
      ctx.globalAlpha = 0.03;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    const fireTime = Date.now() * 0.001;
    for (let i = 0; i < 5; i++) {
      const y = H - 100 - i * 30 + Math.sin(fireTime * 2 + i) * 15;
      const x = W / 2 + Math.sin(fireTime + i * 1.3) * 40;
      const grd = ctx.createRadialGradient(x, y, 0, x, y, 60 - i * 10);
      grd.addColorStop(0, `rgba(228,86,42,${0.06 - i * 0.01})`);
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(x, y, 60 - i * 10, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawEgyptGeometry() {
    ctx.save();
    ctx.strokeStyle = `rgba(${T.particleColor},0.05)`;
    ctx.lineWidth = 0.5;
    const t = Date.now() * 0.0003;
    const cx = W / 2, cy = H / 2;
    for (let ring = 0; ring < 5; ring++) {
      const r = 80 + ring * 70;
      ctx.beginPath();
      ctx.arc(cx, cy, r, t + ring * 0.5, t + ring * 0.5 + Math.PI * 2);
      ctx.globalAlpha = 0.04 - ring * 0.005;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    const pw = 200, ph = 300;
    const px = W * 0.15, py = H - ph;
    ctx.strokeStyle = `rgba(${T.particleColor},0.03)`;
    ctx.beginPath();
    ctx.moveTo(px, py + ph);
    ctx.lineTo(px + pw / 2, py);
    ctx.lineTo(px + pw, py + ph);
    ctx.closePath();
    ctx.stroke();
    const px2 = W * 0.75;
    ctx.beginPath();
    ctx.moveTo(px2, py + ph);
    ctx.lineTo(px2 + pw / 2, py);
    ctx.lineTo(px2 + pw, py + ph);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  function drawGreekGeometry() {
    ctx.save();
    ctx.strokeStyle = `rgba(${T.particleColor},0.04)`;
    ctx.lineWidth = 0.5;
    const cols = Math.ceil(W / 80), rows = Math.ceil(H / 80);
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        if (Math.random() < 0.97) continue;
        const x = c * 80, y = r * 80;
        ctx.beginPath();
        ctx.rect(x + 10, y + 10, 60, 60);
        ctx.stroke();
      }
    }
    const t = Date.now() * 0.0005;
    const cx = W / 2, cy = H * 0.4;
    const radii = [120, 200, 300];
    radii.forEach((r, i) => {
      ctx.beginPath();
      for (let a = 0; a <= Math.PI * 2; a += 0.02) {
        const x2 = cx + Math.cos(a + t * (i % 2 === 0 ? 1 : -1)) * r;
        const y2 = cy + Math.sin(a + t * (i % 2 === 0 ? 1 : -1)) * r;
        i === 0 && a === 0 ? ctx.moveTo(x2, y2) : ctx.lineTo(x2, y2);
      }
      ctx.globalAlpha = 0.03 + i * 0.005;
      ctx.stroke();
      ctx.globalAlpha = 1;
    });
    ctx.restore();
  }

  function drawHomeGeometry() {
    ctx.save();
    ctx.lineWidth = 0.5;
    const cx = W / 2, cy = H / 2;
    const t = Date.now() * 0.0002;
    const colors = ['201,168,76', '200,169,110', '91,141,184'];
    colors.forEach((c, i) => {
      ctx.strokeStyle = `rgba(${c},0.05)`;
      const r = 200 + i * 100;
      ctx.beginPath();
      ctx.arc(cx, cy, r, t + i * 2, t + i * 2 + Math.PI * 2);
      ctx.stroke();
      for (let j = 0; j < 6; j++) {
        const a = (j / 6) * Math.PI * 2 + t * (i % 2 === 0 ? 1 : -1);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a) * (r + 50), cy + Math.sin(a) * (r + 50));
        ctx.globalAlpha = 0.02;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    });
    ctx.restore();
  }

  function drawParticles(t) {
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      p.pulse += 0.02;
      const alpha = p.o * (0.7 + 0.3 * Math.sin(p.pulse));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${T.particleColor},${alpha})`;
      ctx.fill();
    });

    if (T.lines) {
      particles.forEach((a, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${T.particleColor},${(1 - d / 120) * 0.08})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    drawBg();
    drawNebula();
    drawGeometry();
    drawParticles(Date.now());
    animId = requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize);
  resize();
  loop();
}

function initPersianDuality() {
  if (PAGE !== 'persia') return;
  const goodSide = document.querySelector('.good-side');
  const evilSide = document.querySelector('.evil-side');
  if (!goodSide || !evilSide) return;

  const cards = document.querySelectorAll('.persian-god-card');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = card.closest('.good-side') ? 'translateX(-40px)' : 'translateX(40px)';
    card.style.transition = `opacity 0.8s ${i * 0.12}s ease, transform 0.8s ${i * 0.12}s var(--ease-divine)`;
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.persian-god-card').forEach(card => {
          card.style.opacity = '1';
          card.style.transform = 'translateX(0)';
        });
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  [goodSide, evilSide].forEach(s => io.observe(s));
}
initPersianDuality();

function initEgyptCycle() {
  if (PAGE !== 'egypt') return;
  const container = document.querySelector('.cycle-container');
  if (!container) return;

  const nodes = document.querySelectorAll('.cycle-node');
  const R = container.offsetWidth / 2 - 70;
  const cx = container.offsetWidth / 2;
  const cy = container.offsetHeight / 2;

  nodes.forEach((node, i) => {
    const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
    const x = cx + Math.cos(angle) * R;
    const y = cy + Math.sin(angle) * R;
    node.style.left = x + 'px';
    node.style.top = y + 'px';
  });

  const svgEl = document.querySelector('.cycle-svg');
  if (svgEl) {
    svgEl.setAttribute('viewBox', `0 0 ${container.offsetWidth} ${container.offsetHeight}`);
    nodes.forEach((node, i) => {
      const a1 = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
      const a2 = ((i + 1) / nodes.length) * Math.PI * 2 - Math.PI / 2;
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const x1 = cx + Math.cos(a1) * R;
      const y1 = cy + Math.sin(a1) * R;
      const x2 = cx + Math.cos(a2) * R;
      const y2 = cy + Math.sin(a2) * R;
      path.setAttribute('d', `M${x1},${y1} A${R},${R} 0 0,1 ${x2},${y2}`);
      path.setAttribute('stroke', 'rgba(200,169,110,0.25)');
      path.setAttribute('stroke-width', '1');
      path.setAttribute('fill', 'none');
      svgEl.appendChild(path);

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', cx); line.setAttribute('y1', cy);
      line.setAttribute('x2', x1); line.setAttribute('y2', y1);
      line.setAttribute('stroke', 'rgba(200,169,110,0.1)');
      line.setAttribute('stroke-width', '0.5');
      svgEl.appendChild(line);
    });
  }
}
initEgyptCycle();

function initGreekTree() {
  if (PAGE !== 'greek') return;
  const connectors = document.querySelectorAll('.lineage-connector');
  connectors.forEach(c => {
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        c.style.opacity = '1';
        io.unobserve(c);
      }
    });
    c.style.opacity = '0';
    c.style.transition = 'opacity 1s ease';
    io.observe(c);
  });
}
initGreekTree();

function initHomeParallax() {
  if (PAGE !== 'home') return;
  const cards = document.querySelectorAll('.trinity-card');
  document.addEventListener('mousemove', e => {
    const rx = (e.clientX / window.innerWidth - 0.5) * 10;
    const ry = (e.clientY / window.innerHeight - 0.5) * 10;
    cards.forEach((card, i) => {
      const factor = [1, 0.7, 1.2][i] || 1;
      card.querySelector('.card-bg').style.transform =
        `scale(1) translate(${rx * factor * 0.3}px, ${ry * factor * 0.3}px)`;
    });
  });
}
initHomeParallax();

function initScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = 'position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,var(--gold),var(--gold-light));z-index:9999;transition:width 0.1s linear;width:0%;pointer-events:none;';
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const prog = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = Math.min(prog, 100) + '%';
  });
}
initScrollProgress();

function initPageTransition() {
  document.querySelectorAll('a[href$=".html"]').forEach(link => {
    if (link.hostname !== location.hostname) return;
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = link.href;
      document.body.style.transition = 'opacity 0.4s ease';
      document.body.style.opacity = '0';
      setTimeout(() => { location.href = target; }, 420);
    });
  });
  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 0.7s ease';
    document.body.style.opacity = '1';
  });
}
initPageTransition();

window.addEventListener('load', () => {
  document.querySelectorAll('.reveal').forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      setTimeout(() => el.classList.add('visible'), i * 80);
    }
  });
});
