import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { Checkbox } from "@/components/ui/Checkbox";

const meta = {
    title: "Components/Checkbox",
    component: Checkbox,
    parameters: {
        docs: {
            description: {
                component: "Select one option on or off.",
            },
        },
    },
    args: {
        defaultChecked: true,
        onCheckedChange: fn(),
    },
    argTypes: {
        defaultChecked: {
            control: "boolean",
            description: "Checked on first render",
        },
        disabled: {
            control: "boolean",
            description: "Prevents changing the value",
        },
    },
    decorators: [
        (Story) => (
            <label className="flex items-center gap-2 text-sm">
                <Story />
                Subscribe to updates
            </label>
        ),
    ],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Unchecked: Story = {
    args: { defaultChecked: false },
};

export const Disabled: Story = {
    args: { disabled: true },
};
