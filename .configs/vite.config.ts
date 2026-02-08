import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { ViteAliases } from 'vite-aliases';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ViteAliases({ dir: 'src', prefix: '@', depth: 1 }),
    react(),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, '../src/index.ts'),
        global: resolve(__dirname, '../src/global.ts'),
      },
      name: 'AtmeUiKit',
      fileName: (format, entryName) =>
        `${entryName}.${format === 'es' ? 'esm' : format}.js`,
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
    cssCodeSplit: false,
    sourcemap: true,
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});

