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
    args: {
        placeholder: "Write a short note...",
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
    parameters: {
        docs: {
            source: {
                code: `<Textarea placeholder="Write a short note..." />`,
            },
        },
    },
};

export const Disabled: Story = {
    args: { disabled: true, defaultValue: "This note cannot be edited." },
    parameters: {
        docs: {
            source: {
                code: `<Textarea defaultValue="This note cannot be edited." disabled />`,
            },
        },
    },
};

export const Invalid: Story = {
    args: {
        "aria-invalid": true,
        defaultValue: "Too short",
    },
    parameters: {
        docs: {
            source: {
                code: `<Textarea defaultValue="Too short" aria-invalid />`,
            },
        },
    },
};
