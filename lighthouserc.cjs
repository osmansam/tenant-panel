const { chromium } = require('playwright-core');

module.exports = {
  ci: {
    collect: {
      url: ['login', 'projects', 'collections', 'pages'].map(route => `http://127.0.0.1:4173/${route}`),
      numberOfRuns: 3,
      chromePath: chromium.executablePath(),
      puppeteerScript: './scripts/lighthouse-auth.cjs',
      puppeteerLaunchOptions: { args: ['--no-sandbox'] },
      settings: { disableStorageReset: true, onlyCategories: ['performance'] },
    },
    assert: {
      assertions: {
        'largest-contentful-paint': ['error', { maxNumericValue: 2500, aggregationMethod: 'median' }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1, aggregationMethod: 'median' }],
      },
    },
    upload: { target: 'filesystem', outputDir: 'output/performance/lighthouse' },
  },
};
