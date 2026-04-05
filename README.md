# Phase City — Websites

Static multi-page site for **Phase City**, a community-governed FiveM GTA V roleplay server. Every page is a self-contained HTML file with inline CSS + JavaScript — no build step, no framework, no dependencies. Deploys to GitHub Pages and Cloudflare Pages.

🌐 **Live:** [phasecity.net](https://www.phasecity.net) · 💬 **Discord:** [discord.gg/NSZHK6spre](https://discord.gg/NSZHK6spre)

## Pages

| Page | URL | Purpose |
|---|---|---|
| Rules & Community | [/](https://www.phasecity.net/) | Server rules, warning-point system, roleplay guidelines |
| Citizen Portal | [/citizen-portal.html](https://www.phasecity.net/citizen-portal.html) | Submit bug reports, suggestions, crash logs |
| Store | [/store.html](https://www.phasecity.net/store.html) | Supporter packages and custom items |
| Gang Bible | [/gang-bible.html](https://www.phasecity.net/gang-bible.html) | Whitelisted gang roleplay handbook |
| Rules Handbook | [/rules-handbook.html](https://www.phasecity.net/rules-handbook.html) | Full rules with extended ruleset |
| Tools | [/tools/](https://www.phasecity.net/tools/) | FiveM utilities (ped builder, radio, scanner, map, etc.) |

Internal (noindex, not in sitemap):

- LSPD SOP
- Pillbox Medical SOP
- Dev Task Board

## Local development

```bash
node server.js
# → http://localhost:3000 (root maps to citizen-portal.html)
```

The dev server is 10 lines — it just serves static files from the repo root.

**Note on fonts:** pages load from `fonts.cloudflare.com` (Cloudflare Fonts proxy). These resolve only when the site is served through Cloudflare's CDN — locally via `node server.js` they return `ERR_BLOCKED_BY_ORB`. That's expected.

## Deploying

Pushes to `main` auto-deploy to GitHub Pages via [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml). The live production site is behind Cloudflare, which:

- Proxies Google Fonts through `fonts.cloudflare.com`
- Serves Brotli compression (cuts transfer size by ~73%)
- Applies cache + security headers from [`_headers`](./_headers)

The `404.html` page handles typos with a link back home and to Discord.

## Architecture

Each page is one HTML file with:

- Inline `<style>` (minified, page-scoped design tokens)
- Inline `<script>` (event handlers, form logic, fetch calls)
- Shared aesthetic:
  - Purple primary (`#8b5cf6`)
  - Fonts: Syne + DM Sans + JetBrains Mono
  - Stars background
  - Title format `Phase City // <Section>`

External services:

- **Discord webhooks** — citizen-portal posts embeds for bugs, suggestions, crashes
- **JSONBin** — taskboard persistence, citizen-portal task mirror
- **Tebex** — store checkout links
- **exchangerate-api.com** — live FX rates on store page

## Contributing

- **Found a bug on the live site?** Use the [Citizen Portal](https://www.phasecity.net/citizen-portal.html) — it creates a tracked ticket.
- **Pull requests** — keep changes per-page; don't introduce a build system. See [CLAUDE.md](./CLAUDE.md) for detailed architecture notes, testing commands, and known bugs.
- **Tests** live in `tests/` (gitignored) — **1,375 total** across Vitest (static) + Playwright (real browser × 3 viewports). Covers:
  - Logic (form validation, embed construction, file upload, tool utilities)
  - Accessibility (WCAG AA, landmarks, labels, colour contrast)
  - SEO + AI (Open Graph, Twitter, JSON-LD, sitemap, llms.txt, robots)
  - Performance (page-weight grades A–F, CLS, fluid typography, bundle minify)
  - Mobile + tablet viewports (iPhone 13 + iPad Pro 11 emulated)
  - CSS effects (no orphaned keyframes, valid transitions, hover completeness)
  - Character encoding (UTF-8 validity, C1 control byte detection, mojibake)
  - Click behaviour (every button, link, accordion exercised in real Chromium)
  - Cloudflare/GitHub Pages compat (case-sensitivity, no Jekyll conflicts)

  ```bash
  cd tests
  npm test          # Vitest (~13s)
  npm run e2e       # Playwright desktop + tablet + mobile (~53s)
  ```

  See [CLAUDE.md](./CLAUDE.md) → "Test suite coverage" for the full map.

## License

© Phase City. All rights reserved.
