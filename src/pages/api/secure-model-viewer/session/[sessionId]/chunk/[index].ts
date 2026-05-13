import type { APIRoute } from 'astro';
import { readEncryptedChunk } from '@/pages/api/secure-model-viewer/_store';

export const GET: APIRoute = async ({ request, params }) => {
  try {
    const sessionId = params.sessionId;
    const index = Number(params.index);
    if (!sessionId || Number.isNaN(index)) {
      return new Response('Invalid session or chunk index', { status: 400 });
    }

    const encryptedChunk = readEncryptedChunk(request, sessionId, index);
    return new Response(encryptedChunk.buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    return new Response(error instanceof Error ? error.message : 'Unable to fetch chunk', {
      status: 401,
      headers: { 'Cache-Control': 'no-store' },
    });
  }
};
