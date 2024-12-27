import { defineWorkspace } from "vitest/config";

// create two separate workspaces, one for old "happy-dom" tests, one for new "playright" tests

export default defineWorkspace([
  // old/existing tests
  {
    extends: "./vite.config.js",
    test: {
      include: ["**/*.node.test.{js,jsx}"],
      name: "happy-dom",
      environment: "happy-dom",
    },
  },
  // new tests
  {
    extends: "./vite.config.js",
    test: {
      setupFiles: ["vitest-browser-react"],
      include: ["**/*.browser.test.{js,jsx}"],
      name: "browser",
      browser: {
        provider: "playwright",
        enabled: true,
        name: "chromium", // firefox, webkit
      },
    },
  },
]);
