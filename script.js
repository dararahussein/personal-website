(function () {
  "use strict";

  var navToggle = document.getElementById("nav-toggle");
  var navLinks = document.getElementById("nav-links");
  var sections = document.querySelectorAll("main .win[id]");
  var sectionLinks = document.querySelectorAll("#nav-links a, .taskbar-tasks a");

  /* Active nav link on scroll */
  function onScroll() {
    var current = "";
    sections.forEach(function (section) {
      if (window.scrollY >= section.offsetTop - 80) {
        current = section.getAttribute("id");
      }
    });

    sectionLinks.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open);
      navToggle.textContent = open ? "Menu ▲" : "Menu ▼";
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.textContent = "Menu ▼";
      });
    });
  }

  /* Visitor counter (localStorage — very GeoCities) */
  var counterEl = document.getElementById("visitor-count");
  if (counterEl) {
    var counterKey = "darara-visitor-count";
    var count = parseInt(localStorage.getItem(counterKey) || "42069", 10) + 1;
    localStorage.setItem(counterKey, String(count));
    counterEl.textContent = String(count).padStart(6, "0");
  }

  /* Scroll to top */
  var scrollTopBtn = document.getElementById("scroll-top");
  if (scrollTopBtn) {
    scrollTopBtn.removeAttribute("hidden");

    function toggleScrollTop() {
      scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
    }

    window.addEventListener("scroll", toggleScrollTop, { passive: true });
    toggleScrollTop();

    scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* Taskbar clock */
  var clockEl = document.getElementById("taskbar-clock");
  if (clockEl) {
    function tick() {
      var now = new Date();
      var h = now.getHours();
      var ampm = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      clockEl.textContent = h + ":" + String(now.getMinutes()).padStart(2, "0") + " " + ampm;
    }
    tick();
    setInterval(tick, 30000);
  }

  /* Start menu */
  var startBtn = document.getElementById("start-btn");
  var startMenu = document.getElementById("start-menu");

  function closeStartMenu() {
    if (startMenu && !startMenu.hidden) {
      startMenu.hidden = true;
      startBtn.setAttribute("aria-expanded", "false");
    }
  }

  if (startBtn && startMenu) {
    startBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      var opening = startMenu.hidden;
      startMenu.hidden = !opening;
      startBtn.setAttribute("aria-expanded", String(opening));
    });

    startMenu.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        closeStartMenu();
      }
    });

    document.addEventListener("click", function (event) {
      if (!startMenu.hidden && !startMenu.contains(event.target)) {
        closeStartMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeStartMenu();
      }
    });
  }

  /* Shut Down... easter egg */
  var shutdownBtn = document.getElementById("shutdown-btn");
  var shutdown = document.getElementById("shutdown");

  if (shutdownBtn && shutdown) {
    shutdownBtn.addEventListener("click", function () {
      closeStartMenu();
      shutdown.hidden = false;
    });

    shutdown.addEventListener("click", function () {
      shutdown.hidden = true;
    });
  }

  /* Window controls: "_" collapses, "×" shakes */
  document.querySelectorAll(".win").forEach(function (win) {
    var minBtn = win.querySelector(".win-btn--min");
    var closeBtn = win.querySelector(".win-btn--close");

    if (minBtn) {
      minBtn.addEventListener("click", function () {
        win.classList.toggle("win--min");
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        win.classList.add("win--shake");
      });
      win.addEventListener("animationend", function () {
        win.classList.remove("win--shake");
      });
    }
  });
})();
