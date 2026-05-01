import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './generated',
  fullyParallel: true, // Testleri paralel koşturarak hızlandırır
  retries: 2,          // Flaky testleri otomatik olarak 2 kez daha dener
  workers: undefined,  // İşlemci gücüne göre otomatik worker atar
  reporter: 'html',    // Rapor formatı
  
  use: {
    baseURL: 'https://practicetestautomation.com',
    trace: 'on-first-retry', // İlk hata aldığında tüm süreci kaydeder (Hata ayıklamak için dev özelliktir)
    screenshot: 'only-on-failure', // Sadece fail eden testlerde ekran görüntüsü alır
    actionTimeout: 10000, // Tıklama gibi aksiyonlar için 10sn limit
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});