# Personal Website

A clean, responsive personal portfolio site built with vanilla HTML, CSS, and JavaScript. No build step required.

## Quick Start

Open `index.html` in your browser, or run a local server:

```bash
# Python
python -m http.server 8080

# Node (if you have npx)
npx serve .
```

Then visit [http://localhost:8080](http://localhost:8080).

## Customize

Edit these placeholders in `index.html`:

| Placeholder | Where |
|---|---|
| `Your Name` | Title, hero, footer |
| `YN` | Nav logo initials |
| `your.email@example.com` | Contact button |
| `yourprofile` | LinkedIn URL |
| GitHub username | Project & social links (currently `darar`) |

Update project descriptions, skills, and stats to match your experience.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to **Deploy from branch** → `main` → `/ (root)`
4. Your site will be live at `https://<username>.github.io/<repo-name>/`

## Structure

```
personal website/
├── index.html    # Page content
├── styles.css    # All styles
├── script.js     # Nav, scroll animations
└── README.md
```

## Features

- Dark theme with warm gold accents
- Fully responsive (mobile menu included)
- Scroll-triggered reveal animations
- Accessible navigation with ARIA labels
- Respects `prefers-reduced-motion`
