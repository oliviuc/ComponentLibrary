import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { Slider } from "./Slider";

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
    args: {
        defaultValue: [48],
        max: 100,
        step: 1,
        onValueChange: fn(),
        className: "w-64",
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
        defaultValue: { control: false },
        className: { table: { disable: true } },
    },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Range: Story = {
    args: { defaultValue: [20, 80] },
    parameters: {
        docs: {
            description: {
                story: "Two thumbs to pick a min and max.",
            },
        },
    },
};

export const Disabled: Story = {
    args: { disabled: true },
};
