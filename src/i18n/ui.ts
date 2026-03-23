export const languages = {
  de: 'Deutsch',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'de';

export const ui = {
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.brunnen': 'Brunnen',
    'nav.denkmale': 'Denkmäler',
    'nav.kunstwerke': 'Kunstwerke',
    'nav.cities': 'Städte',

    // Homepage
    'home.title': 'Open Museum',
    'home.tagline': 'Entdecken Sie Denkmäler, Brunnen und Kunstwerke im öffentlichen Raum — in 3D.',
    'home.featured': 'Entdecken in 3D',
    'home.featured.cta': 'Werk ansehen',
    'home.slideshow.title': 'Impressionen',

    // Categories
    'category.brunnen': 'Brunnen',
    'category.brunnen.desc': 'Historische und moderne Brunnen im Stadtgebiet',
    'category.denkmal': 'Denkmäler',
    'category.denkmal.desc': 'Denkmäler und Gedenkstätten in Göttingen',
    'category.kunstwerk': 'Kunstwerke',
    'category.kunstwerk.desc': 'Skulpturen und Kunstinstallationen im öffentlichen Raum',

    // Work detail
    'work.photos': 'Fotos',
    'work.location': 'Standort',
    'work.artist': 'Künstler',
    'work.year': 'Jahr',
    'work.material': 'Material',
    'work.back': 'Zurück zur Kategorie',
    'work.view3d': '3D-Modell ansehen',
    'work.viewAR': 'In AR ansehen',
    'work.download': 'Herunterladen',
    'work.downloadGLB': 'GLB herunterladen',
    'work.downloadUSDZ': 'USDZ herunterladen',
    'work.licenseTitle': 'Lizenzhinweis',
    'work.licenseNotice': 'Mit dem Herunterladen bestätige ich, dass diese Datei unter der',
    'work.licenseLink': 'Creative Commons Namensnennung – Nicht kommerziell 4.0 (CC BY-NC 4.0)',
    'work.licenseNoticeAfter': 'lizenziert ist und ausschließlich für nicht-kommerzielle Zwecke genutzt werden darf.',
    'work.licenseDownloadWith': 'Herunterladen als',

    // Stats section
    'stats.title': 'Zahlen & Fakten',
    'stats.models': 'Werke',
    'stats.cities': 'Städte',
    'stats.monuments': 'Denkmäler',
    'stats.artworks': 'Kunstwerke',
    'stats.fountains': 'Brunnen',
    'stats.artists': 'Dokumentierte Künstler',

    // Sponsor
    'sponsor.title': 'Sponsor werden',
    'sponsor.body': 'Open Museum ist kostenlos und quelloffen. Der Betrieb ist mit realen Kosten verbunden – für Hosting, Entwicklung und 3D-Digitalisierung. Jede Unterstützung hilft, das Projekt am Leben zu erhalten.',
    'sponsor.cta': 'Auf GitHub sponsern',

    // Footer
    'footer.contact': 'Kontakt',
    'footer.address': 'Adresse',
    'footer.email': 'E-Mail',
    'footer.social': 'Soziale Medien',
    'footer.rights': '© 2026 Open Museum. Alle Rechte vorbehalten.',
    'footer.project': 'Ein Projekt zur digitalen Erfassung öffentlicher Kunst.',

    // 404
    '404.title': 'Seite nicht gefunden',
    '404.message': 'Die angeforderte Seite existiert nicht.',
    '404.back': 'Zur Startseite',

    // Misc
    'loading': 'Wird geladen…',
    'noworks': 'Noch keine Werke in dieser Kategorie.',
    'noworks.city': 'Noch keine Werke in dieser Stadt.',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.brunnen': 'Fountains',
    'nav.denkmale': 'Monuments',
    'nav.kunstwerke': 'Artworks',
    'nav.cities': 'Cities',

    // Homepage
    'home.title': 'Open Museum',
    'home.tagline': 'Discover monuments, fountains, and artworks in public spaces — in 3D.',
    'home.featured': 'Explore in 3D',
    'home.featured.cta': 'View work',
    'home.slideshow.title': 'Impressions',

    // Categories
    'category.brunnen': 'Fountains',
    'category.brunnen.desc': 'Historic and modern fountains across the city',
    'category.denkmal': 'Monuments',
    'category.denkmal.desc': 'Monuments and memorials in Göttingen',
    'category.kunstwerk': 'Artworks',
    'category.kunstwerk.desc': 'Sculptures and public art installations',

    // Work detail
    'work.photos': 'Photos',
    'work.location': 'Location',
    'work.artist': 'Artist',
    'work.year': 'Year',
    'work.material': 'Material',
    'work.back': 'Back to category',
    'work.view3d': 'View 3D model',
    'work.viewAR': 'View in AR',
    'work.download': 'Download',
    'work.downloadGLB': 'Download GLB',
    'work.downloadUSDZ': 'Download USDZ',
    'work.licenseTitle': 'License Notice',
    'work.licenseNotice': 'By downloading this file, I acknowledge it is released under',
    'work.licenseLink': 'Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)',
    'work.licenseNoticeAfter': 'and may only be used for non-commercial purposes.',
    'work.licenseDownloadWith': 'Download as',

    // Stats section
    'stats.title': 'By the Numbers',
    'stats.models': 'Works',
    'stats.cities': 'Cities',
    'stats.monuments': 'Monuments',
    'stats.artworks': 'Artworks',
    'stats.fountains': 'Fountains',
    'stats.artists': 'Documented Artists',

    // Sponsor
    'sponsor.title': 'Become a Sponsor',
    'sponsor.body': 'Open Museum is free and open source. Running it has real costs — hosting, development, and 3D digitization. Your support helps keep the project alive.',
    'sponsor.cta': 'Sponsor on GitHub',

    // Footer
    'footer.contact': 'Contact',
    'footer.address': 'Address',
    'footer.email': 'Email',
    'footer.social': 'Social Media',
    'footer.rights': '© 2026 Open Museum. All rights reserved.',
    'footer.project': 'A project for digital preservation of public art.',

    // 404
    '404.title': 'Page not found',
    '404.message': 'The requested page does not exist.',
    '404.back': 'Back to home',

    // Misc
    'loading': 'Loading…',
    'noworks': 'No works in this category yet.',
    'noworks.city': 'No works in this city yet.',
  },
} as const;

export type UIKey = keyof typeof ui.de;

/**
 * Get the current locale from a URL pathname.
 */
export function getLangFromUrl(url: URL): Lang {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const path = url.pathname.replace(base, '').replace(/^\//, '');
  const [firstSegment] = path.split('/');
  if (firstSegment in ui) return firstSegment as Lang;
  return defaultLang;
}

/**
 * Return a translation function for the given locale.
 */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

/**
 * Convert a city display name to a URL slug.
 * e.g. "Göttingen" → "goettingen"
 */
export function cityNameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ä/g, 'ae')
    .replace(/ß/g, 'ss')
    .replace(/\s+/g, '-');
}

/**
 * Get the localized path for a city page.
 */
export function getCityPath(lang: Lang, citySlug: string): string {
  const base = import.meta.env.BASE_URL;
  if (lang === 'en') return `${base}en/cities/${citySlug}/`;
  return `${base}staedte/${citySlug}/`;
}

/**
 * Get the localized path for category pages.
 */
export function getCategoryPath(lang: Lang, category: 'brunnen' | 'denkmal' | 'kunstwerk'): string {
  const base = import.meta.env.BASE_URL;
  const paths = {
    de: {
      brunnen: 'brunnen',
      denkmal: 'denkmale',
      kunstwerk: 'kunstwerke',
    },
    en: {
      brunnen: 'en/fountains',
      denkmal: 'en/monuments',
      kunstwerk: 'en/artworks',
    },
  };
  return `${base}${paths[lang][category]}/`;
}

/**
 * Get the localized path for a work detail page.
 */
export function getWorkPath(lang: Lang, slug: string): string {
  const base = import.meta.env.BASE_URL;
  if (lang === 'en') return `${base}en/works/${slug}/`;
  return `${base}werke/${slug}/`;
}

/**
 * Get the equivalent path in the other language.
 */
export function getAlternateLanguagePath(currentPath: string, currentLang: Lang): string {
  const base = import.meta.env.BASE_URL;
  const path = currentPath.replace(base, '').replace(/^\//, '');

  if (currentLang === 'de') {
    // DE -> EN
    if (path === '' || path === '/') return `${base}en/`;
    if (path.startsWith('brunnen')) return `${base}en/fountains/${path.slice('brunnen/'.length)}`;
    if (path.startsWith('denkmale')) return `${base}en/monuments/${path.slice('denkmale/'.length)}`;
    if (path.startsWith('kunstwerke')) return `${base}en/artworks/${path.slice('kunstwerke/'.length)}`;
    if (path.startsWith('werke/')) return `${base}en/works/${path.slice('werke/'.length)}`;
    if (path.startsWith('staedte/')) return `${base}en/cities/${path.slice('staedte/'.length)}`;
    return `${base}en/${path}`;
  } else {
    // EN -> DE
    if (path === 'en/' || path === 'en') return `${base}`;
    const enPath = path.replace(/^en\//, '');
    if (enPath.startsWith('fountains')) return `${base}brunnen/${enPath.slice('fountains/'.length)}`;
    if (enPath.startsWith('monuments')) return `${base}denkmale/${enPath.slice('monuments/'.length)}`;
    if (enPath.startsWith('artworks')) return `${base}kunstwerke/${enPath.slice('artworks/'.length)}`;
    if (enPath.startsWith('works/')) return `${base}werke/${enPath.slice('works/'.length)}`;
    if (enPath.startsWith('cities/')) return `${base}staedte/${enPath.slice('cities/'.length)}`;
    return `${base}${enPath}`;
  }
}
