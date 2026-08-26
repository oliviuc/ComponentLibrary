import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "@/components/ui/Badge";

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

export const Default: Story = {
    parameters: {
        docs: { source: { code: `<Badge>Badge</Badge>` } },
    },
};

export const Secondary: Story = {
    args: { variant: "secondary" },
    parameters: {
        docs: { source: { code: `<Badge variant="secondary">Badge</Badge>` } },
    },
};

export const Outline: Story = {
    args: { variant: "outline" },
    parameters: {
        docs: { source: { code: `<Badge variant="outline">Badge</Badge>` } },
    },
};

export const Destructive: Story = {
    args: { variant: "destructive", children: "Error" },
    parameters: {
        docs: {
            source: { code: `<Badge variant="destructive">Error</Badge>` },
        },
    },
};

export const Ghost: Story = {
    args: { variant: "ghost" },
    parameters: {
        docs: { source: { code: `<Badge variant="ghost">Badge</Badge>` } },
    },
};

export const Link: Story = {
    args: { variant: "link" },
    parameters: {
        docs: { source: { code: `<Badge variant="link">Badge</Badge>` } },
    },
};
