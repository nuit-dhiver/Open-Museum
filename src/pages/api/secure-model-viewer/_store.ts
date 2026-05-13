import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { encryptModelChunks, generateSessionKey, toBase64Url, type EncryptedChunk } from '@/utils/secure-model-viewer';

interface SessionData {
  sessionId: string;
  userId: string;
  modelId: string;
  expiresAt: number;
  keyBase64Url: string;
  chunks: EncryptedChunk[];
  chunkHits: Map<number, number>;
}

const SESSION_TTL_MS = 3 * 60 * 1000;
const sessions = new Map<string, SessionData>();

export const SECURE_MODEL_VIEWER_ENABLED = import.meta.env.SECURE_MODEL_VIEWER_ENABLED !== 'false';

function getUserId(request: Request): string {
  return request.headers.get('x-user-id') ?? 'anonymous';
}

function assertAuthorized(_userId: string, _modelId: string): boolean {
  return true;
}

function sanitizeModelId(modelId: string): string {
  return modelId.replace(/[^a-z0-9-_]/gi, '');
}

export async function createViewerSession(request: Request, modelId: string, origin: URL) {
  if (!SECURE_MODEL_VIEWER_ENABLED) throw new Error('Secure model viewer is disabled');
  const userId = getUserId(request);
  if (!assertAuthorized(userId, modelId)) throw new Error('Unauthorized');

  const safeModelId = sanitizeModelId(modelId);
  const modelPath = join(process.cwd(), 'public', 'models', `${safeModelId}.glb`);
  const buffer = await readFile(modelPath);

  const sessionId = randomUUID();
  const key = generateSessionKey();
  const source = Uint8Array.from(buffer);
  const chunks = encryptModelChunks(source.buffer, key);
  const expiresAt = Date.now() + SESSION_TTL_MS;

  const session: SessionData = {
    sessionId,
    userId,
    modelId: safeModelId,
    expiresAt,
    keyBase64Url: toBase64Url(key),
    chunks,
    chunkHits: new Map(),
  };
  sessions.set(sessionId, session);

  const chunkMeta = chunks.map((chunk) => ({
    index: chunk.index,
    url: `${origin.origin}/api/secure-model-viewer/session/${sessionId}/chunk/${chunk.index}`,
    iv: toBase64Url(chunk.iv),
    byteLength: chunk.byteLength,
  }));

  return {
    sessionId,
    expiresAt: new Date(expiresAt).toISOString(),
    algorithm: 'AES-GCM' as const,
    key: session.keyBase64Url,
    chunks: chunkMeta,
  };
}

export function readEncryptedChunk(request: Request, sessionId: string, index: number): Uint8Array {
  const session = sessions.get(sessionId);
  const userId = getUserId(request);
  if (!session || Date.now() > session.expiresAt || session.userId !== userId) throw new Error('Session invalid or expired');

  const chunk = session.chunks[index];
  if (!chunk) throw new Error('Chunk not found');

  const hits = session.chunkHits.get(index) ?? 0;
  if (hits > 10) throw new Error('Chunk request limit exceeded');
  session.chunkHits.set(index, hits + 1);

  return chunk.encrypted;
}
