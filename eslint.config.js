const { createRequire } = require("module")
const require = createRequire(import.meta.url)

module.exports = {
  extends: ["next/core-web-vitals", "eslint:recommended", "@typescript-eslint/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "error",
    "no-var": "error",
    "no-use-before-define": ["error", { variables: true, functions: false, classes: false }],
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
}
