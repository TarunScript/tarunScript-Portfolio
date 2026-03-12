// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
let cursorScale = 1;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  if (cursor) {
    cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px) scale(${cursorScale})`;
  }
});

function animRing() {
  // Follow factor controls the "tail" feel: closer to 1 = almost locked, smaller = more trail
  const follow = 0.22;
  rx += (mx - rx) * follow;
  ry += (my - ry) * follow;
  if (ring) {
    ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
  }
  requestAnimationFrame(animRing);
}
animRing();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursor) {
      cursorScale = 1.8;
      cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px) scale(${cursorScale})`;
    }
    if (ring) {
      ring.style.width = '52px';
      ring.style.height = '52px';
    }
  });
  el.addEventListener('mouseleave', () => {
    if (cursor) {
      cursorScale = 1;
      cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px) scale(${cursorScale})`;
    }
    if (ring) {
      ring.style.width = '36px';
      ring.style.height = '36px';
    }
  });
});

// Navbar scroll
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }
});

// Dots canvas animation
const canvas = document.getElementById('dots-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
const dots = [];

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const COLS = 13, ROWS = 13;
if (canvas && ctx) {
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      dots.push({
        x: (i / (COLS - 1)) * 0.9 + 0.05,
        y: (j / (ROWS - 1)) * 0.9 + 0.05,
        scale: Math.random() * 0.5 + 0.5,
        speed: Math.random() * 0.008 + 0.003,
        offset: Math.random() * Math.PI * 2
      });
    }
  }

  function drawDots(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(d => {
      const sc = d.scale * (0.7 + 0.3 * Math.sin(t * d.speed + d.offset));
      const alpha = 0.15 + 0.25 * Math.sin(t * d.speed * 0.7 + d.offset);
      ctx.beginPath();
      ctx.arc(d.x * canvas.width, d.y * canvas.height, 2.5 * sc, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,255,136,${alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(drawDots);
  }
  requestAnimationFrame(drawDots);
}

// Hero entrance (anime.js)
if (window.anime) {
  const tl = anime.timeline({ easing: 'easeOutExpo' });

  tl
    .add({
      targets: '.nav-logo, .nav-links a',
      opacity: [0, 1],
      translateY: [-10, 0],
      delay: anime.stagger(80),
      duration: 600,
    })
    .add({
      targets: '.hero-tag',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
    }, '-=200')
    .add({
      targets: '.hero-name .word',
      translateY: ['110%', '0%'],
      duration: 900,
      delay: anime.stagger(120),
      easing: 'easeOutQuint',
    }, '-=300')
    // Brief cyber-style blink/glitch on the name after it appears
    // Scanline-style glitch: lines and text jitter left/right + slant
    .add({
      targets: '.hero-name-glitch-lines',
      duration: 260,
      easing: 'steps(4)',
      keyframes: [
        { opacity: 0, translateY: -4, translateX: 0, skewX: 0, duration: 40 },
        { opacity: 1, translateY: 2, translateX: -3, skewX: -6, duration: 40 },
        { opacity: 0.6, translateY: -1, translateX: 2, skewX: 5, duration: 60 },
        { opacity: 1, translateY: 3, translateX: 4, skewX: -8, duration: 40 },
        { opacity: 0, translateY: 0, translateX: 0, skewX: 0, duration: 80 },
      ],
    })
    // Text itself jitters horizontally and slants during the same window
    .add({
      targets: '.hero-name',
      duration: 220,
      easing: 'steps(4)',
      keyframes: [
        { translateY: 0, translateX: 0, skewX: 0, duration: 40 },
        { translateY: -1, translateX: -3, skewX: -5, duration: 40 },
        { translateY: 1, translateX: 2, skewX: 4, duration: 60 },
        { translateY: -1, translateX: 4, skewX: -7, duration: 40 },
        { translateY: 0, translateX: 0, skewX: 0, duration: 40 },
      ],
    })
    .add({
      targets: '.hero-role',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 700,
    }, '-=400')
    .add({
      targets: '.hero-ctas',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
    }, '-=400')
    .add({
      targets: '#scroll-line',
      scaleX: [0, 1],
      duration: 700,
      easing: 'easeOutExpo',
    }, '-=200')
    .add({
      targets: '.scroll-hint',
      opacity: [0, 1],
      duration: 400,
    }, '-=500');

  // Blob float
  anime({
    targets: '.blob-1',
    translateX: anime.stagger([-30, 30]),
    translateY: [0, -40, 0],
    duration: 8000,
    loop: true,
    easing: 'easeInOutSine',
    direction: 'alternate',
  });
  anime({
    targets: '.blob-2',
    translateX: [0, 30, 0],
    translateY: [0, -25, 0],
    duration: 10000,
    loop: true,
    easing: 'easeInOutSine',
    direction: 'alternate',
  });
}

// Scroll-triggered animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;

    if (el.classList.contains('stat-card')) {
      anime({
        targets: el,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 700,
        easing: 'easeOutExpo',
      });
    }
    if (el.classList.contains('skill-category')) {
      anime({
        targets: el,
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 700,
        easing: 'easeOutExpo',
        delay: parseInt(el.dataset.delay || 0),
      });
    }
    if (el.classList.contains('project-card')) {
      anime({
        targets: el,
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 800,
        easing: 'easeOutExpo',
        delay: parseInt(el.dataset.delay || 0),
      });
    }
    if (el.classList.contains('exp-item')) {
      anime({
        targets: el,
        opacity: [0, 1],
        translateX: [-30, 0],
        duration: 700,
        easing: 'easeOutExpo',
        delay: parseInt(el.dataset.delay || 0),
      });
    }
    if (el.classList.contains('cert-item')) {
      anime({
        targets: el,
        opacity: [0, 1],
        scale: [0.88, 1],
        duration: 600,
        easing: 'easeOutBack',
        delay: parseInt(el.dataset.delay || 0),
      });
    }
    if (el.id === 'contact-email') {
      anime({
        targets: el,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: 'easeOutExpo',
      });
    }
    if (el.classList.contains('contact-link')) {
      anime({
        targets: el,
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 600,
        easing: 'easeOutExpo',
        delay: parseInt(el.dataset.delay || 0),
      });
    }

    observer.unobserve(el);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.stat-card').forEach((el, i) => {
  el.dataset.delay = i * 100;
  observer.observe(el);
});
document.querySelectorAll('.skill-category').forEach((el, i) => {
  el.dataset.delay = i * 80;
  observer.observe(el);
});
document.querySelectorAll('.project-card').forEach((el, i) => {
  el.dataset.delay = i * 100;
  observer.observe(el);
});
document.querySelectorAll('.exp-item').forEach((el, i) => {
  el.dataset.delay = i * 120;
  observer.observe(el);
});
document.querySelectorAll('.cert-item').forEach((el, i) => {
  el.dataset.delay = i * 60;
  observer.observe(el);
});
document.querySelectorAll('.contact-link').forEach((el, i) => {
  el.dataset.delay = i * 80;
  observer.observe(el);
});

const contactEmail = document.getElementById('contact-email');
if (contactEmail) {
  observer.observe(contactEmail);
}

// Stat number "glitch" effect
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const numEl = entry.target.querySelector('.stat-num');
    if (!numEl) return;
    const raw = numEl.textContent.trim();
    let count = 0;
    const chars = '0123456789ABCDEF';
    const original = raw;
    const interval = setInterval(() => {
      if (count > 8) { numEl.textContent = original; clearInterval(interval); return; }
      numEl.textContent = raw.split('').map((c, i) =>
        i < count ? c : (isNaN(c) ? c : chars[Math.floor(Math.random() * 10)])
      ).join('');
      count++;
    }, 60);
    statObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(el => statObserver.observe(el));
