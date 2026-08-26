import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Slider } from "@/components/ui/Slider";

const meta = {
    title: "Components/Slider",
    component: Slider,
    parameters: {
        docs: {
            description: {
                component: "Pick a value along a range.",
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
    className="w-64"
/>`,
            },
        },
    },
};

export const Disabled: Story = {
    render: function Disabled() {
        const [value, setValue] = useState([48]);

        return (
            <Slider
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
