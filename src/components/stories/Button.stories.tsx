import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { Button } from "@/components/ui/Button";

const meta = {
    title: "Components/Button",
    component: Button,
    parameters: {
        docs: {
            description: {
                component: "Starts an action. Size is always default.",
            },
        },
    },
    args: {
        children: "Button",
        onClick: fn(),
    },
    argTypes: {
        variant: {
            control: "select",
            options: [
                "default",
                "secondary",
                "outline",
                "ghost",
                "destructive",
                "link",
            ],
            description: "Visual style",
        },
        disabled: {
            control: "boolean",
            description: "Prevents the action",
        },
        children: {
            control: "text",
            description: "Label",
        },
        asChild: { table: { disable: true } },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    parameters: {
        docs: { source: { code: `<Button>Button</Button>` } },
    },
};

export const Secondary: Story = {
    args: { variant: "secondary" },
    parameters: {
        docs: {
            source: { code: `<Button variant="secondary">Button</Button>` },
        },
    },
};

export const Outline: Story = {
    args: { variant: "outline" },
    parameters: {
        docs: { source: { code: `<Button variant="outline">Button</Button>` } },
    },
};

export const Ghost: Story = {
    args: { variant: "ghost" },
    parameters: {
        docs: { source: { code: `<Button variant="ghost">Button</Button>` } },
    },
};

export const Destructive: Story = {
    args: { variant: "destructive", children: "Delete" },
    parameters: {
        docs: {
            source: { code: `<Button variant="destructive">Delete</Button>` },
        },
    },
};

export const Link: Story = {
    args: { variant: "link" },
    parameters: {
        docs: { source: { code: `<Button variant="link">Button</Button>` } },
    },
};

export const Disabled: Story = {
    args: { disabled: true },
    parameters: {
        docs: { source: { code: `<Button disabled>Button</Button>` } },
    },
};
