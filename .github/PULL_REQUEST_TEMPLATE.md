## Summary

<!-- What does this PR do, in 1-3 sentences? -->

## Pages touched

<!-- Check all that apply -->
- [ ] index.html
- [ ] citizen-portal.html
- [ ] store.html
- [ ] gang-bible.html
- [ ] rules-handbook.html
- [ ] lspd.html
- [ ] pillbox-medical.html
- [ ] taskboard.html
- [ ] tools/
- [ ] SEO / sitemap / manifest / robots
- [ ] CI / deploy workflow

## Verification

<!-- How did you test this? Check what you did -->
- [ ] Opened locally via `node server.js` and confirmed the change renders correctly
- [ ] Tested on mobile viewport (Chrome DevTools device emulation or real device)
- [ ] Checked the browser console — no new errors or warnings
- [ ] Ran `cd tests && npm test` — all suites pass
- [ ] Ran `cd tests && npm run e2e` — Playwright passes on desktop + mobile + tablet
- [ ] (design changes) Verified on purple-theme pages AND blue-theme LSPD / cyan store

## Notes for reviewers

<!-- Anything reviewers should pay extra attention to?
     Any known follow-ups or trade-offs? Screenshots for visual changes?  -->

## Checklist

- [ ] Follows conventions in [CLAUDE.md](../CLAUDE.md) (title format `Phase City // …`, `//` separator, Store link on every page, etc.)
- [ ] No new inline `fetch()` without `try/catch` or `.catch()`
- [ ] New `<img>` tags have `width` + `height` attributes (prevents CLS)
- [ ] Any new `<a target="_blank">` uses `rel="noopener noreferrer"`
- [ ] Asset paths are case-correct (GitHub Pages is case-sensitive)
- [ ] No hardcoded absolute paths (`/foo` → `foo`)
- [ ] If adding an external stylesheet, it uses `media="print" onload="this.media='all'"` async pattern
