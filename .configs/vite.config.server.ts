import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import { ViteAliases } from 'vite-aliases';

export default defineConfig({
  plugins: [
    ViteAliases({ dir: 'src', prefix: '@', depth: 1 }),
    dts({
      tsconfigPath: resolve(__dirname, '../tsconfig.build.json'),
      outDir: 'dist',
      entryRoot: resolve(__dirname, '../src'),
      include: ['server.ts'],
    }),
  ],
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, '../src/server.ts'),
      name: 'AtmeUiKitServer',
      fileName: (format) => `server.${format === 'es' ? 'esm' : format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    sourcemap: true,
  },
});
