import { getCollection, type CollectionEntry } from 'astro:content';

export type Meeting = CollectionEntry<'meetings'>['data'];

// Dates are stored as YYYY-MM-DD; noon UTC keeps them on the right day in any zone.
const toDate = (iso: string) => new Date(`${iso}T12:00:00Z`);

export const formatDate = (iso: string, style: 'long' | 'short' | 'weekday' = 'long') =>
  toDate(iso).toLocaleDateString('en-US', {
    timeZone: 'UTC',
    ...(style === 'weekday' && { weekday: 'long' }),
    month: style === 'short' ? 'short' : 'long',
    day: 'numeric',
    year: 'numeric',
  });

export const meetingTitle = (m: Meeting) =>
  m.type === 'Special'
    ? 'Special Commission Meeting'
    : m.type === 'Regular + Public Hearing'
      ? 'Regular Meeting & Public Hearing'
      : 'Regular Commission Meeting';

// The site is static, so "today" is the build date. A daily Cloudflare Pages
// deploy hook keeps "next meeting" current.
export async function getMeetings(today = new Date().toISOString().slice(0, 10)) {
  const all = (await getCollection('meetings')).map((e) => e.data).sort((a, b) => b.date.localeCompare(a.date));
  const upcoming = all.filter((m) => m.date >= today).reverse();
  const past = all.filter((m) => m.date < today);
  return { all, upcoming, past };
}

export const docOf = (m: Meeting, kind: 'Agenda' | 'Minutes' | 'Notice') => m.documents.find((d) => d.kind === kind);
