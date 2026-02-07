## Plan: Göttingen Denkmale Website

**TL;DR** — Build a bilingual (DE/EN) static website with **Astro** + **Tailwind CSS**, using JSON content collections for monument data, `<model-viewer>` for 3D, and Google My Maps iframes for location embeds. Neo-brutalist design with white/black/gold/red/blue palette. No backend server — fully static, deployable to GitHub Pages or Netlify.

### Tech Stack Rationale

| Layer | Choice | Why |
|---|---|---|
| **Framework** | **Astro v5** | Ships zero JS by default; built-in content collections for managing monument data in JSON/Markdown; native i18n routing for DE/EN; file-based routing; optimized image handling. Perfect for a semi-static, content-heavy site. |
| **Styling** | **Tailwind CSS v4** | Utility-first CSS; easy to implement neo-brutalism (thick borders, box-shadows, bold type). Custom theme tokens for the gold/red/blue palette. |
| **3D Viewer** | **`<model-viewer>` v4** | Google-maintained web component; loads `.glb` models with `src`, `.usdz` for iOS AR via `ios-src`. No framework glue needed — works as a plain HTML element inside Astro. |
| **Maps** | **Google My Maps embed** | Free, no API key, iframe-based. You create a custom map with all monument pins in My Maps, then embed per-monument or a master map. |
| **i18n** | **Astro built-in i18n** | German as `defaultLocale` (no URL prefix), English under `/en/`. Folder-based routing + a shared JSON translation file for UI strings. |
| **Deployment** | **GitHub Pages** (or Netlify/Vercel) | Free static hosting. Astro outputs plain HTML/CSS/JS. GitHub Pages integrates with your existing repo. |
| **Package manager** | **pnpm** | Fast, disk-efficient. |

### Content Architecture

Monument data lives in a JSON content collection — one file per monument. This means adding a new work = adding one JSON file + dropping model/photo files.

**File:** `src/content/works/{slug}.json` — one per monument

Each JSON entry contains:
- `slug`, `title` (DE/EN), `description` (DE/EN)
- `category`: `"brunnen"` | `"denkmal"` | `"kunstwerk"`
- `model.glb`: path to `.glb` file
- `model.usdz`: path to `.usdz` file (for iOS AR)
- `photos`: array of image paths (you'll add these manually)
- `poster`: thumbnail image path (used on category pages + as `<model-viewer>` poster)
- `location.lat`, `location.lng`, `location.address`
- `location.myMapsEmbedUrl`: the Google My Maps iframe URL for this specific pin
- `artist`, `year`, `material` (optional metadata)

**File:** `src/i18n/ui.json` — shared UI translation strings (nav labels, footer text, button labels, etc.)

### Project Structure

```
goettingen-denkmal/
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── public/
│   ├── models/          ← .glb and .usdz files (copied from assets/)
│   └── images/
│       ├── works/       ← photos & thumbnails per monument
│       └── slideshow/   ← homepage slideshow photos
├── src/
│   ├── content/
│   │   └── works/       ← one .json per monument
│   ├── content.config.ts  ← collection schema (Zod)
│   ├── i18n/
│   │   └── ui.ts        ← translation strings + helper
│   ├── layouts/
│   │   └── Base.astro   ← HTML shell, <head>, nav, footer
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── CategoryCard.astro
│   │   ├── WorkCard.astro
│   │   ├── ModelViewer.astro    ← <model-viewer> wrapper
│   │   ├── Slideshow.astro      ← photo carousel (minimal JS island)
│   │   ├── FeaturedWork.astro   ← random 3D preview on homepage
│   │   └── LanguageSwitcher.astro
│   └── pages/
│       ├── index.astro               ← DE homepage
│       ├── brunnen/index.astro       ← DE category: Brunnen
│       ├── denkmale/index.astro      ← DE category: Denkmale
│       ├── kunstwerke/index.astro    ← DE category: Kunstwerke
│       ├── werke/[slug].astro        ← DE individual work page
│       ├── en/
│       │   ├── index.astro           ← EN homepage
│       │   ├── fountains/index.astro
│       │   ├── monuments/index.astro
│       │   ├── artworks/index.astro
│       │   └── works/[slug].astro
│       └── 404.astro
```

### Steps

**Step 0 — Prep: fix filenames & convert models**
- Rename `ichtenberg-Denkmal-Markt.glb` → `Lichtenberg-Denkmal-Markt.glb` and `teinbewachsene-Torsi_left.glb` → `Steinbewachsene-Torsi_left.glb` (typos missing first letter)
- You manually convert the 5 monuments missing `.glb` files (Berlinstein, Blume, Der-Fluss-des-Moebius, Lichtenberg-Papendiek, Planetenweg Saturn) from `.usdz`/`.usdc` → `.glb`

**Step 1 — Scaffold the Astro project**
- Initialize Astro project in the repo root with `pnpm create astro@latest`
- Install dependencies: `@astrojs/tailwind`, `@google/model-viewer`
- Configure `astro.config.mjs` with `output: 'static'`, i18n config (`defaultLocale: 'de'`, `locales: ['de', 'en']`, `prefixDefaultLocale: false`), and Tailwind integration

**Step 2 — Tailwind theme & neo-brutalism design tokens**
- Configure Tailwind with custom colors: `gold: '#D4A017'`, `brand-red: '#E63946'`, `brand-blue: '#1D3557'`, `off-white: '#FAFAFA'`
- Define reusable utility classes for neo-brutalist patterns: thick black borders (`border-3 border-black`), hard box-shadows (`shadow-[4px_4px_0px_0px_black]`), bold typography (Inter or Space Grotesk font), uppercase headings, high-contrast buttons
- Create a `global.css` with base styles

**Step 3 — Content collection schema**
- Define the works collection in `src/content.config.ts` using `defineCollection()` + Zod schema
- Schema validates: `slug`, `title` (object with `de`/`en`), `description` (object with `de`/`en`), `category` (enum), `model` (object with `glb`/`usdz` paths), `photos` array, `poster`, `location` object, optional `artist`/`year`/`material`
- Create one sample JSON file per monument in `src/content/works/`

**Step 4 — Base layout + Header + Footer + Language Switcher**
- `src/layouts/Base.astro`: HTML shell with `<head>` (meta, fonts, `<model-viewer>` script), slot for page content
- `Header.astro`: minimal nav bar — site logo/name, three category links (Brunnen, Denkmale, Kunstwerke), language switcher. Neo-brutalist style: bold black bar, gold accent on active link
- `Footer.astro`: contact info, social media links, postal address, telephone, email. Simple grid layout, black background, white text
- `LanguageSwitcher.astro`: DE/EN toggle that swaps between `/path` and `/en/path` using `getRelativeLocaleUrl()`

**Step 5 — Homepage** (`index.astro` / `en/index.astro`)
- **Section 1 — Hero/Header**: large bold title "Göttingen Denkmale" with a short tagline, neo-brutalist styling
- **Section 2 — Three category cards**: `CategoryCard.astro` for Brunnen, Denkmale, Kunstwerke — each a clickable card with a bold icon/illustration and category name, linking to the category page. Hard shadows, thick borders
- **Section 3 — Photo slideshow**: `Slideshow.astro` — a lightweight carousel of photos. This is the one component that needs client-side JS (Astro Island with `client:visible` directive). Use a tiny vanilla JS or Swiper-based carousel
- **Section 4 — Featured 3D work**: `FeaturedWork.astro` — picks a random work from the collection at build time, shows the `<model-viewer>` embed with title, short description, and a "View details →" link. This is the main 3D showcase hook on the homepage
- **Section 5 — Footer**: rendered from `Footer.astro`

**Step 6 — Category pages** (`brunnen/index.astro`, `denkmale/index.astro`, `kunstwerke/index.astro` + EN equivalents)
- Query the content collection filtered by `category`
- Render a grid of `WorkCard.astro` components — each card shows the monument's poster/thumbnail, title, and a link to the individual work page
- Neo-brutalist card design: thick border, hard shadow, gold/red/blue accent color per category

**Step 7 — Individual work page** (`werke/[slug].astro` / `en/works/[slug].astro`)
- Dynamic route using `getStaticPaths()` — generates one page per monument
- **3D model section**: `ModelViewer.astro` wrapping `<model-viewer>` with `src` (glb), `ios-src` (usdz), `camera-controls`, `auto-rotate`, `shadow-intensity="1"`, `poster` attribute, and AR button
- **Photo gallery**: grid of photos below the 3D viewer
- **Description section**: full description text (DE or EN based on locale)
- **Metadata**: artist, year, material (if available)
- **Map section**: Google My Maps iframe embed showing the monument's location
- **Navigation**: breadcrumb back to category, prev/next work links

**Step 8 — i18n translation file**
- `src/i18n/ui.ts`: export an object with all UI strings in DE and EN (nav labels, button text, footer text, category names, meta descriptions)
- Create a `useTranslation(locale)` helper function that returns the correct string set

**Step 9 — SEO & metadata**
- Open Graph tags and Twitter cards per page (title, description, poster image)
- Structured data (JSON-LD) for each monument: `Place` or `TouristAttraction` schema
- Sitemap generation via `@astrojs/sitemap`
- `robots.txt`

**Step 10 — Deployment**
- Add GitHub Actions workflow at `.github/workflows/deploy.yml` to build and deploy to GitHub Pages on push to `main`
- Configure Astro's `site` and `base` in `astro.config.mjs` for GitHub Pages URL

### Verification

- `pnpm dev` — local dev server, check all pages render
- Verify `<model-viewer>` loads `.glb` models and AR works on iOS (via ngrok or similar)
- Test language switching between DE and EN on every page
- Lighthouse audit: target 95+ performance (Astro's static output should score well)
- Test responsive layout on mobile, tablet, desktop
- Validate all category filters show correct monuments
- `pnpm build` → check `dist/` output is correct static HTML

### Decisions

- **Astro over Next.js**: no backend needed, zero JS by default, better Web Vitals for a content site — Next.js would be overkill
- **Tailwind over plain CSS**: neo-brutalism requires many one-off utility combinations; Tailwind makes this fast and consistent
- **JSON content collection over CMS**: you're the sole maintainer, content rarely changes, git-based workflow is simpler
- **Google My Maps over Maps Embed API**: no API key needed, you can customize pins/layers visually in My Maps editor, and just drop in iframe URLs per monument
- **Static output over SSR**: no dynamic content justifies a server; static builds are faster, cheaper, and more reliable
- **Swiper or vanilla JS for slideshow**: only interactive JS on the whole site; kept minimal as an Astro Island

### Suggestions for Missing Parts

1. **Favicon & site logo** — you'll need a logo or icon for the browser tab and header
2. **404 page** — included in the structure above
3. **Accessibility** — `alt` text on all images, ARIA labels on `<model-viewer>`, keyboard navigation on the slideshow
4. **Analytics** — consider Plausible (privacy-friendly) or Google Analytics
5. **RSS/Atom feed** — optional, if you want people to follow new additions
6. **"About" page** — explaining the GoeODM project, photogrammetry process, contributors (the README has great content for this)
7. **Search** — if the collection grows, a client-side search (e.g., Pagefind, which integrates natively with Astro) could be useful
8. **Cookie consent banner** — required under GDPR if you use analytics or Google Maps embeds
