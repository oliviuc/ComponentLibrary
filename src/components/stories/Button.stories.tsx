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

export const Default: Story = {};

export const Secondary: Story = {
    args: { variant: "secondary" },
};

export const Outline: Story = {
    args: { variant: "outline" },
};

export const Ghost: Story = {
    args: { variant: "ghost" },
};

export const Destructive: Story = {
    args: { variant: "destructive", children: "Delete" },
};

export const Link: Story = {
    args: { variant: "link" },
};

export const Disabled: Story = {
    args: { disabled: true },
};
