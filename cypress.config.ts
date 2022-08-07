import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'e2e/specs/*.cy.{js,jsx,ts,tsx}',
    supportFile: false,
    video: false,
  },
});
