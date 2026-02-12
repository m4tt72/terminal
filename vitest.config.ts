/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json'],
      exclude: [
        'node_modules/',
        'tests/',
        '*.config.ts',
        '*.config.js',
        'src/main.ts',
        'src/vite-env.d.ts',
        'src/interfaces/',
        'dist/',
        'public/',
        'docs/',
      ],
      thresholds: {
        lines: 85,
        functions: 85,
        branches: 85,
        statements: 85,
      },
    },
    include: ['tests/**/*.test.ts'],
    testTimeout: 10000,
    setupFiles: ['./tests/setup.ts'],
  },
});
