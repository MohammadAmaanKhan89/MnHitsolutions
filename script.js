/* ============================================
   MNH IT Solutions — Interactions & Animations
   GSAP + ScrollTrigger + Lenis + tsParticles
   ============================================ */

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------
   1. Lenis smooth scroll
------------------------------------------- */
const lenis = new Lenis({
  duration: 1.1,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

/* ------------------------------------------
   2. tsParticles background
------------------------------------------- */
if (window.tsParticles) {
  tsParticles.load("particles", {
    fpsLimit: 60,
    fullScreen: { enable: false },
    background: { color: "transparent" },
    particles: {
      number: { value: 60, density: { enable: true, area: 1100 } },
      color: { value: ["#1F6FEB", "#29B6F6", "#FF5722"] },
      shape: { type: "circle" },
      opacity: {
        value: { min: 0.08, max: 0.35 },
        animation: { enable: true, speed: 0.4, sync: false }
      },
      size: { value: { min: 1, max: 2.5 } },
      links: {
        enable: true,
        distance: 140,
        color: "#1F6FEB",
        opacity: 0.08,
        width: 1
      },
      move: {
        enable: true,
        speed: 0.4,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "out" }
      }
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        resize: true
      },
      modes: {
        grab: { distance: 160, links: { opacity: 0.25 } }
      }
    },
    detectRetina: true
  });
}

/* ------------------------------------------
   3. Custom cursor (glow + dot trail)
------------------------------------------- */
const cursorGlow = document.getElementById('cursorGlow');
const cursorDot = document.getElementById('cursorDot');

let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
let glowX = mouseX, glowY = mouseY;
let dotX = mouseX, dotY = mouseY;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  glowX += (mouseX - glowX) * 0.08;
  glowY += (mouseY - glowY) * 0.08;
  dotX += (mouseX - dotX) * 0.22;
  dotY += (mouseY - dotY) * 0.22;

  if (cursorGlow) cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
  if (cursorDot) cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;

  requestAnimationFrame(animateCursor);
}
animateCursor();

/* Cursor reacts to interactive elements */
const hoverTargets = document.querySelectorAll('a, button, .magnetic, [data-tilt], input, select, textarea');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorGlow && cursorGlow.classList.add('cursor-glow--active');
    gsap.to(cursorGlow, { scale: 1.4, duration: 0.4, ease: 'power3.out' });
    gsap.to(cursorDot, { scale: 1.8, duration: 0.3, ease: 'power3.out' });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(cursorGlow, { scale: 1, duration: 0.4, ease: 'power3.out' });
    gsap.to(cursorDot, { scale: 1, duration: 0.3, ease: 'power3.out' });
  });
});

/* ------------------------------------------
   4. Magnetic buttons
------------------------------------------- */
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.5,
      ease: 'power3.out'
    });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
  });
});

/* ------------------------------------------
   5. Glass card spotlight (hover glow follow)
------------------------------------------- */
document.querySelectorAll('.glass').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${mx}%`);
    card.style.setProperty('--my', `${my}%`);
  });
});

/* ------------------------------------------
   6. 3D tilt on cards
------------------------------------------- */
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateY: px * 8,
      rotateX: -py * 8,
      transformPerspective: 800,
      scale: 1.015,
      duration: 0.6,
      ease: 'power3.out'
    });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.7, ease: 'power3.out' });
  });
});

/* ------------------------------------------
   7. Loader intro animation
------------------------------------------- */
const loaderTl = gsap.timeline();

loaderTl
  .to('.loader-icon', {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    ease: 'power4.out'
  })
  .to('.loader-text', {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power3.out'
  }, '-=0.3')
  .to('.loader-icon, .loader-text', {
    y: -30,
    opacity: 0,
    duration: 0.5,
    ease: 'power3.in',
    delay: 0.4
  })
  .to('.loader', {
    yPercent: -100,
    duration: 0.8,
    ease: 'power4.inOut'
  }, '-=0.2')
  .set('.loader', { display: 'none' });

/* ------------------------------------------
   8. Hero entrance animation
------------------------------------------- */
const heroTl = gsap.timeline({ delay: 1.6 });

heroTl
  .to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
  .to('.reveal-inner', {
    y: 0,
    duration: 1,
    stagger: 0.12,
    ease: 'power4.out'
  }, '-=0.4')
  .to('.hero-sub', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.6')
  .to('.hero-actions', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.7')
  .to('.hero-stats', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.7')
  .fromTo('.hero-float-card', {
    opacity: 0,
    y: 60,
    scale: 0.9
  }, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1,
    stagger: 0.15,
    ease: 'power4.out'
  }, '-=0.9')
  .add(() => animateCounters());

/* ------------------------------------------
   9. Floating effect for hero cards (continuous)
------------------------------------------- */
gsap.to('.hero-float-card--1', {
  y: -18,
  duration: 3.4,
  ease: 'sine.inOut',
  repeat: -1,
  yoyo: true,
  delay: 2.4
});
gsap.to('.hero-float-card--2', {
  y: 16,
  duration: 4,
  ease: 'sine.inOut',
  repeat: -1,
  yoyo: true,
  delay: 2.6
});
gsap.to('.hero-float-card--3', {
  y: -14,
  x: 8,
  duration: 3.8,
  ease: 'sine.inOut',
  repeat: -1,
  yoyo: true,
  delay: 2.8
});

/* Floating glows ambient motion */
gsap.to('.hero-glow--1', { x: 40, y: 30, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
gsap.to('.hero-glow--2', { x: -30, y: 40, duration: 11, repeat: -1, yoyo: true, ease: 'sine.inOut' });
gsap.to('.hero-glow--3', { x: 30, y: -20, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut' });

/* ------------------------------------------
   10. Mouse-parallax on hero floating cards
------------------------------------------- */
const hero = document.querySelector('.hero');
if (hero) {
  hero.addEventListener('mousemove', (e) => {
    const { innerWidth, innerHeight } = window;
    const px = (e.clientX / innerWidth - 0.5);
    const py = (e.clientY / innerHeight - 0.5);

    gsap.to('.hero-float-card--1', { x: px * 30, rotateZ: px * 2, duration: 1.2, ease: 'power2.out' });
    gsap.to('.hero-float-card--2', { x: px * -24, rotateZ: px * -2, duration: 1.4, ease: 'power2.out' });
    gsap.to('.hero-float-card--3', { x: px * 20, rotateZ: px * 1.5, duration: 1.6, ease: 'power2.out' });
    gsap.to('.hero-glow--1', { x: px * 60, y: py * 40, duration: 1.6, ease: 'power2.out' });
    gsap.to('.hero-glow--2', { x: px * -50, y: py * 30, duration: 1.8, ease: 'power2.out' });
  });
}

/* ------------------------------------------
   11. Animated stat counters
------------------------------------------- */
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '+';
    const duration = 1800;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  });
}

/* ------------------------------------------
   12. Scroll-triggered reveal animations
------------------------------------------- */
gsap.utils.toArray('[data-reveal]').forEach((el) => {
  // Skip elements already animated by hero timeline
  if (el.closest('.hero')) return;

  gsap.fromTo(el, {
    opacity: 0,
    y: 50
  }, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  });
});

/* Cards zoom in animation */
gsap.fromTo('.service-card, .portfolio-card', {
  opacity: 0,
  y: 30,
  scale: 0.7
}, {
  opacity: 1,
  y: 0,
  scale: 1,
  duration: 0.8,
  stagger: 0.1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.services-grid, .portfolio-grid',
    start: 'top 80%',
    toggleActions: 'play none none none'
  }
});

/* About points stagger */
gsap.fromTo('.about-point', {
  opacity: 0,
  x: -30
}, {
  opacity: 1,
  x: 0,
  duration: 0.8,
  stagger: 0.15,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.about-points',
    start: 'top 85%',
    toggleActions: 'play none none none'
  }
});

/* ------------------------------------------
   13. Orbit ring animations (zoom in)
------------------------------------------- */
gsap.fromTo('.orbit-ring--1, .orbit-ring--2, .orbit-ring--3', {
  opacity: 0,
  scale: 0.7
}, {
  opacity: 1,
  scale: 1,
  duration: 1,
  ease: 'power3.out'
});

gsap.utils.toArray('.orbit-node').forEach((node, i) => {
  gsap.to(node, {
    y: i % 2 === 0 ? -10 : 10,
    duration: 3 + i * 0.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
});

gsap.fromTo('.orbit-card', {
  opacity: 0,
  scale: 0.7
}, {
  opacity: 1,
  scale: 1,
  duration: 1.2,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.orbit-card',
    start: 'top 80%',
    toggleActions: 'play none none none'
  }
});

/* ------------------------------------------
   14. Section title parallax fade on scroll out
------------------------------------------- */
gsap.utils.toArray('.section-title').forEach((title) => {
  gsap.fromTo(title, {
    backgroundPosition: '0% 50%'
  }, {
    backgroundPosition: '0% 50%',
    scrollTrigger: {
      trigger: title,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
});

/* ------------------------------------------
   15. Navbar scroll state
------------------------------------------- */
const navbar = document.getElementById('navbar');
ScrollTrigger.create({
  start: 'top -80',
  end: 99999,
  onUpdate: (self) => {
    if (self.scroll() > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
});

/* ------------------------------------------
   16. Mobile menu toggle
------------------------------------------- */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    mobileMenu.classList.remove('open');
  });
});

/* ------------------------------------------
   17. Smooth anchor scrolling via Lenis
------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80, duration: 1.4 });
    }
  });
});

/* ------------------------------------------
   18. Contact form (demo submission feedback)
------------------------------------------- */
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  const formFields = contactForm.querySelector('.form-fields');
  const formSuccess = contactForm.querySelector('.form-success');

 contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);

    fetch('https://formspree.io/f/mdavbalq', {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' }
    })
    .then((res) => {
      if (!res.ok) {
        alert('Something went wrong. Please email us directly at mnhitsolution@gmail.com');
        return;
      }

      gsap.to(formFields, {
        opacity: 0,
        y: -24,
        scale: 0.97,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          formFields.style.display = 'none';

          gsap.set(formSuccess, { visibility: 'visible', pointerEvents: 'auto' });
          gsap.fromTo(formSuccess, {
            opacity: 0,
            y: 24,
            scale: 0.96
          }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'power3.out'
          });

          gsap.fromTo(formSuccess.querySelector('.form-success-icon'), {
            scale: 0,
            rotate: -45
          }, {
            scale: 1,
            rotate: 0,
            duration: 0.6,
            delay: 0.15,
            ease: 'back.out(2.2)'
          });
        }
      });
    })
    .catch(() => {
      alert('Network error. Please check your connection and try again.');
    });
  });
}
/* ------------------------------------------
   18b. Contact section entrance + microinteractions
------------------------------------------- */
gsap.fromTo('.contact-form', {
  opacity: 0,
  y: 60,
  scale: 0.97
}, {
  opacity: 1,
  y: 0,
  scale: 1,
  duration: 1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.contact-grid',
    start: 'top 80%',
    toggleActions: 'play none none none'
  }
});

gsap.fromTo('.contact-form .field', {
  opacity: 0,
  y: 24
}, {
  opacity: 1,
  y: 0,
  duration: 0.7,
  stagger: 0.08,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.contact-grid',
    start: 'top 80%',
    toggleActions: 'play none none none'
  },
  delay: 0.25
});

gsap.fromTo('.contact-form button[type="submit"]', {
  opacity: 0,
  y: 24
}, {
  opacity: 1,
  y: 0,
  duration: 0.7,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.contact-grid',
    start: 'top 80%',
    toggleActions: 'play none none none'
  },
  delay: 0.6
});

gsap.fromTo('.info-card', {
  opacity: 0,
  x: 50
}, {
  opacity: 1,
  x: 0,
  duration: 0.8,
  stagger: 0.15,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.contact-info',
    start: 'top 82%',
    toggleActions: 'play none none none'
  }
});

gsap.fromTo('.social-icon', {
  opacity: 0,
  scale: 0,
  rotate: -90
}, {
  opacity: 1,
  scale: 1,
  rotate: 0,
  duration: 0.6,
  stagger: 0.1,
  ease: 'back.out(2)',
  scrollTrigger: {
    trigger: '.social-row',
    start: 'top 90%',
    toggleActions: 'play none none none'
  },
  delay: 0.5
});

/* Field focus micro-lift */
document.querySelectorAll('.field input, .field select, .field textarea').forEach(el => {
  el.addEventListener('focus', () => {
    gsap.to(el.closest('.field'), {
      y: -3,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  el.addEventListener('blur', () => {
    gsap.to(el.closest('.field'), {
      y: 0,
      duration: 0.4,
      ease: 'power2.out'
    });
  });
});

/* Submit button pulse-glow loop while idle, intensifies on hover */
const submitBtn = document.querySelector('.contact-form button[type="submit"]');
if (submitBtn) {
  submitBtn.addEventListener('mouseenter', () => {
    gsap.to(submitBtn, {
      backgroundPosition: '100% 0%',
      duration: 0.8,
      ease: 'power2.out'
    });
  });
  submitBtn.addEventListener('mouseleave', () => {
    gsap.to(submitBtn, {
      backgroundPosition: '0% 0%',
      duration: 0.8,
      ease: 'power2.out'
    });
  });
}

/* ------------------------------------------
   19. Refresh ScrollTrigger on load
------------------------------------------- */
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});

/* ------------------------------------------
   20. Policy page: scroll-spy for sticky TOC
------------------------------------------- */
const tocLinks = document.querySelectorAll('.policy-toc a');
const policySections = document.querySelectorAll('.policy-section');

if (tocLinks.length && policySections.length) {
  policySections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 35%',
      end: 'bottom 35%',
      onEnter: () => setActiveTocLink(section.id),
      onEnterBack: () => setActiveTocLink(section.id),
    });
  });

  function setActiveTocLink(id) {
    tocLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  }

  /* Animate policy sections on scroll */
  gsap.utils.toArray('.policy-section').forEach((el) => {
    gsap.fromTo(el, {
      opacity: 0,
      y: 40
    }, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });

  gsap.utils.toArray('.tier-card').forEach((el, i) => {
    gsap.fromTo(el, {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay: i * 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    });
  });
}


// Shortcut keys that will be disabled (case-insensitive)
const disabledKeys = ["c", "x", "j", "u", "i"];

const showAlert = (e) => {
    e.preventDefault();
    alert("This feature is restricted!");
};

// Disable right-click context menu
document.addEventListener("contextmenu", showAlert);

// Disable specific keyboard shortcuts
document.addEventListener("keydown", (e) => {
    if (
        (e.ctrlKey && disabledKeys.includes(e.key.toLowerCase())) ||
        e.key === "F12"
    ) {
        showAlert(e);
    }
});