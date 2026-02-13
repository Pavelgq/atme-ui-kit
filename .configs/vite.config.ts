import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import { ViteAliases } from 'vite-aliases';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ViteAliases({ dir: 'src', prefix: '@', depth: 1 }),
    react(),
    dts({
      tsconfigPath: resolve(__dirname, '../tsconfig.build.json'),
      outDir: 'dist',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, '../src/index.ts'),
      name: 'AtmeUiKit',
      fileName: (format) =>
        `index.${format === 'es' ? 'esm' : format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        banner: () => "'use client';",
        assetFileNames: (assetInfo) =>
          assetInfo.name?.endsWith('.css') ? 'ui-kit.css' : 'assets/[name]-[hash][extname]',
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

