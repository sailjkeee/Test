/* global gsap, ScrollTrigger */
(() => {
  gsap.registerPlugin(ScrollTrigger);

  const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
  intro
    .from(".brand", { opacity: 0, y: -10, duration: 0.6 }, 0)
    .from(".nav__link", { opacity: 0, y: -10, duration: 0.6, stagger: 0.06 }, 0.05)
    .from(".btn--ghost", { opacity: 0, y: -10, duration: 0.6 }, 0.15)
    .from(".hero__title-line", { opacity: 0, y: 18, duration: 0.85, stagger: 0.08 }, 0.25)
    .from(".hero__badges", { opacity: 0, y: 10, duration: 0.6 }, 0.6);

  const marquee = document.getElementById("expertiseMarquee");
  if (marquee) {
    // делаем бесшов: дублируем содержимое
    marquee.innerHTML += marquee.innerHTML;
    const width = marquee.scrollWidth / 2;

    gsap.set(marquee, { x: 0 });
    gsap.to(marquee, {
      x: -width,
      duration: 18,
      ease: "none",
      repeat: -1
    });
  }

  const cards = gsap.utils.toArray("[data-xcard]");
  gsap.from(cards, {
    scrollTrigger: { trigger: ".expertise", start: "top 75%" },
    opacity: 0,
    y: 24,
    duration: 0.8,
    stagger: 0.08,
    ease: "power3.out",
  });

  cards.forEach((el, i) => {
    gsap.to(el, {
      y: "+=10",
      rotation: i % 2 ? 0.6 : -0.6,
      duration: 3.8 + i * 0.35,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });
  });

  cards.forEach((el, i) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: ".expertise",
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6
      },
      y: (i % 2 ? -22 : 18),
      ease: "none"
    });
  });

  gsap.utils.toArray(".float-cursor").forEach((c, idx) => {
    gsap.to(c, {
      x: idx === 1 ? -14 : 12,
      y: idx === 2 ? -10 : 14,
      rotation: idx === 0 ? 6 : -6,
      duration: 3.6 + idx * 0.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });
  });

  gsap.utils.toArray("[data-reveal]").forEach((el) => {
    gsap.to(el, {
      scrollTrigger: { trigger: el, start: "top 85%" },
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
    });
  });

  document.querySelectorAll("[data-tech-track]").forEach((track) => {
    track.innerHTML += track.innerHTML;
    const oneSet = track.scrollWidth / 2;

    gsap.set(track, { x: 0 });
    gsap.to(track, {
      x: -oneSet,
      duration: 16,
      ease: "none",
      repeat: -1
    });
  });

  const partnersTrack = document.getElementById("partnersTrack");
  if (partnersTrack) {
    const run = () => {
      const w = partnersTrack.scrollWidth / 2;
      gsap.set(partnersTrack, { x: 0 });
      gsap.to(partnersTrack, {
        x: -w,
        duration: 22,
        ease: "none",
        repeat: -1
      });
    };
    run();
  }

  document.querySelectorAll(".pcard").forEach((card) => {
    const go = card.querySelector(".pcard__go");
    const url = card.getAttribute("data-url");

    const nav = () => {
      if (!url) return;
      window.location.hash = url;
    };

    card.addEventListener("click", (e) => {
      nav();
    });

    if (go) {
      go.addEventListener("click", (e) => {
        e.stopPropagation();
        nav();
      });
    }
  });

  // ====== Modal (services) ======
  const modal = document.getElementById("serviceModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const modalChips = document.getElementById("modalChips");

  const serviceData = {
    mobile: {
      title: "Мобильная разработка",
      chips: ["iOS", "Android", "React Native", "Flutter"],
      body: [
        "Разрабатываем нативные и кроссплатформенные приложения: архитектура, производительность, безопасность, публикация в сторы.",
        "Подключаем аналитики/платежи/пуши, делаем CI/CD и поддерживаем релизы."
      ],
    },
    web: {
      title: "Веб разработка",
      chips: ["Front-end", "Back-end", "API", "DevOps"],
      body: [
        "Проектируем веб-сервисы и личные кабинеты: SSR/SPA, интеграции, нагрузка, отказоустойчивость.",
        "Делаем админки, CRM-модули, платёжные потоки и мониторинг."
      ],
    },
    design: {
      title: "Дизайн и UX",
      chips: ["UX", "UI", "Design System", "Research"],
      body: [
        "Проектируем пользовательские сценарии, прототипы и интерфейсы, собираем дизайн-системы.",
        "Помогаем с тестированием гипотез и консистентностью продукта."
      ],
    },
    backend: {
      title: "Backend и API",
      chips: ["Node.js", "PHP", "MySQL", "Cloud"],
      body: [
        "Собираем надёжный бэкенд: модели данных, очереди, кеширование, авторизация, аудит.",
        "Интегрируем внешние сервисы, масштабируем и профилируем узкие места."
      ],
    }
  };

  function openModal(serviceKey) {
    const data = serviceData[serviceKey] || serviceData.mobile;

    modalTitle.textContent = data.title;

    modalChips.innerHTML = "";
    data.chips.forEach((c) => {
      const span = document.createElement("span");
      span.className = "chip chip--solid";
      span.textContent = c;
      modalChips.appendChild(span);
    });

    modalBody.innerHTML = data.body.map(p => `<p>${p}</p>`).join("");

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    gsap.fromTo(".modal__panel",
      { x: 40, opacity: 0, scale: 0.98 },
      { x: 0, opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" }
    );
  }

  function closeModal() {
    gsap.to(".modal__panel", {
      x: 20,
      opacity: 0,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
      }
    });
  }

  document.querySelectorAll("[data-open-modal]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const card = btn.closest("[data-service]");
      const key = card ? card.getAttribute("data-service") : "mobile";
      openModal(key);
    });
  });

  document.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

const logo = document.getElementById("logo3d");
const cube = document.getElementById("logo3dCube");

if (logo && cube) {
  let isDown = false;
  let lastX = 0, lastY = 0;
  let rotX = -18, rotY = 26;

  gsap.set(cube, {
    rotationX: rotX,
    rotationY: rotY,
    scale: 1,
    transformStyle: "preserve-3d",
    transformOrigin: "50% 50%"
  });

  const toRX = gsap.quickTo(cube, "rotationX", { duration: 0.18, ease: "power2.out" });
  const toRY = gsap.quickTo(cube, "rotationY", { duration: 0.18, ease: "power2.out" });

  const idle = gsap.to(cube, {
    rotationY: "+=360",
    duration: 26,
    ease: "none",
    repeat: -1
  });

  
  gsap.to(cube, {
    scale: 1.04,
    duration: 2.4,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
  });

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  logo.addEventListener("pointerdown", (e) => {
    isDown = true;
    logo.setPointerCapture(e.pointerId);
    lastX = e.clientX;
    lastY = e.clientY;
    idle.pause();
  });

  logo.addEventListener("pointermove", (e) => {
    if (!isDown) return;

    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;

    rotY += dx * 0.45;
    rotX -= dy * 0.35;
    rotX = clamp(rotX, -65, 65);

    toRX(rotX);
    toRY(rotY);
  });

  const endDrag = () => {
    if (!isDown) return;
    isDown = false;
    idle.play();
  };

  logo.addEventListener("pointerup", endDrag);
  logo.addEventListener("pointercancel", endDrag);
}

})();
