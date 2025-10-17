const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    video: true,
    videosFolder: 'cypress/videos',
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // hooks si los necesitas
    },
  },
})
