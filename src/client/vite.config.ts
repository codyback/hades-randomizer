/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    quasar({
      sassVariables: './src/assets/scss/quasar-variables.scss',
    }),
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    reporters: 'verbose',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      enabled: true,
      reporter: ['text', 'html', 'json'],
      branches: 85,
    },
  },
});
