import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/dist/',
        '**/*.stories.*',
      ],
    },
  },
  resolve: {
    alias: {
      '@*': resolve(__dirname, '../src/*'),
      '@tokens': resolve(__dirname, '../src/tokens'),
      '@utils': resolve(__dirname, '../src/utils'),
      '@components': resolve(__dirname, '../src/components'),
    },
  },
});

