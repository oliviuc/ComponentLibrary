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
    render: (args) => (
        <label className="flex items-center gap-2 text-sm">
            <Checkbox {...args} />
            Subscribe to updates
        </label>
    ),
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: `<label className="flex items-center gap-2 text-sm">
    <Checkbox defaultChecked />
    Subscribe to updates
</label>`,
            },
        },
    },
};

export const Unchecked: Story = {
    args: { defaultChecked: false },
    parameters: {
        docs: {
            source: {
                code: `<label className="flex items-center gap-2 text-sm">
    <Checkbox />
    Subscribe to updates
</label>`,
            },
        },
    },
};

export const Disabled: Story = {
    args: { disabled: true },
    parameters: {
        docs: {
            source: {
                code: `<label className="flex items-center gap-2 text-sm">
    <Checkbox defaultChecked disabled />
    Subscribe to updates
</label>`,
            },
        },
    },
};
