import https from 'node:https';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function requestDeepSeek(apiKey, payload) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: 'api.deepseek.com',
        path: '/chat/completions',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => {
          body += chunk;
        });
        res.on('end', () => {
          resolve({ statusCode: res.statusCode, body });
        });
      },
    );

    req.on('error', reject);
    req.write(JSON.stringify(payload));
    req.end();
  });
}

function deepSeekProxyPlugin(env) {
  const apiKey = env.API_KEY || env.DEEPSEEK_API_KEY;

  async function handler(req, res) {
    if (req.method !== 'POST') {
      res.statusCode = 405;
      res.end(JSON.stringify({ error: 'Method not allowed' }));
      return;
    }

    if (!apiKey) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'Missing API_KEY in .env' }));
      return;
    }

    try {
      const body = await readRequestBody(req);
      const input = JSON.parse(body || '{}');
      const response = await requestDeepSeek(apiKey, {
        model: input.model || 'deepseek-chat',
        messages: input.messages,
        temperature: input.temperature ?? 0.45,
        max_tokens: input.max_tokens ?? 650,
      });

      res.statusCode = response.statusCode || 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(response.body);
    } catch (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: err.message }));
    }
  }

  return {
    name: 'deepseek-api-proxy',
    configureServer(server) {
      server.middlewares.use('/api/deepseek', handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/deepseek', handler);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), deepSeekProxyPlugin(env)],
    base: './',
    build: {
      rollupOptions: {
        input: {
          app: 'index.html',
          poster: 'poster/index.html',
        },
      },
    },
  };
});
