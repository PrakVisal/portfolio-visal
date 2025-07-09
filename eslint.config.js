const { FlatCompat } = require("@eslint/eslintrc")

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

module.exports = [
  ...compat.extends("next/core-web-vitals"),
  ...compat.extends("prettier"),
  {
    rules: {
      "@next/next/no-img-element": "off",
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
]
