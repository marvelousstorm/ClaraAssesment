const { defineConfig } = require("cypress");

module.exports = defineConfig({
  pageLoadTimeout: 120000,
  defaultCommandTimeout: 15000,
  requestTimeout: 30000,
  videoCompression: false,
  grepFilterSpecs: true,
  retries: 1,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      e2e: true,
      platform: 'stage',
      baseURL: 'https://www.saucedemo.com/',
      username: 'standard_user',
      password: 'secret_sauce',
      apiURL: 'https://reqres.in/api/',
      apiKey: 'reqres-free-v1'
    },
  },
});