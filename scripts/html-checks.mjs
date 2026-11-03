import { parse, parseFragment } from 'parse5';
import { createHash } from 'node:crypto';

export const attr = (node, name) => node.attrs?.find(a => a.name === name)?.value;
export function nodes(node) {
  return [node, ...(node.childNodes ?? []).flatMap(nodes)];
}
export const document = html => parse(html);
export const fragment = html => parseFragment(html);
export const find = (tree, tag) => nodes(tree).find(n => n.tagName === tag);
export const hash = value => createHash('sha256').update(value).digest('hex');

// Ignore build/hydration scaffolding, but compare every authored element, attribute
// and text node. Keep whitespace inside preformatted code exactly.
export function canonical(node, pre = false, pagePath = 'index.html') {
  if (node.nodeName === '#comment') return '';
  if (node.nodeName === '#text') {
    const text = pre ? node.value : node.value.replace(/\s+/g, ' ').trim();
    return text ? JSON.stringify(text) : '';
  }
  if (['style', 'template'].includes(node.tagName)) return '';
  if (node.tagName === 'script' && attr(node, 'src') !== 'https://giscus.app/client.js') return '';
  const children = (node.childNodes ?? []).map(n => canonical(n, pre || node.tagName === 'pre', pagePath)).join('');
  if (!node.tagName || node.tagName === 'astro-island' || node.tagName === 'astro-slot') return children;
  const attrs = (node.attrs ?? []).map(({ name, value }) => {
    if (name === 'href' || name === 'src') value = new URL(value, `https://staysober01.github.io/${pagePath}`).href;
    return [name, value];
  }).sort(([a], [b]) => a.localeCompare(b));
  return `<${node.tagName}${JSON.stringify(attrs)}>${children}</${node.tagName}>`;
}

export function snapshot(html, pagePath) {
  const tree = document(html);
  const all = nodes(tree);
  return {
    title: canonical(find(tree, 'title')),
    description: attr(all.find(n => n.tagName === 'meta' && attr(n, 'name') === 'description'), 'content'),
    main: hash(canonical(find(tree, 'main'), false, pagePath)),
    header: hash(canonical(all.find(n => attr(n, 'class') === 'site-header'), false, pagePath)),
    footer: hash(canonical(all.find(n => attr(n, 'class') === 'site-footer'), false, pagePath)),
    code: all.filter(n => n.tagName === 'pre').map(n => hash(canonical(n, true, pagePath))),
    comments: all.filter(n => attr(n, 'src') === 'https://giscus.app/client.js').map(n => canonical(n, false, pagePath)),
  };
}
