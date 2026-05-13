const { defineConfig, devices } = require('@playwright/test');

const viewport = {
  width: Number(process.env.VIEWPORT_WIDTH ?? 1920),
  height: Number(process.env.VIEWPORT_HEIGHT ?? 1080),
};

const projects = [
  {
    name: 'Google Chrome',
    use: {
      ...devices['Desktop Chrome'],
      channel: 'chrome',
      viewport,
    },
  },
  {
    name: 'Mozilla Firefox',
    use: {
      ...devices['Desktop Firefox'],
      viewport,
    },
  },
]

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: process.env.workers ? Number(process.env.workers) : undefined,
  grep: process.env.runThis ? new RegExp(process.env.runThis, 'i') : undefined,
  reporter: 'list',
  retries: process.env.CI ? 1 : 0,
  outputDir: 'test-results/artifacts',
  use: {
    baseURL: 'https://demoqa.com',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    viewport,
    ignoreHTTPSErrors: true,
  },
  projects,
});
