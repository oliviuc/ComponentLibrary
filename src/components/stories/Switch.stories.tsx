import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { Switch } from "@/components/ui/Switch";

const meta = {
    title: "Components/Switch",
    component: Switch,
    parameters: {
        docs: {
            description: {
                component: "Turn a setting on or off. Size is always default.",
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
            description: "On at first render",
        },
        disabled: {
            control: "boolean",
            description: "Prevents changing the value",
        },
    },
    decorators: [
        (Story) => (
            <label className="flex items-center gap-2 text-sm">
                Notifications
                <Story />
            </label>
        ),
    ],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Off: Story = {
    args: { defaultChecked: false },
};

export const Disabled: Story = {
    args: { disabled: true },
};
