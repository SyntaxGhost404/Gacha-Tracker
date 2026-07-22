import { access, readFile } from 'node:fs/promises';

const requiredFiles = [
  'dist/client/index.html',
  'dist/server/index.js',
  'dist/.openai/hosting.json',
];

await Promise.all(requiredFiles.map((file) => access(file)));

const worker = await import(new URL('../dist/server/index.js', import.meta.url));

if (!worker.default || typeof worker.default.fetch !== 'function') {
  throw new Error('Sites worker must export a default object with a fetch function.');
}

const manifest = JSON.parse(await readFile('dist/.openai/hosting.json', 'utf8'));

if (!manifest.project_id) {
  throw new Error('Sites hosting manifest is missing project_id.');
}

console.log('Sites artifact validated.');
