/* ============================================================
   David Girnstein — UGC Studio
   main.js · 2026
   ============================================================ */

(() => {
  "use strict";

  /* ---------- 1. Header scroll state ---------- */
  const header = document.getElementById("siteHeader");
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 12) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- 2. Mobile nav ---------- */
  const navToggle = document.getElementById("navToggle");
  const body = document.body;
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const open = body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(open));
      document.documentElement.style.overflow = open ? "hidden" : "";
    });
    // close on link click
    document.querySelectorAll(".nav-links a").forEach((a) => {
      a.addEventListener("click", () => {
        body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.documentElement.style.overflow = "";
      });
    });

    // close on X button
    const navClose = document.getElementById("navClose");
    if (navClose) {
      navClose.addEventListener("click", () => {
        body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.documentElement.style.overflow = "";
      });
    }
  }

  /* ---------- 3. Reveal on scroll (IntersectionObserver) ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- 4. Portfolio filter ---------- */
  const chips = document.querySelectorAll(".chip[data-filter]");
  const cards = document.querySelectorAll(".work-card");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      const filter = chip.dataset.filter;
      cards.forEach((card) => {
        const show = filter === "all" || card.dataset.cat === filter;
        card.style.display = show ? "" : "none";
      });
    });
  });

  /* ---------- 5. Lazy-load YouTube embeds on click ----------
     Why: keeps initial page load tiny (no third-party iframes
     until the user actually clicks play). */
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (card.classList.contains("is-playing")) return;
      const ytId = card.dataset.yt;
      if (!ytId) return;
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
      iframe.title = "Video Player";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.loading = "lazy";
      card.appendChild(iframe);
      card.classList.add("is-playing");
    });
  });

  /* ---------- 6. Smooth-scroll offset for sticky header ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#" || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  /* ---------- 7. Magnetic primary buttons ----------
     Subtle attract-to-cursor effect on big CTAs. Skipped on touch. */
  const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (supportsHover) {
    document.querySelectorAll(".btn-primary, .btn-dark").forEach((btn) => {
      const strength = 8;
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${(x / r.width) * strength}px, ${(y / r.height) * strength}px)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }

  /* ---------- 8. After hero animations finish, remove overflow-clip on words ----------
     This prevents italic letters from being clipped once the slide-in is done. */
  setTimeout(() => {
    document.querySelectorAll(".hero-headline .word").forEach((w) => {
      w.style.overflow = "visible";
    });
  }, 1900);

})();
