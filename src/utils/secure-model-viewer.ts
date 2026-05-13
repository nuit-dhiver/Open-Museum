import { randomBytes, createCipheriv } from 'node:crypto';

export interface ChunkDescriptor {
  index: number;
  url: string;
  iv: string;
  byteLength: number;
}

export interface EncryptedChunk {
  index: number;
  iv: Uint8Array;
  encrypted: Uint8Array;
  byteLength: number;
}

export const DEFAULT_CHUNK_SIZE = 512 * 1024;

export function toBase64Url(input: Uint8Array): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

export function fromBase64Url(value: string): Uint8Array {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padding = normalized.length % 4 === 0 ? '' : '='.repeat(4 - (normalized.length % 4));
  return new Uint8Array(Buffer.from(`${normalized}${padding}`, 'base64'));
}

export function chunkArrayBuffer(buffer: ArrayBuffer, chunkSize = DEFAULT_CHUNK_SIZE): Uint8Array[] {
  const bytes = new Uint8Array(buffer);
  const chunks: Uint8Array[] = [];
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    chunks.push(bytes.slice(offset, Math.min(offset + chunkSize, bytes.length)));
  }
  return chunks;
}

export function generateSessionKey(): Uint8Array {
  return new Uint8Array(randomBytes(32));
}

export function encryptAesGcmChunk(plainChunk: Uint8Array, key: Uint8Array): { iv: Uint8Array; encrypted: Uint8Array } {
  const iv = new Uint8Array(randomBytes(12));
  const cipher = createCipheriv('aes-256-gcm', Buffer.from(key), Buffer.from(iv));
  const encryptedBody = Buffer.concat([cipher.update(Buffer.from(plainChunk)), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return { iv, encrypted: new Uint8Array(Buffer.concat([encryptedBody, authTag])) };
}

export function encryptModelChunks(buffer: ArrayBuffer, key: Uint8Array, chunkSize = DEFAULT_CHUNK_SIZE): EncryptedChunk[] {
  return chunkArrayBuffer(buffer, chunkSize).map((plainChunk, index) => {
    const { iv, encrypted } = encryptAesGcmChunk(plainChunk, key);
    return { index, iv, encrypted, byteLength: plainChunk.byteLength };
  });
}

export function concatArrayBuffers(parts: ArrayBuffer[]): ArrayBuffer {
  const total = parts.reduce((sum, part) => sum + part.byteLength, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    out.set(new Uint8Array(part), offset);
    offset += part.byteLength;
  }
  return out.buffer;
}
