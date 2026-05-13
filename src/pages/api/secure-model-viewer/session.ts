import type { APIRoute } from 'astro';
import { createViewerSession } from './_store';

export const POST: APIRoute = async ({ request, url }) => {
  try {
    const body = await request.json();
    const modelId = body?.modelId;
    if (!modelId || typeof modelId !== 'string') {
      return new Response(JSON.stringify({ error: 'modelId is required' }), { status: 400 });
    }

    const session = await createViewerSession(request, modelId, url);
    return new Response(JSON.stringify(session), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unable to create session' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  }
};
