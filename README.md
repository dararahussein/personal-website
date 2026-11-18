# Darara Hussein — Personal Portfolio (`dhussein.com`)

Clean, single-column minimal portfolio with Light/Dark mode, inline expandable project breakdowns, built-in Notes reader, one-click email copy, and zero build dependencies.

## Quick Edits

Everything on the site lives in **[data.js](./data.js)**:

1. **Email & Bio**: Update `profile.email`, `profile.bio`, or `profile.socials` in `data.js`.
2. **Resume PDF**: Replace `resume.pdf` in this folder with your real resume PDF.
3. **Projects**: Add or reorder items in `projects` inside `data.js`.
4. **Notes / Articles**: Add an entry to `notes` inside `data.js`—each note automatically gets a clean reader view and shareable `#note/<slug>` link.

## Preview Locally

Double-click `index.html` or serve locally:

```bash
python -m http.server 8123
```

## Deploying to `dhussein.com`

Upload `index.html`, `styles.css`, `data.js`, `script.js`, and `resume.pdf` directly to your static host (GitHub Pages / Cloudflare Pages / Netlify), and enable **Enforce HTTPS** in your domain host settings so `https://dhussein.com` serves over SSL.
