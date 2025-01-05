const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // URL de ton application React
    setupNodeEvents(on, config) {
    },
  },
});
