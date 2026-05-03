import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './generated',
  fullyParallel: true, 
  retries: 2,          
  workers: 4,  
  reporter: 'html',    
  
  use: {
    baseURL: 'https://practicetestautomation.com',
    trace: 'on-first-retry', 
    screenshot: 'only-on-failure', 
    actionTimeout: 10000, 
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});