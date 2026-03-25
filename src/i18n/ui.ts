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
 * New structure: /{lang}/... where lang is always the first segment.
 * Root / falls back to defaultLang.
 */
export function getLangFromUrl(url: URL): Lang {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const path = url.pathname.replace(base, '').replace(/^\//, '');
  const [firstSegment] = path.split('/');
  if (firstSegment in languages) return firstSegment as Lang;
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
 * Get the localized home path.
 */
export function getHomePath(lang: Lang): string {
  const base = import.meta.env.BASE_URL;
  return `${base}${lang}/`;
}

/**
 * Get the localized path for a city page.
 * New structure: /{lang}/cities/{citySlug}/
 */
export function getCityPath(lang: Lang, citySlug: string): string {
  const base = import.meta.env.BASE_URL;
  return `${base}${lang}/cities/${citySlug}/`;
}

/**
 * Category slug mapping — same English slugs used in all language URLs.
 */
const categorySlugs: Record<'brunnen' | 'denkmal' | 'kunstwerk', string> = {
  brunnen: 'fountains',
  denkmal: 'monuments',
  kunstwerk: 'artworks',
};

/**
 * Get the localized path for category pages.
 * New structure: /{lang}/fountains/, /{lang}/monuments/, /{lang}/artworks/
 */
export function getCategoryPath(lang: Lang, category: 'brunnen' | 'denkmal' | 'kunstwerk'): string {
  const base = import.meta.env.BASE_URL;
  return `${base}${lang}/${categorySlugs[category]}/`;
}

/**
 * Get the localized path for a work detail page.
 * New structure: /{lang}/works/{slug}/
 */
export function getWorkPath(lang: Lang, slug: string): string {
  const base = import.meta.env.BASE_URL;
  return `${base}${lang}/works/${slug}/`;
}

/**
 * Get the equivalent path in another language.
 * With the new uniform /{lang}/... structure, this is a simple prefix swap.
 */
export function getAlternateLanguagePath(currentPath: string, currentLang: Lang, targetLang: Lang): string {
  const base = import.meta.env.BASE_URL;
  // Strip base and leading slash
  const path = currentPath.replace(base, '').replace(/^\//, '');
  // Replace the leading lang segment with the target lang
  const withoutLang = path.replace(new RegExp(`^${currentLang}(/|$)`), '');
  return `${base}${targetLang}/${withoutLang}`;
}
