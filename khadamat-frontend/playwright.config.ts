import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Timeouts augmentés
  timeout: 120000, // 2 minutes par test

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : 2,  // Increased from 1 to 4 workers in CI

  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    actionTimeout: 30000,      // 30s par action
    navigationTimeout: 60000,  // 1 min pour navigation
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Configuration du serveur web automatique - disabled for now
  // webServer: [
  //   {
  //     command: 'npm run dev',
  //     url: 'http://localhost:3000',
  //     reuseExistingServer: true,
  //     timeout: 120000, // 2 minutes pour démarrer le serveur
  //     stdout: 'ignore',
  //     stderr: 'pipe',
  //   },
  //   {
  //     command: 'set PORT=4000 && npm run start:dev',
  //     url: 'http://localhost:4000',
  //     reuseExistingServer: true,
  //     timeout: 120000, // 2 minutes pour démarrer le serveur
  //     stdout: 'ignore',
  //     stderr: 'pipe',
  //   },
  // ],
});