import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { attr, nodes, document, fragment, canonical, find } from './html-checks.mjs';

const pages = JSON.parse(fs.readFileSync('src/content/pages.json', 'utf8'));
const docs = new Map(pages.map(page => [page.path, document(fs.readFileSync(`dist/${page.path}`, 'utf8'))]));
let links = 0;
for (const page of pages) {
  const tree = docs.get(page.path);
  const all = nodes(tree);
  assert.equal(all.filter(n => n.tagName === 'h1').length, 1, `${page.path}: one h1 required`);
  assert.equal(attr(find(tree, 'html'), 'lang'), 'ko');
  assert.equal(attr(all.find(n => n.tagName === 'meta' && attr(n, 'name') === 'description'), 'content'), page.description);
  const source = fragment(`<main id="main-content">${fs.readFileSync(`src/content/pages/${page.path}`, 'utf8')}</main>`);
  assert.equal(canonical(find(tree, 'main'), false, page.path), canonical(find(source, 'main'), false, page.path), `${page.path}: generated content differs from source`);
  if (page.path !== 'til/index.html') assert.ok(!all.some(n => n.tagName === 'astro-island'), `${page.path}: unexpected React hydration`);
  for (const node of all) {
    for (const name of ['href', 'src', 'component-url', 'renderer-url']) {
      const value = attr(node, name);
      if (!value) continue;
      const url = new URL(value, `https://staysober01.github.io/${page.path}`);
      if (url.origin !== 'https://staysober01.github.io') continue;
      let target = decodeURIComponent(url.pathname).slice(1);
      if (!target || target.endsWith('/')) target += 'index.html';
      assert.ok(fs.existsSync(path.join('dist', target)), `${page.path}: broken ${name} ${value}`);
      if (url.hash && docs.has(target)) {
        const id = decodeURIComponent(url.hash.slice(1));
        assert.ok(nodes(docs.get(target)).some(n => attr(n, 'id') === id), `${page.path}: missing anchor ${value}`);
      }
      links++;
    }
  }
}
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name).replaceAll('\\', '/')]);
assert.equal(walk('dist').filter(p => p.endsWith('.html')).length, pages.length, 'Unexpected HTML output');
assert.ok(!fs.existsSync('dist/src') && !fs.existsSync('dist/docs'), 'Authoring files must not be deployed');
console.log(`Build verified: ${pages.length} complete HTML pages, ${links} local links/assets/anchors, content parity and React limited to the TIL list.`);
