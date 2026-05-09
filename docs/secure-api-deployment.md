# Secure API Deployment for GitHub Pages

GitHub Pages is static hosting. It can serve HTML, CSS, JavaScript, and images, but it cannot safely store private API keys or run the Vite `/api/deepseek` proxy from `vite.config.js`.

## Key Rule

- Do not put private keys such as `DEEPSEEK_API_KEY` into `VITE_*` variables.
- Every `VITE_*` value is embedded into the browser bundle and can be viewed by users.
- Use `VITE_*` only for public configuration, such as a public map browser key, a public endpoint URL, or feature flags.

## Simple Obfuscation Layer

The app supports encoded public config values so plain keys are not easy to find through GitHub search or simple bundle text search.

Encoding rule:

1. Reverse the original value.
2. Base64 encode the reversed value.

Generate an encoded value locally:

```bash
node -e "const v=process.argv[1]; console.log(Buffer.from([...v].reverse().join('')).toString('base64'))" "YOUR_VALUE_HERE"
```

Then put the result in the committed `.env` file:

```text
VITE_AMAP_KEY_ENC=...
VITE_AMAP_SECURITY_KEY_ENC=...
VITE_DEEPSEEK_ENDPOINT_ENC=...
API_KEY_ENC=...
```

The frontend decodes the `VITE_*_ENC` values at runtime. The local Vite proxy decodes `API_KEY_ENC`.

This is obfuscation, not real security, because browser code can still be inspected. Its purpose is to stop accidental exposure in GitHub source search and simple crawlers.

## Recommended Architecture

```text
GitHub Pages React App
  -> calls VITE_DEEPSEEK_ENDPOINT
  -> Cloudflare Worker / Vercel Function / Netlify Function
  -> reads DEEPSEEK_API_KEY from server-side secrets
  -> forwards request to DeepSeek
```

## DeepSeek

Host a small serverless proxy and keep `DEEPSEEK_API_KEY` in that platform's secret store.

If `VITE_DEEPSEEK_ENDPOINT` is not set in a production build, the app falls back to an offline demo answer on the Ask page. This keeps the GitHub Pages prototype usable without any private API key or backend.

For Cloudflare Workers:

1. Create a Worker.
2. Add secret `DEEPSEEK_API_KEY`.
3. Optionally add environment variable `ALLOWED_ORIGIN` with the GitHub Pages origin, for example `https://yourname.github.io`.
4. Deploy the Worker.
5. In this GitHub repo, add a repository variable:
   - `VITE_DEEPSEEK_ENDPOINT=https://your-worker.your-subdomain.workers.dev`

The React app now reads:

```js
import.meta.env.VITE_DEEPSEEK_ENDPOINT || '/api/deepseek'
```

So local development can still use the Vite proxy, while GitHub Pages uses the deployed serverless proxy.

## AMap

AMap JS API keys are browser keys. They cannot be truly hidden because the browser SDK needs them.

Use this safer setup:

1. Keep the AMap key restricted in the AMap console:
   - allowed web domains / Referer should include the GitHub Pages domain only
   - enable only the required JS API features
2. Add GitHub repository variables:
   - `VITE_AMAP_KEY`
   - `VITE_AMAP_SECURITY_KEY`
3. The GitHub Actions workflow injects those values during build.

This avoids committing `.env`, but the built frontend still contains the AMap browser key. The security comes from provider-side domain restrictions, not from secrecy.

## Committed `.env`

This project intentionally commits `.env`, but only with encoded values:

```text
VITE_AMAP_KEY_ENC=...
VITE_AMAP_SECURITY_KEY_ENC=...
API_KEY_ENC=...
VITE_DEEPSEEK_ENDPOINT_ENC=...
```

Do not commit plain `VITE_AMAP_KEY`, `VITE_AMAP_SECURITY_KEY`, `API_KEY`, or `DEEPSEEK_API_KEY`.
