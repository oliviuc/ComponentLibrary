import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

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
    argTypes: {
        disabled: {
            control: "boolean",
            description: "Prevents changing the value",
        },
    },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: function Default() {
        const [checked, setChecked] = useState(true);

        return (
            <label className="flex items-center gap-2 text-sm">
                Notifications
                <Switch checked={checked} onCheckedChange={setChecked} />
            </label>
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [checked, setChecked] = useState(true);

<label className="flex items-center gap-2 text-sm">
    Notifications
    <Switch checked={checked} onCheckedChange={setChecked} />
</label>`,
            },
        },
    },
};

export const Off: Story = {
    render: function Off() {
        const [checked, setChecked] = useState(false);

        return (
            <label className="flex items-center gap-2 text-sm">
                Notifications
                <Switch checked={checked} onCheckedChange={setChecked} />
            </label>
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [checked, setChecked] = useState(false);

<label className="flex items-center gap-2 text-sm">
    Notifications
    <Switch checked={checked} onCheckedChange={setChecked} />
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
                Notifications
                <Switch
                    checked={checked}
                    onCheckedChange={setChecked}
                    disabled
                />
            </label>
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [checked, setChecked] = useState(true);

<label className="flex items-center gap-2 text-sm">
    Notifications
    <Switch checked={checked} onCheckedChange={setChecked} disabled />
</label>`,
            },
        },
    },
};

export const Invalid: Story = {
    render: function Invalid() {
        const [checked, setChecked] = useState(false);

        return (
            <label className="flex items-center gap-2 text-sm">
                Notifications
                <Switch
                    checked={checked}
                    onCheckedChange={setChecked}
                    aria-invalid
                />
            </label>
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [checked, setChecked] = useState(false);

<label className="flex items-center gap-2 text-sm">
    Notifications
    <Switch
        checked={checked}
        onCheckedChange={setChecked}
        aria-invalid
    />
</label>`,
            },
        },
    },
};
