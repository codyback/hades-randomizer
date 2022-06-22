import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

// ! - this file is needed until vitest-dev/vscode supports monorepos

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    quasar({
      sassVariables: 'src/assets/scss/quasar-variables.scss',
    }),
  ],
  test: {
    environment: 'happy-dom',
    reporters: ['verbose'],
  },
});
