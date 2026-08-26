import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

const meta = {
    title: "Components/Label",
    component: Label,
    parameters: {
        docs: {
            description: {
                component: "Names a field. Point htmlFor at the control id.",
            },
        },
    },
    args: {
        children: "Email",
        htmlFor: "label-email",
    },
    argTypes: {
        children: {
            control: "text",
            description: "Label text",
        },
        htmlFor: {
            control: "text",
            description: "Id of the labeled control",
        },
    },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: function Default(args) {
        const [value, setValue] = useState("");

        return (
            <div className="grid w-72 gap-2">
                <Label {...args} />
                <Input
                    id={args.htmlFor}
                    type="email"
                    placeholder="you@example.com"
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                />
            </div>
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [value, setValue] = useState("");

<div className="grid w-72 gap-2">
    <Label htmlFor="label-email">Email</Label>
    <Input
        id="label-email"
        type="email"
        placeholder="you@example.com"
        value={value}
        onChange={(event) => setValue(event.target.value)}
    />
</div>`,
            },
        },
    },
};

export const Disabled: Story = {
    render: function Disabled() {
        const [value, setValue] = useState("");

        return (
            <div className="group grid w-72 gap-2" data-disabled="true">
                <Label htmlFor="label-email-disabled">Email</Label>
                <Input
                    id="label-email-disabled"
                    type="email"
                    placeholder="you@example.com"
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    disabled
                />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "The label dims when the field is disabled.",
            },
            source: {
                code: `const [value, setValue] = useState("");

<div className="group grid w-72 gap-2" data-disabled="true">
    <Label htmlFor="label-email-disabled">Email</Label>
    <Input
        id="label-email-disabled"
        type="email"
        placeholder="you@example.com"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        disabled
    />
</div>`,
            },
        },
    },
};
