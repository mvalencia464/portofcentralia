// Photos ship in public/images by default. To serve them from Cloudflare R2,
// set PUBLIC_IMAGE_BASE (for example https://img.example.com/port-of-centralia)
// and upload files with the names below. Keys not in the ready list render a
// labeled placeholder instead.
const base = (import.meta.env.PUBLIC_IMAGE_BASE ?? '/images').replace(/\/$/, '');

// Only keys listed here are loaded; add a key once its file is uploaded.
const uploaded = new Set(
  (import.meta.env.PUBLIC_IMAGES_READY ?? 'hero,park1,park2,park3,rail,community,logo')
    .split(',')
    .map((s: string) => s.trim())
    .filter(Boolean),
);

interface Credit {
  author: string;
  license: 'Public domain' | 'CC0' | 'CC BY-SA 3.0' | 'CC BY-SA 4.0';
  source: string;
}

interface ImageMeta {
  file: string;
  /** WebP copies named <stem>-<width>.webp */
  webpWidths?: number[];
  /** AVIF copies at the same widths, named <stem>-<width>.avif */
  avif?: boolean;
  width: number;
  height: number;
  alt: string;
  label: string;
  /** Photos not owned by the Port get a credit; stand-ins also get a visible tag. */
  stock?: Credit;
  /** True for stand-ins that don't show the Port's own sites. */
  representative?: boolean;
}

export const images = {
  hero: {
    file: 'hero-centralia-aerial.jpg',
    webpWidths: [640, 800, 1200],
    width: 1200,
    height: 793,
    alt: 'Aerial view of Centralia, with industrial buildings, a rail line, and open fields, and Mount Rainier on the horizon',
    label: 'PHOTO: Centralia aerial',
  },
  park1: {
    file: 'park-1-aerial.jpg',
    webpWidths: [480, 800],
    avif: true,
    representative: true,
    width: 1200,
    height: 675,
    alt: 'Aerial view of a large distribution center with truck docks and parking',
    label: 'PHOTO: Distribution center aerial',
    stock: {
      author: 'Wikideas1',
      license: 'CC0',
      source: "https://commons.wikimedia.org/wiki/File:Cabela%27s_distribution_center_Prairie_du_Chien_02.jpg",
    },
  },
  park2: {
    file: 'park-2-warehouse.jpg',
    webpWidths: [480, 800],
    avif: true,
    representative: true,
    width: 1200,
    height: 675,
    alt: 'Modern metal-clad warehouse with landscaping along the drive',
    label: 'PHOTO: Modern warehouse',
    stock: {
      author: 'DimiTalen',
      license: 'CC0',
      source: 'https://commons.wikimedia.org/wiki/File:Van_de_Velde_distribution_center_Wichelen_1.jpg',
    },
  },
  park3: {
    file: 'park-3-warehouse.jpg',
    webpWidths: [480, 800],
    avif: true,
    representative: true,
    width: 1200,
    height: 675,
    alt: 'Business park street lined with modern light-industrial buildings',
    label: 'PHOTO: Business park street',
    stock: {
      author: 'DimiTalen',
      license: 'CC0',
      source: 'https://commons.wikimedia.org/wiki/File:Van_de_Velde_distribution_center_Wichelen_2.jpg',
    },
  },
  rail: {
    file: 'rail-centralia-depot.jpg',
    webpWidths: [400, 800],
    avif: true,
    width: 800,
    height: 1000,
    alt: '',
    label: 'Freight train at Centralia Union Depot',
    stock: {
      author: 'Joe Mabel',
      license: 'CC BY-SA 3.0',
      source: 'https://commons.wikimedia.org/wiki/File:Centralia_Union_Depot_platform_with_freight_train.jpg',
    },
  },
  community: {
    file: 'rainier-from-centralia.jpg',
    webpWidths: [480, 800],
    avif: true,
    width: 1200,
    height: 675,
    alt: '',
    label: 'Mount Rainier from Centralia',
    stock: {
      author: 'Chris Light',
      license: 'CC BY-SA 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Mt_Rainier_917.jpg',
    },
  },
} satisfies Record<string, ImageMeta>;

export type ImageKey = keyof typeof images;

const meta = (key: ImageKey): ImageMeta => images[key];

export function imageSrc(key: ImageKey): string | null {
  return base && uploaded.has(key) ? `${base}/${images[key].file}` : null;
}

// srcset of the WebP copies, or null when an image has none or isn't ready.
export function webpSrcset(key: ImageKey): string | null {
  const src = imageSrc(key);
  const widths = meta(key).webpWidths;
  if (!src || !widths) return null;
  const stem = src.replace(/\.\w+$/, '');
  return widths.map((w) => `${stem}-${w}.webp ${w}w`).join(', ');
}

export function avifSrcset(key: ImageKey): string | null {
  return meta(key).avif ? (webpSrcset(key)?.replaceAll('.webp', '.avif') ?? null) : null;
}

export const stockCredits = (Object.keys(images) as ImageKey[])
  .filter((key) => meta(key).stock && imageSrc(key))
  .map((key) => ({ label: meta(key).label.replace(/^PHOTO: /, ''), ...meta(key).stock! }));

export const logo = {
  dark: base && uploaded.has('logo') ? `${base}/logo-blue.png` : null,
  light: base && uploaded.has('logo') ? `${base}/logo-white.png` : null,
};
