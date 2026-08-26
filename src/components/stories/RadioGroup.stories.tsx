import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";

const meta = {
    title: "Components/RadioGroup",
    component: RadioGroup,
    parameters: {
        docs: {
            description: {
                component: "Pick one option from a set.",
            },
        },
    },
    argTypes: {
        disabled: {
            control: "boolean",
            description: "Prevents changing the value",
        },
        children: { table: { disable: true } },
        onValueChange: { table: { disable: true } },
    },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: function Default() {
        const [value, setValue] = useState("comfortable");

        return (
            <RadioGroup value={value} onValueChange={setValue}>
                <div className="flex items-center gap-2">
                    <RadioGroupItem value="default" id="plan-default" />
                    <Label htmlFor="plan-default">Default</Label>
                </div>
                <div className="flex items-center gap-2">
                    <RadioGroupItem value="comfortable" id="plan-comfortable" />
                    <Label htmlFor="plan-comfortable">Comfortable</Label>
                </div>
                <div className="flex items-center gap-2">
                    <RadioGroupItem value="compact" id="plan-compact" />
                    <Label htmlFor="plan-compact">Compact</Label>
                </div>
            </RadioGroup>
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [value, setValue] = useState("comfortable");

<RadioGroup value={value} onValueChange={setValue}>
    <div className="flex items-center gap-2">
        <RadioGroupItem value="default" id="plan-default" />
        <Label htmlFor="plan-default">Default</Label>
    </div>
    <div className="flex items-center gap-2">
        <RadioGroupItem value="comfortable" id="plan-comfortable" />
        <Label htmlFor="plan-comfortable">Comfortable</Label>
    </div>
    <div className="flex items-center gap-2">
        <RadioGroupItem value="compact" id="plan-compact" />
        <Label htmlFor="plan-compact">Compact</Label>
    </div>
</RadioGroup>`,
            },
        },
    },
};

export const Disabled: Story = {
    render: function Disabled() {
        const [value, setValue] = useState("comfortable");

        return (
            <RadioGroup value={value} onValueChange={setValue} disabled>
                <div className="flex items-center gap-2">
                    <RadioGroupItem
                        value="default"
                        id="plan-disabled-default"
                    />
                    <Label htmlFor="plan-disabled-default">Default</Label>
                </div>
                <div className="flex items-center gap-2">
                    <RadioGroupItem
                        value="comfortable"
                        id="plan-disabled-comfortable"
                    />
                    <Label htmlFor="plan-disabled-comfortable">
                        Comfortable
                    </Label>
                </div>
            </RadioGroup>
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [value, setValue] = useState("comfortable");

<RadioGroup value={value} onValueChange={setValue} disabled>
    <div className="flex items-center gap-2">
        <RadioGroupItem value="default" id="plan-disabled-default" />
        <Label htmlFor="plan-disabled-default">Default</Label>
    </div>
    <div className="flex items-center gap-2">
        <RadioGroupItem
            value="comfortable"
            id="plan-disabled-comfortable"
        />
        <Label htmlFor="plan-disabled-comfortable">Comfortable</Label>
    </div>
</RadioGroup>`,
            },
        },
    },
};
