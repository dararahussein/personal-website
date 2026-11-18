(function () {
  const data = window.PORTFOLIO_DATA;
  if (!data) return;

  const THEME_KEY = "dh_portfolio_theme";
  let expandedId = data.projects[0] ? data.projects[0].id : null;

  // ---- Theme Setup (Clean Light default + Dark toggle) ----
  function getInitialTheme() {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === "dark" || saved === "light") return saved;
    } catch (_) {}
    return "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;
    btn.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
    btn.setAttribute(
      "title",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
    btn.innerHTML =
      theme === "dark"
        ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`
        : `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (_) {}
    applyTheme(next);
  }

  // ---- Copy Email Helper ----
  function copyEmail(buttonEl) {
    const email = data.profile.email;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).catch(() => {});
    }
    if (!buttonEl) return;
    const original = buttonEl.getAttribute("data-label") || buttonEl.innerHTML;
    if (!buttonEl.getAttribute("data-label")) {
      buttonEl.setAttribute("data-label", original);
    }
    buttonEl.textContent = "✓ Copied email";
    clearTimeout(buttonEl.__copyTimer);
    buttonEl.__copyTimer = setTimeout(() => {
      buttonEl.innerHTML = buttonEl.getAttribute("data-label");
    }, 2000);
  }

  // ---- Render Intro ----
  function renderIntro() {
    const p = data.profile;
    const introEl = document.getElementById("intro");
    if (!introEl) return;

    const formattedBio = p.bio
      .map((para) => {
        return `<p>${para
          .replace("Mercury", "<strong>Mercury</strong>")
          .replace("Intuit", "<strong>Intuit</strong>")
          .replace("University of Minnesota", "<strong>University of Minnesota</strong>")}</p>`;
      })
      .join("");

    const socialButtons = p.socials
      .map(
        (s) => `
        <a class="btn-pill" href="${s.url}" target="_blank" rel="noopener noreferrer">
          <span>${s.label}</span>
          <span class="arrow">↗</span>
        </a>`
      )
      .join("");

    introEl.innerHTML = `
      <div class="intro-header">
        <div>
          <h1 class="intro-name">${p.name}</h1>
          <p class="intro-role">${p.headline} · ${p.subheadline}</p>
        </div>
        <div class="location-pill" title="${p.status}">
          <span class="status-dot" aria-hidden="true"></span>
          <span>${p.location}</span>
        </div>
      </div>

      <div class="intro-bio">
        ${formattedBio}
      </div>

      <div class="action-bar">
        <button type="button" class="btn-pill primary" id="hero-copy-email">
          <svg width="13.5" height="13.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          <span>Copy Email</span>
        </button>
        ${
          p.resumeUrl
            ? `<a class="btn-pill" href="${p.resumeUrl}" target="_blank" rel="noopener noreferrer">
          <span>Resume</span>
          <span class="arrow">↗</span>
        </a>`
            : ""
        }
        ${socialButtons}
      </div>
    `;

    const copyBtn = document.getElementById("hero-copy-email");
    if (copyBtn) {
      copyBtn.addEventListener("click", () => copyEmail(copyBtn));
    }
  }

  // ---- Render Experience ----
  function renderExperience() {
    const container = document.getElementById("experience-list");
    if (!container) return;

    container.innerHTML = data.experience
      .map(
        (exp) => `
        <div class="exp-item">
          <div class="exp-top">
            ${
              exp.logo
                ? `<img class="exp-logo" src="${exp.logo}" alt="${exp.company} logo" width="24" height="24" />`
                : `<span class="exp-badge" aria-hidden="true">${exp.monogram}</span>`
            }
            <span class="exp-company">${exp.company}</span>
            <span class="exp-role">${exp.role}</span>
            <span class="exp-leader" aria-hidden="true"></span>
            <span class="exp-period">${exp.period}</span>
          </div>
          ${exp.summary ? `<p class="exp-summary">${exp.summary}</p>` : ""}
        </div>
      `
      )
      .join("");
  }

  // ---- Render Selected Work ----
  function renderWork() {
    const container = document.getElementById("work-list");
    if (!container) return;

    container.innerHTML = data.projects
      .map((proj) => {
        const isOpen = expandedId === proj.id;
        return `
          <article class="work-item">
            <button
              type="button"
              class="work-trigger"
              data-project-id="${proj.id}"
              aria-expanded="${isOpen}"
            >
              <div class="work-main">
                <div class="work-title-row">
                  <span class="work-title">${proj.title}</span>
                  <span class="work-year">${proj.year}</span>
                </div>
                <p class="work-summary">${proj.summary}</p>
              </div>
              <span class="work-icon" aria-hidden="true">${isOpen ? "−" : "+"}</span>
            </button>

            <div class="work-panel" ${isOpen ? "" : "hidden"}>
              <ul class="work-bullets">
                ${proj.details.map((d) => `<li>${d}</li>`).join("")}
              </ul>
              <div class="work-footer">
                <div class="tag-list">
                  ${proj.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
                </div>
                <div class="work-links">
                  ${
                    proj.liveUrl
                      ? `<a class="work-link" href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer">Live Demo ↗</a>`
                      : ""
                  }
                  ${
                    proj.repoUrl
                      ? `<a class="work-link" href="${proj.repoUrl}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>`
                      : ""
                  }
                </div>
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    container.querySelectorAll(".work-trigger").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-project-id");
        expandedId = expandedId === id ? null : id;
        renderWork();
      });
    });
  }

  // ---- Render Notes List & Reader ----
  function renderNotes() {
    const container = document.getElementById("notes-list");
    const section = document.getElementById("notes");
    if (!container || !section) return;

    if (!data.notes || data.notes.length === 0) {
      container.classList.add("is-empty");
      container.innerHTML = `
        <div class="notes-empty">
          <span class="notes-empty-badge">🚧 Under construction</span>
          <span class="notes-empty-text">Notes &amp; writing coming soon.</span>
        </div>
      `;
      return;
    }

    container.classList.remove("is-empty");
    container.innerHTML = data.notes
      .map(
        (note) => `
        <a class="note-row" href="#note/${note.slug}">
          <span class="note-title">${note.title}</span>
          <span class="note-meta">${note.date} · ${note.readTime}</span>
        </a>
      `
      )
      .join("");
  }

  function handleRoute() {
    const hash = window.location.hash || "";
    const homeView = document.getElementById("home-view");
    const articleView = document.getElementById("article-view");
    if (!homeView || !articleView) return;

    if (hash.startsWith("#note/")) {
      const slug = decodeURIComponent(hash.slice("#note/".length));
      const note = (data.notes || []).find((n) => n.slug === slug);
      if (note) {
        homeView.hidden = true;
        articleView.hidden = false;
        articleView.innerHTML = `
          <a href="#" class="back-btn" id="back-home">← Back to overview</a>
          <article>
            <h1 class="article-title">${note.title}</h1>
            <div class="article-meta">${note.date} · ${note.readTime} · ${data.profile.name}</div>
            <div class="article-body">
              ${note.paragraphs.map((p) => `<p>${p}</p>`).join("")}
            </div>
          </article>
        `;
        const backBtn = document.getElementById("back-home");
        if (backBtn) {
          backBtn.addEventListener("click", (e) => {
            e.preventDefault();
            history.pushState("", document.title, window.location.pathname + window.location.search);
            handleRoute();
          });
        }
        window.scrollTo({ top: 0, behavior: "instant" });
        return;
      }
    }

    articleView.hidden = true;
    homeView.hidden = false;
  }

  // ---- Footer & Live Clock ----
  function renderFooter() {
    const footerLinks = document.getElementById("footer-links");
    if (footerLinks) {
      const socialsHtml = data.profile.socials
        .map(
          (s) =>
            `<a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.label}</a>`
        )
        .join("");

      footerLinks.innerHTML = `
        <button type="button" id="footer-copy-email">Email</button>
        ${
          data.profile.resumeUrl
            ? `<a href="${data.profile.resumeUrl}" target="_blank" rel="noopener noreferrer">Resume</a>`
            : ""
        }
        ${socialsHtml}
      `;

      const footerEmailBtn = document.getElementById("footer-copy-email");
      if (footerEmailBtn) {
        footerEmailBtn.addEventListener("click", () => copyEmail(footerEmailBtn));
      }
    }
  }

  function updateClock() {
    const clockEl = document.getElementById("local-clock");
    if (!clockEl) return;
    try {
      const formatted = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: data.profile.timeZone || "America/Chicago"
      }).format(new Date());
      clockEl.textContent = `${data.profile.location} · ${formatted} CT`;
    } catch (_) {
      clockEl.textContent = data.profile.location;
    }
  }

  // ---- Initialize ----
  applyTheme(getInitialTheme());

  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
  }

  const brandLink = document.getElementById("brand-home");
  if (brandLink) {
    brandLink.addEventListener("click", (e) => {
      if (window.location.hash.startsWith("#note/")) {
        e.preventDefault();
        history.pushState("", document.title, window.location.pathname + window.location.search);
        handleRoute();
      }
    });
  }

  renderIntro();
  renderExperience();
  renderWork();
  renderNotes();
  renderFooter();
  updateClock();
  setInterval(updateClock, 30000);

  window.addEventListener("hashchange", handleRoute);
  handleRoute();
})();
