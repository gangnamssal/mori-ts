const esbuild = require('esbuild');

const buildOptions = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ['esnext'],
  platform: 'node',
};

esbuild
  .build({
    ...buildOptions,
    outfile: 'dist/esm/index.js',
    format: 'esm',
    external: ['expect'], // 필수 모듈 제외
  })
  .catch(() => process.exit(1));

esbuild
  .build({
    ...buildOptions,
    outfile: 'dist/cjs/index.js',
    format: 'cjs',
    external: ['expect'], // 필수 모듈 제외
  })
  .catch(() => process.exit(1));
