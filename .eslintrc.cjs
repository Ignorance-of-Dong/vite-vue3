/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
  ],
  overrides: [
    {
      files: [
        "cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}",
        "src/views/**/*.vue",
        "src/layout/**/*.vue",
        "src/components/**/*.vue",
      ],
      globals: {
        $ref: true,
        $computed: true,
        $: true,
      },
      rules: {
        "vue/multi-word-component-names": "off",
      },
      extends: ["plugin:cypress/recommended", "./.eslintrc-auto-import.json"],
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
};
