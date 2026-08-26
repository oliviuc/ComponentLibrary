import type { Meta, StoryObj } from "@storybook/react-vite";

import { Progress } from "@/components/ui/Progress";

const meta = {
    title: "Components/Progress",
    component: Progress,
    parameters: {
        docs: {
            description: {
                component: "Shows how far a task has come.",
            },
        },
    },
    args: {
        value: 66,
        className: "w-72",
    },
    argTypes: {
        value: {
            control: { type: "range", min: 0, max: 100, step: 1 },
            description: "Percent complete",
        },
        className: { table: { disable: true } },
    },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    parameters: {
        docs: { source: { code: `<Progress value={66} className="w-72" />` } },
    },
};

export const Empty: Story = {
    args: { value: 0 },
    parameters: {
        docs: { source: { code: `<Progress value={0} className="w-72" />` } },
    },
};

export const Complete: Story = {
    args: { value: 100 },
    parameters: {
        docs: {
            source: { code: `<Progress value={100} className="w-72" />` },
        },
    },
};
