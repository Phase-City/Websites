# phase-cors

Cloudflare Worker that proxies allowlisted CORS-blocked endpoints for Phase City client-side tools — specifically the FiveM master server list used by `tools/fivem-scanner.html` Find Player.

## What it does

- `GET /?url=<encoded-https-url>` proxies the URL **only** if its hostname is in `ALLOWED_HOSTS` in `index.js`.
- Adds CORS headers so browsers can read the response.
- 30s edge cache so repeated lookups don't hammer FiveM's API.
- Rejects everything else with a clear error.

Currently allowlisted: `servers-frontend.fivem.net`. Add more hostnames to the `ALLOWED_HOSTS` Set in `index.js` if other tools need them.

## Deploy via Cloudflare Dashboard (no CLI needed)

1. Sign in to **dash.cloudflare.com** on **your own account** (top-left selector).
2. **Workers & Pages** → **Create application** → **Create Worker**.
3. Name it `phase-cors` → **Deploy** (it ships the default Hello World — we replace it next).
4. Click **Edit code**, select all the existing code, delete it.
5. Open `index.js` from this folder, copy its entire contents, paste into the editor.
6. Click **Save and deploy**.
7. At the top of the page, copy the URL — looks like `https://phase-cors.<your-subdomain>.workers.dev`.
8. Send that URL back so it can be wired into `tools/fivem-scanner.html`.

## Verify it's working

After deploy:

```bash
# 1. The function exists (should 400 with usage text)
curl -i 'https://phase-cors.<your-subdomain>.workers.dev/'

# 2. Allowlist works (should 403)
curl -i 'https://phase-cors.<your-subdomain>.workers.dev/?url=https://example.com/'

# 3. Real fetch through the proxy
curl -s 'https://phase-cors.<your-subdomain>.workers.dev/?url=https://servers-frontend.fivem.net/api/servers/' | head -c 200

# 4. Edge cache engaged on second hit
curl -sI 'https://phase-cors.<your-subdomain>.workers.dev/?url=https://servers-frontend.fivem.net/api/servers/'
# cf-cache-status: MISS  →  HIT on the second call within 30s
```

## Optional: Wrangler CLI deploy

If you ever want to move off the Dashboard:

```bash
npm install -g wrangler
wrangler login        # opens a browser, no token to handle
cd workers/phase-cors
wrangler deploy
```

`wrangler.toml` is already set up for this.

## Limits / costs

Free plan: **100,000 requests/day, 10ms CPU per request**. Find Player makes 1 request per search, processed locally — call it ~3 ms of Worker CPU. You won't approach the limit.
