export interface LegacyRedirectPattern {
  oldPathPattern: string;
  newPathPattern: string;
  reason: string;
}

// Record of removed published URL patterns from the April 2026 URL migration.
export const legacyRedirectPatterns: LegacyRedirectPattern[] = [
  {
    oldPathPattern: '/brunnen/',
    newPathPattern: '/de/fountains/',
    reason: 'German categories now use shared English slugs under /de.',
  },
  {
    oldPathPattern: '/denkmale/',
    newPathPattern: '/de/monuments/',
    reason: 'German categories now use shared English slugs under /de.',
  },
  {
    oldPathPattern: '/kunstwerke/',
    newPathPattern: '/de/artworks/',
    reason: 'German categories now use shared English slugs under /de.',
  },
  {
    oldPathPattern: '/staedte/{city}/',
    newPathPattern: '/de/cities/{city}/',
    reason: 'City pages are now language-prefixed with shared slugs.',
  },
  {
    oldPathPattern: '/werke/{slug}/',
    newPathPattern: '/de/{slug}/',
    reason: 'Work pages no longer use /werke segment.',
  },
  {
    oldPathPattern: '/en/works/{slug}/',
    newPathPattern: '/en/{slug}/',
    reason: 'Work pages no longer use /works segment.',
  },
];

export function getLegacyCityRedirect(citySlug: string): string {
  return `/de/cities/${citySlug}/`;
}

export function getLegacyWorkRedirect(lang: 'de' | 'en', slug: string): string {
  return `/${lang}/${slug}/`;
}
