export default {
  async fetch(request, env) {
    const allowedOrigin = env.ALLOWED_ORIGIN || '*';
    const corsHeaders = {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: corsHeaders,
      });
    }

    if (!env.DEEPSEEK_API_KEY) {
      return new Response(JSON.stringify({ error: 'Missing DEEPSEEK_API_KEY' }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    try {
      const input = await request.json();
      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: input.model || 'deepseek-chat',
          messages: input.messages,
          temperature: input.temperature ?? 0.45,
          max_tokens: input.max_tokens ?? 800,
        }),
      });

      const body = await response.text();
      return new Response(body, {
        status: response.status,
        headers: corsHeaders,
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: corsHeaders,
      });
    }
  },
};
