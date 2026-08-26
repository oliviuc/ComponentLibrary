import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

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
    argTypes: {
        disabled: {
            control: "boolean",
            description: "Prevents changing the value",
        },
    },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: function Default() {
        const [checked, setChecked] = useState(true);

        return (
            <label className="flex items-center gap-2 text-sm">
                <Checkbox
                    checked={checked}
                    onCheckedChange={(value) => setChecked(value === true)}
                />
                Subscribe to updates
            </label>
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [checked, setChecked] = useState(true);

<label className="flex items-center gap-2 text-sm">
    <Checkbox
        checked={checked}
        onCheckedChange={(value) => setChecked(value === true)}
    />
    Subscribe to updates
</label>`,
            },
        },
    },
};

export const Unchecked: Story = {
    render: function Unchecked() {
        const [checked, setChecked] = useState(false);

        return (
            <label className="flex items-center gap-2 text-sm">
                <Checkbox
                    checked={checked}
                    onCheckedChange={(value) => setChecked(value === true)}
                />
                Subscribe to updates
            </label>
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [checked, setChecked] = useState(false);

<label className="flex items-center gap-2 text-sm">
    <Checkbox
        checked={checked}
        onCheckedChange={(value) => setChecked(value === true)}
    />
    Subscribe to updates
</label>`,
            },
        },
    },
};

export const Disabled: Story = {
    render: function Disabled() {
        const [checked, setChecked] = useState(true);

        return (
            <label className="flex items-center gap-2 text-sm">
                <Checkbox
                    checked={checked}
                    onCheckedChange={(value) => setChecked(value === true)}
                    disabled
                />
                Subscribe to updates
            </label>
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [checked, setChecked] = useState(true);

<label className="flex items-center gap-2 text-sm">
    <Checkbox
        checked={checked}
        onCheckedChange={(value) => setChecked(value === true)}
        disabled
    />
    Subscribe to updates
</label>`,
            },
        },
    },
};
