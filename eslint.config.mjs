import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Marketing copy contains apostrophes and smart quotes — HTML-entity
      // escaping them makes the source unreadable without shipping safety gain.
      "react/no-unescaped-entities": "off",
    },
  },
  {
    // Intentional raw <img> usage: logo marquees (tiny PNGs where next/image
    // overhead exceeds the payload win) and unsplash placeholder tiles.
    files: ["app/(site)/page.tsx", "app/(contact)/contact-us/page.tsx"],
    rules: { "@next/next/no-img-element": "off" },
  },
  {
    // Legacy imperative JS body is pasted verbatim from the static site.
    files: ["lib/home-interactions.ts"],
    rules: { "@typescript-eslint/ban-ts-comment": "off" },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
