const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin =
  require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

module.exports = defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    supportFile: "cypress/support/e2e.js",
    viewportWidth: 1280,  
    viewportHeight: 720,  
    async setupNodeEvents(on, config) {
      await preprocessor.addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },
    stepDefinitions: [
      "cypress/e2e/api/steps/**/*.{js,ts}"
    ],
  },
  env: {
    apiUrl: "https://serverest.dev",
    apiWeb: "https://www.saucedemo.com/"
  },
});
