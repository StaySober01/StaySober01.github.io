import fs from 'node:fs';
import assert from 'node:assert/strict';
import { snapshot, hash } from './html-checks.mjs';

const baseline = JSON.parse(fs.readFileSync('scripts/fixtures/pre-astro.json', 'utf8'));
for (const [path, expected] of Object.entries(baseline.pages)) {
  const actual = snapshot(fs.readFileSync(`dist/${path}`, 'utf8'), path);
  for (const key of Object.keys(expected)) assert.deepEqual(actual[key], expected[key], `${path}: ${key} changed`);
}
for (const [path, expected] of Object.entries(baseline.assets)) {
  assert.equal(hash(fs.readFileSync(`dist/${path}`)), expected, `${path}: original asset changed`);
}
console.log(`Migration verified: ${Object.keys(baseline.pages).length} URLs, main content, code, metadata, navigation, comments and ${Object.keys(baseline.assets).length} assets match ${baseline.ref}.`);
