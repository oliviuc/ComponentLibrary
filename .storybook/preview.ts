import type { Preview } from "@storybook/react-vite";
import { withThemeByClassName } from "@storybook/addon-themes";

import "../src/assets/css/index.css";
import "./preview.css";

const preview: Preview = {
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        options: {
            storySort: {
                order: ["Introduction", "Components"],
            },
        },
        backgrounds: {
            disable: true,
        },
        a11y: {
            test: "todo",
        },
    },
    decorators: [
        withThemeByClassName({
            themes: {
                light: "",
                dark: "dark",
            },
            defaultTheme: "light",
            parentSelector: "html",
        }),
    ],
};

export default preview;
