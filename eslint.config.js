import storybook from "eslint-plugin-storybook";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

const colorUtility =
    "ring-offset|border-[trblxyse]|bg|text|border|ring|fill|stroke|outline|from|to|via|divide|accent|caret|placeholder|decoration|shadow";
const paletteName =
    "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|white|black";

/** Palette utilities such as bg-red-500, text-zinc-400, bg-white, and bg-black/10. */
const paletteClass = String.raw`(?<![\w-])(?:${colorUtility})-(?:${paletteName})(?:-\d{2,3})?(?![\w-])`;

/** Arbitrary colors such as bg-[#fff], bg-[oklch(...)], and bg-[color-mix(...)]. */
const arbitraryColor = String.raw`(?<![\w-])(?:${colorUtility})-\[(?:#[0-9a-fA-F]|oklch\(|oklab\(|rgba?\(|hsla?\(|hwb\(|lab\(|lch\(|color-mix\(|color\()`;

/** Any Tailwind dark: class. Theme changes belong in colors.css. */
const darkUtility = String.raw`(?<![\w-])dark:`;

const themeColorMessage =
    "Use a theme token from src/assets/css/colors.css instead of a palette class, arbitrary color, or Tailwind dark: class.";

function themeColorSelectors(pattern) {
    return [
        `Literal[value=/${pattern}/]`,
        `TemplateElement[value.cooked=/${pattern}/]`,
    ].map((selector) => ({
        selector,
        message: themeColorMessage,
    }));
}

export default defineConfig([
    globalIgnores(["dist", "storybook-static"]),
    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
    },
    {
        files: [
            "src/components/**/*.{ts,tsx}",
            "src/hooks/**/*.{ts,tsx}",
            "**/*.stories.{ts,tsx}",
            ".storybook/**/*.{ts,tsx}",
        ],
        rules: {
            "react-refresh/only-export-components": "off",
        },
    },
    eslintConfigPrettier,
    ...storybook.configs["flat/recommended"],
    {
        files: ["src/**/*.{ts,tsx}"],
        rules: {
            "no-restricted-syntax": [
                "error",
                ...themeColorSelectors(paletteClass),
                ...themeColorSelectors(arbitraryColor),
                ...themeColorSelectors(darkUtility),
            ],
        },
    },
]);
