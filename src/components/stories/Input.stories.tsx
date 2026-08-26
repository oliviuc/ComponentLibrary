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
    args: {
        placeholder: "Email address",
        type: "email",
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

export const Default: Story = {};

export const Password: Story = {
    args: {
        type: "password",
        placeholder: "Password",
    },
};

export const Disabled: Story = {
    args: { disabled: true, defaultValue: "you@example.com" },
};

export const Invalid: Story = {
    args: {
        "aria-invalid": true,
        defaultValue: "not-an-email",
    },
};
