import { copyFile, mkdir, writeFile } from 'node:fs/promises';

const worker = `const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const finalSegment = url.pathname.split('/').pop() ?? '';

    if (request.method === 'GET' && !finalSegment.includes('.')) {
      return env.ASSETS.fetch(new Request(new URL('/index.html', url), request));
    }

    return env.ASSETS.fetch(request);
  },
};

export default worker;
`;

await mkdir('dist/server', { recursive: true });
await mkdir('dist/.openai', { recursive: true });
await writeFile('dist/server/index.js', worker);
await copyFile('.openai/hosting.json', 'dist/.openai/hosting.json');
