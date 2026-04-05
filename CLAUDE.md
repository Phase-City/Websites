# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

This is a **static multi-page site** for Phase City (a FiveM GTA V roleplay community). Every page is a **single self-contained HTML file** with inline `<style>` and `<script>` blocks — no build step, no bundler, no framework. Files are served as-is.

**Deployment:** Cloudflare Pages (primary) + GitHub Pages. Both serve raw files, so paths must be relative and case-sensitive.

**No dependencies** — the only Node file in the repo is `server.js` (local dev server). External data flows through Discord webhooks and JSONBin.

### Page layout

```
/                       (root pages, all single-file HTML)
  index.html            # Rules & Community Guidelines (landing page)
  store.html            # Supporter packages + Tebex integration
  citizen-portal.html   # Bug/suggestion/crash reporting form
  gang-bible.html       # Whitelisted gang handbook
  rules-handbook.html   # Standalone rules + extended ruleset
  lspd.html             # LSPD SOP (admin-gated accordions)
  pillbox-medical.html  # EMS SOP (admin-gated accordions)
  taskboard.html        # Internal dev kanban (admin-gated)
  404.html              # Custom 404 (noindex)

img/                    # webp assets (no PNGs — all converted)
tools/                  # FiveM utility pages (ped builder, radio, map, etc.)
server.js               # trivial local dev server (port 3000)
sync-discord-members.js # regenerates discord-members.json
discord-members.json    # name → Discord ID mapping for @mentions
_headers                # Cloudflare Pages cache + security headers
sitemap.xml, robots.txt, manifest.json, llms.txt, ai.txt, humans.txt
```

All inline `<style>` and `<script>` blocks are **esbuild-minified in place** via
`tests/minify-pages.mjs`. Run that script after editing a page if you want to
re-compact it — tests verify the minified form still works.

### Shared conventions across pages

- **Title format:** `Phase City // <Section>` (use `//` separator, not em-dash)
- **Primary color:** `#8b5cf6` (purple) on most pages; `#3b82f6` (blue) on lspd.html
- **Fonts:** `Syne` (headings), `DM Sans` (body), `JetBrains Mono` (labels/code) on public pages
- **Font host:** `fonts.cloudflare.com` — the Cloudflare Fonts proxy. **Only resolves when served through Cloudflare's CDN.** Fails locally via `node server.js` with `ERR_BLOCKED_BY_ORB` — that's expected, not a bug. Do not revert to `fonts.googleapis.com`.
- **Accordion pattern:** `.rc`/`.rh`/`.rbody`/`.rb-in` on index + rules-handbook; `.rcard`/`.rch` on gang-bible (legacy name, don't rename)
- **Stars background:** `<div class="stars" id="stars"></div>` + JS that generates 40-160 `.star` spans with random positions and twinkle timing via CSS custom properties (`--d`, `--dl`, `--o`) set inline at runtime
- **Store button:** every page must have a visible link pointing to `store.html`
- **Discord invite:** canonical URL is `https://discord.gg/NSZHK6spre` — used in `<a href>` links + JSON-LD `sameAs`

### External services wired in-page

- **Discord webhooks** — citizen-portal posts bug/suggestion/crash embeds to Discord; URLs are hardcoded constants at the top of the inline script
- **JSONBin** — taskboard + citizen-portal persist tasks here; API key + bin ID in `JSONBIN_CONFIG`
- **Tebex** — store.html links out to Tebex package URLs via `tebexPackages` lookup table
- **exchangerate-api.com** — store.html pulls live FX rates in `fetchRates()` with a hardcoded `fallback` object

### Admin pages (lspd / pillbox / taskboard)

These use a PIN-gated accordion pattern: each section has a `data-code` attribute; `toggle(id)` calls `injectGate(id)` which replaces content with a PIN input; `tryUnlock(id)` validates and adds the id to a sessionStorage-backed `unlocked` Set. Master password (`MASTER_PW`) unlocks admin edit mode and is **hardcoded in client JS** — this is a known security limitation (client-side-only, no server validation).

## Commands

### Local dev
```bash
node server.js            # serves repo at http://localhost:3000
                          # root "/" maps to citizen-portal.html (per server.js)
```

### Tests

Tests live in `./tests/` (gitignored — not committed). `node_modules/` is symlinked to the shared install at `C:/Users/z4cha/.claude/tests/citizen-portal/node_modules`. Run `cd tests && npm install` once if that link breaks.

```bash
cd tests

npm test                  # Vitest: 1,169 static-analysis tests, 26 suites  (~13s)
npm test -- tests/getDiscordPing.test.js   # single suite
npm run watch             # Vitest watch mode

npm run e2e               # Playwright: 206 tests × 3 viewports  (~53s)
npm run e2e:headed        # visible browser
npm run e2e:ui            # interactive UI mode
npm run e2e:edge          # MS Edge only (run from cmd.exe, not bash — EPERM in sandbox)

npx playwright test e2e/navigation.spec.js                        # single spec
npx playwright test --project=desktop-chrome e2e/cta-analysis.spec.js   # one viewport

node minify-pages.mjs     # re-minify inline <style> + <script> across all 8 root HTML files
```

Playwright auto-starts `../server.js` via its `webServer` config. Vitest uses a custom `setup.js` that builds a fresh jsdom window per test, stubs `alert`/`fetch`/`IntersectionObserver`/`localStorage`/etc., rewrites top-level `let`/`const` to `var` so globals attach to `window`, preserves JSON-LD scripts, skips canvas-heavy scripts that jsdom can't render, then evals each page's inline script.

### Test suite coverage (what each file audits)

| Suite | File | Purpose |
|---|---|---|
| **Vitest (static — 1,169 tests across 26 suites)** | | |
| bundle compile | `tests/tests/_bundle.test.js` | extracts every `<style>` + `<script>`, esbuild-minifies in memory, verifies round-trip parse + declared fn names preserved (8) |
| citizen-portal JS logic | `tests/tests/{getDiscordPing,genTaskId,fileValidation,selectedBadge,renderFiles,submitEmbeds}.test.js` | unit tests for inline script functions (43) |
| smoke | `tests/tests/smoke.test.js` | HTML parses, titles, SEO meta, store links, no dangling anchors (101) |
| SEO + AI | `tests/tests/seo-ai.test.js` | Open Graph, Twitter, JSON-LD schemas, canonical, robots, sitemap, manifest, llms.txt (180) |
| JS/CSS lint | `tests/tests/js-css.test.js` | no `eval`/`debugger`, fetch error-handling, CSS brace balance, defined vars, font loading (128) |
| **CSS effects** | `tests/tests/css-effects.test.js` | every `@keyframes` referenced (no orphans), every `animation:` name defined, hover rules non-empty, transition targets, duration presence (40) |
| **encoding** | `tests/tests/encoding.test.js` | valid UTF-8, no C1 control bytes, no mojibake, no BOM, `<meta charset>` present, CSS `content:` cleanliness (55) |
| a11y (WCAG AA) | `tests/tests/a11y.test.js` | landmarks, heading hierarchy, labels, ARIA, contrast, icon-only aria-labels (139) |
| performance | `tests/tests/performance.test.js` | weight grades (A–F) per page, render-blocking, CLS, fluid typography (81) |
| responsive | `tests/tests/responsive.test.js` | viewport meta, mobile breakpoints, touch targets, iOS zoom prevention, overflow (96) |
| click interactions | `tests/tests/click-interaction.test.js` | dispatches events on every button/link, catches throws + console.errors (64) |
| link destinations | `tests/tests/link-destinations.test.js` | every onclick fn exists, every `#anchor` resolves, no placeholder `href="#"` (65) |
| taskboard logic | `tests/tests/taskboard.test.js` | getFiltered, mergeTodoLists, parseTodoList, base64ToBlob, etc. (28) |
| **tools/** | `tests/tests/tools-smoke.test.js` + `tools-logic.test.js` | every tool page loads, asset refs resolve; unit tests for parseInput (scanner), parseKeyCombo (keybinds), gameToLatLng (map), parseItems (finances), rgbToFiveMCode (colors) (98) |
| per-page (lspd, pillbox, gang-bible, index, store, rules-handbook) | individual `.test.js` files | each page's inline functions (44) |
| **Playwright (e2e — 206 tests × 3 viewports)** | | |
| page load | `tests/e2e/pages-load.spec.js` | every page renders, no console errors, no failed requests |
| navigation | `tests/e2e/navigation.spec.js` | click nav anchors, scroll-into-view, accordions open, Store navigates cross-page |
| responsive-viewport | `tests/e2e/responsive-viewport.spec.js` | no horizontal overflow, body font ≥ 14px, CTA tap-size ≥ 32px |
| click sweep | `tests/e2e/click-sweep.spec.js` | real-browser version: click every button + anchor, capture runtime errors |
| hosting compat | `tests/e2e/hosting-compat.spec.js` | Cloudflare Pages + GitHub Pages: case-sensitivity, no Jekyll conflicts, 200s |
| CTA analysis | `tests/e2e/cta-analysis.spec.js` | primary CTA size, contrast, affordances, hover state, action-verb text, primary > secondary |

### When a test fails

Many tests have surfaced real bugs. The pattern: **tests document actual behavior, and tests prefixed `BUG:` point at known broken code paths.** Fix the code, not the test. When adding a bug-revealing test, prefix its name with `BUG:` and leave a comment explaining the expected-once-fixed form.

Benign error allowlists filter out legitimate recovery logs (`Failed to create task`, `Code verification error`, `Forum webhook failed`) and environment-only failures (`fonts.cloudflare.com`, `cloudflare-fonts`, `HTMLCanvasElement.prototype.getContext`, `discord.com`, `jsonbin`, `exchangerate`). If adding new `console.error` calls that are intentional error handling, add them to these allowlists.

### Bugs the test suite has documented

Tests prefixed `BUG:` assert current broken behavior and will need flipping once the code is fixed.

**Still broken (documented via `BUG:` tests):**
- **citizen-portal.html** `submitCrash()`: dead-code Critical branch (`r === 'Every time I do this action'` compares to option *text*, but `select.value` returns the value attribute → always falls through to `High`)
- **store.html** `verifyCode()`: unknown `itemId` yields `tebex.io/package/undefined` href (no guard)
- **taskboard.html** `getFiltered()`: `t.title.toLowerCase()` throws if any task lacks a title
- **taskboard.html** `parseTodoList()`: toast reports `N` items added where N is non-blank INPUT lines; after stripping bullet-only lines the actual items added can be fewer
- **lspd.html** `tryUnlock()`: crashes before its null-check on non-existent section id (reads `getAttribute` before the `if(!inp)return` guard)

**Fixed during testing:**
- **pillbox-medical.html** `makeHeart()`: was `red: Math.random() < 0.65 ? false : true`, producing 35% purple on a purple-themed page. Rewritten to `red: Math.random() < 0.65`
- **store.html** `.ci-remove:hover{color:var(--rd)}`: referenced undefined `--rd` var. Hardcoded to `#ef4444`
- **taskboard.html** `.todo-list-selector select:focus{border-color:var(--green)}`: undefined `--green` var. Hardcoded to `#10b981`
- **pillbox-medical.html** nav "Store" button: `href="#grp-reports"` — scrolled to reports on same page. Now `store.html`
- **index.html** "JOIN DISCORD" CTA: had `href="#"` placeholder. Now `discord.gg/NSZHK6spre`
- **citizen-portal.html** footer "DISCORD" link: `href="#"` placeholder. Now canonical invite
- **store.html**: 4 Discord links used wrong invite code `phasecity`. Now `NSZHK6spre`
- **rules-handbook.html** nav: 5 `href="#"` placeholders. Now resolve to real in-page anchors
- **index.html** `.wnotes li::before`: `content: '\x83A'` (C1 control byte + A, rendered as missing-glyph box in browsers). Now `content: '▸'`
- **store.html, gang-bible.html, rules-handbook.html**: missing `@media (prefers-reduced-motion: reduce)` rule. Added
- **citizen-portal.html, store.html, lspd.html, pillbox-medical.html, taskboard.html**: ~70 form inputs missing accessible names. All labels now have `for=""` attributes or `aria-label`s
- **citizen-portal.html** used `<div class="title">` for page title. Now `<h1 class="title">`
- **lspd.html, pillbox-medical.html**: missing `<meta name="robots" content="noindex,nofollow">`. Added
- **store.html, taskboard.html**: 12 `target="_blank"` links without `rel="noopener noreferrer"`. Added
- **Three orphaned `@keyframes`** (pulse-glow in gang-bible, slideIn in store, spin in taskboard): removed after css-effects suite detected them

### Playwright viewports

| Project | Width × Height | Device emulation |
|---|---|---|
| `desktop-chrome` | 1280×800 | Chrome desktop |
| `tablet` | 834×1194 | iPad Pro 11 (chromium + touch + isMobile) |
| `mobile` | 390×844 | iPhone 13 (chromium + touch + isMobile) |
| `desktop-edge` | 1280×800 | MS Edge (opt-in: `npm run e2e:edge` from cmd.exe) |

Mobile/tablet use chromium with device-emulation settings rather than webkit, so webkit install isn't required.

### Discord sync
```bash
node sync-discord-members.js   # regenerates discord-members.json
                               # (requires env token — see script header)
```

## When editing

- **Don't modify `fonts.cloudflare.com` URLs** — they're intentional (see above).
- **Image dimensions** — static `<img>` tags should include `width` and `height` attributes (prevents CLS); images loaded dynamically use CSS sizing via class.
- **Inline JS globals** are `let`/`const` at file scope. In tests they get rewritten to `var` so they attach to `window`; in production they stay lexically scoped. Don't rely on `window.<name>` from production code.
- **Design tokens differ per page** — each page has its own `:root { --v: ...; --t1: ... }` block. When syncing design between pages, update both the `:root` CSS variables AND any hardcoded rgba() triples in inline styles.
- **Security meta** — admin pages (lspd/pillbox/taskboard) use `<meta name="robots" content="noindex,nofollow">`. Public pages must NOT have noindex.
- **`og:image`** is a fixed `https://www.phasecity.net/og-image.jpg` (1200×630) across all pages — don't drift this.
- **Re-minify after edits** — if you modify inline CSS/JS, run `node tests/minify-pages.mjs` to re-compact. The `_bundle` test verifies it's round-trip safe.
- **Keyframes must be used** — the css-effects suite fails on orphaned `@keyframes`. When removing an element that uses an animation, remove the `@keyframes` block too.
- **No PNGs in img/** — all images are webp. If you add a new asset, convert with `sharp` or `cwebp` first. The `og-image.jpg` at the repo root is the exception (social card).
- **Performance hints** — hero images get `fetchpriority="high"` + `<link rel="preload" as="image">`; below-fold images get `loading="lazy"`.

## Deploy config

- **`_headers`** (Cloudflare Pages): 1-year `immutable` cache on `/img/*` and static assets, `must-revalidate` on HTML, security headers sitewide (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`).
- **`.github/workflows/deploy.yml`**: pushes to `main` auto-deploy to GitHub Pages.
- **Cloudflare proxy** handles Brotli compression (saves ~73% on the wire) and the `fonts.cloudflare.com` font proxy.
