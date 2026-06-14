// Phase City CORS proxy — Cloudflare Worker
// Reachable at https://phase-cors.<your-workers-subdomain>.workers.dev/?url=<encoded-target-url>
//
// Allowlisted on hostname so it can't be abused as an open relay.
// Used by tools/fivem-scanner.html Find Player to fetch the FiveM master server list.

const ALLOWED_HOSTS = new Set([
  'servers-frontend.fivem.net',
]);

const CORS_HEADERS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, OPTIONS',
  'access-control-allow-headers': 'content-type',
  'access-control-max-age': '86400',
};

function reply(body, status, extraHeaders) {
  return new Response(body, { status, headers: { ...CORS_HEADERS, ...(extraHeaders || {}) } });
}

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') return reply(null, 204);
    if (request.method !== 'GET') return reply('method not allowed', 405);

    const target = new URL(request.url).searchParams.get('url');
    if (!target) {
      return reply(
        'Phase City CORS proxy.\nUsage: ?url=https://servers-frontend.fivem.net/api/servers/\nAllowed hosts: ' +
          [...ALLOWED_HOSTS].join(', '),
        400,
        { 'content-type': 'text/plain; charset=utf-8' }
      );
    }

    let parsed;
    try { parsed = new URL(target); }
    catch { return reply('invalid url', 400); }

    if (parsed.protocol !== 'https:') return reply('only https targets allowed', 400);
    if (!ALLOWED_HOSTS.has(parsed.hostname)) return reply('host not allowlisted: ' + parsed.hostname, 403);

    let upstream;
    try {
      // Browser-style headers — FiveM's Cloudflare WAF blocks bot user-agents
      // and requests with missing Origin/Referer, returning a masked 404.
      upstream = await fetch(parsed.toString(), {
        headers: {
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
          'accept': 'application/json,text/plain,*/*',
          'accept-language': 'en-US,en;q=0.9',
          'accept-encoding': 'gzip, deflate, br',
          'origin': 'https://servers.fivem.net',
          'referer': 'https://servers.fivem.net/',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
        cf: { cacheTtl: 30, cacheEverything: true },
        redirect: 'follow',
      });
    } catch (e) {
      return reply('upstream fetch failed: ' + (e && e.message || 'unknown'), 502);
    }

    // Debug mode: ?url=...&debug=1 returns a JSON envelope showing upstream status/headers
    // and the first ~500 bytes of body, instead of forwarding the response transparently.
    if (new URL(request.url).searchParams.get('debug') === '1') {
      const sample = await upstream.text().then(t => t.slice(0, 500)).catch(() => '<unreadable>');
      const hdrs = {};
      upstream.headers.forEach((v, k) => { hdrs[k] = v; });
      return reply(
        JSON.stringify({ upstream_status: upstream.status, upstream_headers: hdrs, body_sample: sample }, null, 2),
        200,
        { 'content-type': 'application/json; charset=utf-8' }
      );
    }

    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        ...CORS_HEADERS,
        'content-type': upstream.headers.get('content-type') || 'application/json',
        'cache-control': 'public, max-age=30',
        'x-proxy-source': 'phase-cors-worker',
        'x-upstream-status': String(upstream.status),
      },
    });
  },
};
