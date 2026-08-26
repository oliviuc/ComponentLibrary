import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "@/components/ui/Input";

const meta = {
    title: "Components/Input",
    component: Input,
    parameters: {
        docs: {
            description: {
                component: "A single-line text field.",
            },
        },
    },
    argTypes: {
        type: {
            control: "select",
            options: ["text", "email", "password", "search", "number"],
            description: "Input type",
        },
        placeholder: {
            control: "text",
            description: "Hint shown when empty",
        },
        disabled: {
            control: "boolean",
            description: "Prevents typing",
        },
    },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: function Default() {
        const [value, setValue] = useState("");

        return (
            <Input
                type="email"
                placeholder="Email address"
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [value, setValue] = useState("");

<Input
    type="email"
    placeholder="Email address"
    value={value}
    onChange={(event) => setValue(event.target.value)}
/>`,
            },
        },
    },
};

export const Password: Story = {
    render: function Password() {
        const [value, setValue] = useState("");

        return (
            <Input
                type="password"
                placeholder="Password"
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [value, setValue] = useState("");

<Input
    type="password"
    placeholder="Password"
    value={value}
    onChange={(event) => setValue(event.target.value)}
/>`,
            },
        },
    },
};

export const Disabled: Story = {
    render: function Disabled() {
        const [value, setValue] = useState("you@example.com");

        return (
            <Input
                type="email"
                placeholder="Email address"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                disabled
            />
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [value, setValue] = useState("you@example.com");

<Input
    type="email"
    placeholder="Email address"
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
        const [value, setValue] = useState("not-an-email");

        return (
            <Input
                type="email"
                placeholder="Email address"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                aria-invalid
            />
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [value, setValue] = useState("not-an-email");

<Input
    type="email"
    placeholder="Email address"
    value={value}
    onChange={(event) => setValue(event.target.value)}
    aria-invalid
/>`,
            },
        },
    },
};
