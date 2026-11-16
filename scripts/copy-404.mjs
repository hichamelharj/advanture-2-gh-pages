import { copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// GitHub Pages has no SPA rewrite. Serving the built app for unknown paths
// lets deep links such as /cart reach the router instead of a 404 page.
const distDirectory = fileURLToPath(new URL('../dist/', import.meta.url));

await copyFile(`${distDirectory}index.html`, `${distDirectory}404.html`);
console.log('Created dist/404.html for deep-link fallback.');
