import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "./Badge";

const meta = {
    title: "Components/Badge",
    component: Badge,
    parameters: {
        docs: {
            description: {
                component: "A short label for status, counts, or categories.",
            },
        },
    },
    args: {
        children: "Badge",
    },
    argTypes: {
        variant: {
            control: "select",
            options: [
                "default",
                "secondary",
                "outline",
                "destructive",
                "ghost",
                "link",
            ],
            description: "Visual style",
        },
        children: {
            control: "text",
            description: "Label",
        },
        asChild: { table: { disable: true } },
    },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Secondary: Story = {
    args: { variant: "secondary" },
};

export const Outline: Story = {
    args: { variant: "outline" },
};

export const Destructive: Story = {
    args: { variant: "destructive", children: "Error" },
};

export const Ghost: Story = {
    args: { variant: "ghost" },
};

export const Link: Story = {
    args: { variant: "link" },
};
