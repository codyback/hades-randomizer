import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'e2e/specs/*.cy.{js,jsx,ts,tsx}',
    supportFile: false,
    video: false,
  },
});
