import eslintPluginTs from "@typescript-eslint/eslint-plugin";
import eslintParserTs from "@typescript-eslint/parser";

export default [
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: eslintParserTs,
    },
    plugins: {
      "@typescript-eslint": eslintPluginTs,
    },
    rules: {
      // You can customize rules here
    },
  },
];
