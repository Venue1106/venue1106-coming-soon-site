# Venue 1106 — Coming Soon (Netlify-ready)

## Setup
```bash
npm install
npm run build
```

Deploy by dragging the folder into Netlify or linking a Git repo.

## Connect your Google Form + Social Links
Edit `src/config.js`:
- `GOOGLE_FORM_URL`: paste your Google Form share link
- `SOCIAL`: paste your Instagram, Facebook, TikTok URLs

## Netlify SPA Routing
`public/_redirects` sends all routes to `index.html` (200). A custom `404.html` is included.

## Namecheap DNS for Netlify
- `@` → A: 75.2.60.5 and 99.83.190.102
- `www` → CNAME: your `*.netlify.app` subdomain
