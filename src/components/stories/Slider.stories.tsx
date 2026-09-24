import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Label } from "@/components/ui/Label";
import { Slider } from "@/components/ui/Slider";

const meta = {
    title: "Components/Slider",
    component: Slider,
    parameters: {
        docs: {
            description: {
                component:
                    "Pick a value along a range. Pass one number per thumb. The value shows above the thumb while you move it. onValueCommitted fires when the drag ends.",
            },
        },
    },
    argTypes: {
        min: {
            control: { type: "number" },
            description: "Lowest value",
        },
        max: {
            control: { type: "number" },
            description: "Highest value",
        },
        step: {
            control: { type: "number", min: 1 },
            description: "Increment",
        },
        disabled: {
            control: "boolean",
            description: "Prevents dragging",
        },
        className: { table: { disable: true } },
    },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: function Default() {
        const [value, setValue] = useState([48]);

        return (
            <Slider
                aria-label="Volume"
                value={value}
                onValueChange={setValue}
                max={100}
                step={1}
                className="w-64"
            />
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [value, setValue] = useState([48]);

<Slider
    aria-label="Volume"
    value={value}
    onValueChange={setValue}
    max={100}
    step={1}
    className="w-64"
/>`,
            },
        },
    },
};

export const Range: Story = {
    render: function Range() {
        const [value, setValue] = useState([20, 80]);

        return (
            <Slider
                value={value}
                onValueChange={setValue}
                max={100}
                step={1}
                getAriaLabel={(index) =>
                    index === 0 ? "Minimum price" : "Maximum price"
                }
                className="w-64"
            />
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Two thumbs to pick a min and max.",
            },
            source: {
                code: `const [value, setValue] = useState([20, 80]);

<Slider
    value={value}
    onValueChange={setValue}
    max={100}
    step={1}
    getAriaLabel={(index) =>
        index === 0 ? "Minimum price" : "Maximum price"
    }
    className="w-64"
/>`,
            },
        },
    },
};

export const Multiple: Story = {
    render: function Multiple() {
        const [value, setValue] = useState([25, 50, 75]);
        const labels = ["Low", "Mid", "High"];

        return (
            <Slider
                value={value}
                onValueChange={setValue}
                max={100}
                step={1}
                minStepsBetweenValues={5}
                getAriaLabel={(index) => labels[index] ?? "Value"}
                className="w-64"
            />
        );
    },
    parameters: {
        docs: {
            description: {
                story: "One thumb per value.",
            },
            source: {
                code: `const [value, setValue] = useState([25, 50, 75]);
const labels = ["Low", "Mid", "High"];

<Slider
    value={value}
    onValueChange={setValue}
    max={100}
    step={1}
    minStepsBetweenValues={5}
    getAriaLabel={(index) => labels[index] ?? "Value"}
    className="w-64"
/>`,
            },
        },
    },
};

export const Vertical: Story = {
    render: function Vertical() {
        const [value, setValue] = useState([48]);

        return (
            <Slider
                aria-label="Volume"
                orientation="vertical"
                value={value}
                onValueChange={setValue}
                max={100}
                step={1}
                className="h-40"
            />
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [value, setValue] = useState([48]);

<Slider
    aria-label="Volume"
    orientation="vertical"
    value={value}
    onValueChange={setValue}
    max={100}
    step={1}
    className="h-40"
/>`,
            },
        },
    },
};

export const Controlled: Story = {
    render: function Controlled() {
        const [value, setValue] = useState([0.3, 0.7]);

        return (
            <div className="grid w-64 gap-3">
                <div className="flex items-center justify-between gap-4">
                    <Label id="temperature-label">Temperature</Label>
                    <span className="text-sm text-muted-foreground">
                        {value.join(", ")}
                    </span>
                </div>
                <Slider
                    aria-labelledby="temperature-label"
                    value={value}
                    onValueChange={setValue}
                    min={0}
                    max={1}
                    step={0.1}
                />
            </div>
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [value, setValue] = useState([0.3, 0.7]);

<div className="grid w-64 gap-3">
    <div className="flex items-center justify-between gap-4">
        <Label id="temperature-label">Temperature</Label>
        <span className="text-sm text-muted-foreground">
            {value.join(", ")}
        </span>
    </div>
    <Slider
        aria-labelledby="temperature-label"
        value={value}
        onValueChange={setValue}
        min={0}
        max={1}
        step={0.1}
    />
</div>`,
            },
        },
    },
};

export const Disabled: Story = {
    render: function Disabled() {
        const [value, setValue] = useState([48]);

        return (
            <Slider
                aria-label="Volume"
                value={value}
                onValueChange={setValue}
                max={100}
                step={1}
                className="w-64"
                disabled
            />
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [value, setValue] = useState([48]);

<Slider
    aria-label="Volume"
    value={value}
    onValueChange={setValue}
    max={100}
    step={1}
    className="w-64"
    disabled
/>`,
            },
        },
    },
};

export const Invalid: Story = {
    render: function Invalid() {
        const [value, setValue] = useState([48]);

        return (
            <Slider
                aria-label="Volume"
                value={value}
                onValueChange={setValue}
                max={100}
                step={1}
                className="w-64"
                aria-invalid
            />
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [value, setValue] = useState([48]);

<Slider
    aria-label="Volume"
    value={value}
    onValueChange={setValue}
    max={100}
    step={1}
    className="w-64"
    aria-invalid
/>`,
            },
        },
    },
};
