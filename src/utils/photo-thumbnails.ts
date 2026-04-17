function stripQueryAndHash(path: string): string {
  return path.split('#')[0].split('?')[0];
}

export function getWorkPhotoThumbnailPath(photoPath: string): string {
  const cleanPath = stripQueryAndHash(photoPath).trim();
  const normalizedPath = cleanPath.replace(/^\/+/, '');
  return `/images/thumbnails/works/${normalizedPath}.webp`;
}

export function getPublicUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const base = import.meta.env.BASE_URL;
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return `${normalizedBase}${normalizedPath}`;
}
