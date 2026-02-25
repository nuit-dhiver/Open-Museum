/**
 * Resolves an asset path to a full URL using external storage when configured.
 *
 * Supports two modes:
 * - Firebase Storage: auto-detected when the base URL contains
 *   `firebasestorage.googleapis.com`. Paths are URL-encoded and `?alt=media`
 *   is appended (e.g. `/models/foo.glb` → `…/o/models%2Ffoo.glb?alt=media`).
 * - Generic (S3, R2, etc.): the path is simply appended to the base URL.
 *
 * If the env var is empty or unset, the path is returned as-is (local serving).
 */
export function getAssetUrl(path: string): string {
  const baseUrl = import.meta.env.PUBLIC_ASSETS_BASE_URL;

  if (!baseUrl) {
    return path;
  }

  const normalizedBase = baseUrl.replace(/\/+$/, '');
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;

  // Firebase Storage REST API requires URL-encoded paths and ?alt=media
  if (normalizedBase.includes('firebasestorage.googleapis.com')) {
    const encodedPath = encodeURIComponent(normalizedPath);
    return `${normalizedBase}/${encodedPath}?alt=media`;
  }

  return `${normalizedBase}/${normalizedPath}`;
}
