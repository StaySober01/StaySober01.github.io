import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://staysober01.github.io',
  output: 'static',
  // Index routes remain /index.html and /til/index.html; articles remain *.html.
  build: { format: 'preserve' },
  trailingSlash: 'never',
  compressHTML: false,
  integrations: [react()],
});
