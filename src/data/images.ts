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
  license: 'Public domain' | 'CC0';
  source: string;
}

interface ImageMeta {
  file: string;
  /** WebP copies named <stem>-<width>.webp */
  webpWidths?: number[];
  width: number;
  height: number;
  alt: string;
  label: string;
  /** Stock stand-ins (not the Port's property) get a visible tag and a credit. */
  stock?: Credit;
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
    width: 1200,
    height: 675,
    alt: 'Aerial view of a large distribution center with truck docks and parking',
    label: 'PHOTO: Park I aerial',
    stock: {
      author: 'Wikideas1',
      license: 'CC0',
      source: "https://commons.wikimedia.org/wiki/File:Cabela%27s_distribution_center_Prairie_du_Chien_02.jpg",
    },
  },
  park2: {
    file: 'park-2-warehouse.jpg',
    webpWidths: [480, 800],
    width: 1200,
    height: 675,
    alt: 'Modern metal-clad warehouse with landscaping along the drive',
    label: 'PHOTO: Park II',
    stock: {
      author: 'DimiTalen',
      license: 'CC0',
      source: 'https://commons.wikimedia.org/wiki/File:Van_de_Velde_distribution_center_Wichelen_1.jpg',
    },
  },
  park3: {
    file: 'park-3-warehouse.jpg',
    webpWidths: [480, 800],
    width: 1200,
    height: 675,
    alt: 'Business park street lined with modern light-industrial buildings',
    label: 'PHOTO: Park 3',
    stock: {
      author: 'DimiTalen',
      license: 'CC0',
      source: 'https://commons.wikimedia.org/wiki/File:Van_de_Velde_distribution_center_Wichelen_2.jpg',
    },
  },
  rail: {
    file: 'rail-service.jpg',
    webpWidths: [400, 800],
    width: 800,
    height: 1000,
    alt: '',
    label: 'PHOTO: Freight rail line',
    stock: {
      author: 'G Pei',
      license: 'Public domain',
      source:
        'https://commons.wikimedia.org/wiki/File:Westbound_Pumpkin_(BNSF_GE_ES44DC_locomotive_leading_train_August_2025).jpg',
    },
  },
  community: {
    file: 'centralia-rainier.jpg',
    webpWidths: [480, 800],
    width: 1200,
    height: 675,
    alt: '',
    label: 'PHOTO: Centralia with Mount Rainier',
    stock: {
      author: 'National Park Service',
      license: 'Public domain',
      source:
        'https://commons.wikimedia.org/wiki/File:Inspiration_Point,_a_view_point_on_the_western_end_of_Stevens_Canyon_Road,_has_excellent_views_of_Mount_Rainier._(1d57e53e-e569-48a2-b8c4-71133b5c62fc).JPG',
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

export const stockCredits = (Object.keys(images) as ImageKey[])
  .filter((key) => meta(key).stock && imageSrc(key))
  .map((key) => ({ label: meta(key).label.replace(/^PHOTO: /, ''), ...meta(key).stock! }));

export const logo = {
  dark: base && uploaded.has('logo') ? `${base}/logo-blue.png` : null,
  light: base && uploaded.has('logo') ? `${base}/logo-white.png` : null,
};
