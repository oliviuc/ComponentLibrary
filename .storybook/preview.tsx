import type { Preview } from "@storybook/react-vite";
import { withThemeByClassName } from "@storybook/addon-themes";

import { TooltipProvider } from "@/components/ui/Tooltip";

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
                method: "alphabetical",
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
        (Story) => (
            <TooltipProvider>
                <Story />
            </TooltipProvider>
        ),
    ],
};

export default preview;
