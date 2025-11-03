const { defineConfig } = require('cypress');

module.exports = defineConfig({
  retries: {
    openMode: 0,
    runMode: 1,
  },
  e2e: {
    reporter: 'cypress-mochawesome-reporter',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
