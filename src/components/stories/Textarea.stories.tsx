import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Textarea } from "@/components/ui/Textarea";

const meta = {
    title: "Components/Textarea",
    component: Textarea,
    parameters: {
        docs: {
            description: {
                component: "A multi-line text field.",
            },
        },
    },
    argTypes: {
        placeholder: {
            control: "text",
            description: "Hint shown when empty",
        },
        disabled: {
            control: "boolean",
            description: "Prevents typing",
        },
        rows: {
            control: { type: "number", min: 2, max: 12 },
            description: "Visible lines",
        },
    },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: function Default() {
        const [value, setValue] = useState("");

        return (
            <Textarea
                placeholder="Write a short note..."
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [value, setValue] = useState("");

<Textarea
    placeholder="Write a short note..."
    value={value}
    onChange={(event) => setValue(event.target.value)}
/>`,
            },
        },
    },
};

export const Disabled: Story = {
    render: function Disabled() {
        const [value, setValue] = useState("This note cannot be edited.");

        return (
            <Textarea
                placeholder="Write a short note..."
                value={value}
                onChange={(event) => setValue(event.target.value)}
                disabled
            />
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [value, setValue] = useState("This note cannot be edited.");

<Textarea
    placeholder="Write a short note..."
    value={value}
    onChange={(event) => setValue(event.target.value)}
    disabled
/>`,
            },
        },
    },
};

export const Invalid: Story = {
    render: function Invalid() {
        const [value, setValue] = useState("Too short");

        return (
            <Textarea
                placeholder="Write a short note..."
                value={value}
                onChange={(event) => setValue(event.target.value)}
                aria-invalid
            />
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [value, setValue] = useState("Too short");

<Textarea
    placeholder="Write a short note..."
    value={value}
    onChange={(event) => setValue(event.target.value)}
    aria-invalid
/>`,
            },
        },
    },
};
