import metadata from '../content/pages.json';

const bodies = import.meta.glob<string>('../content/pages/**/*.html', {
  query: '?raw', import: 'default', eager: true,
});

export const pages = metadata.map(page => {
  const body = bodies[`../content/pages/${page.path}`];
  if (body === undefined) throw new Error(`Missing page body: ${page.path}`);
  return { ...page, body };
});
export type Page = (typeof pages)[number];
