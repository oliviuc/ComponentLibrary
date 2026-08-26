import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchIcon } from "lucide-react";

import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/InputGroup";

const meta = {
    title: "Components/InputGroup",
    component: InputGroup,
    parameters: {
        docs: {
            description: {
                component: "An input with addons, like a prefix or button.",
            },
        },
    },
    argTypes: {
        children: { table: { disable: true } },
    },
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => (
        <InputGroup className="w-72" {...args}>
            <InputGroupAddon>
                <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search..." />
        </InputGroup>
    ),
};

export const WithText: Story = {
    render: (args) => (
        <InputGroup className="w-72" {...args}>
            <InputGroupInput placeholder="site" />
            <InputGroupAddon align="inline-end">
                <InputGroupText>.com</InputGroupText>
            </InputGroupAddon>
        </InputGroup>
    ),
    parameters: {
        docs: {
            description: {
                story: "Static text can sit before or after the field.",
            },
        },
    },
};

export const WithButton: Story = {
    render: (args) => (
        <InputGroup className="w-72" {...args}>
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon align="inline-end">
                <InputGroupButton>Go</InputGroupButton>
            </InputGroupAddon>
        </InputGroup>
    ),
};

export const Textarea: Story = {
    render: (args) => (
        <InputGroup className="w-72" {...args}>
            <InputGroupTextarea placeholder="Write a short note..." />
        </InputGroup>
    ),
};

export const Invalid: Story = {
    render: (args) => (
        <InputGroup className="w-72" {...args}>
            <InputGroupAddon>
                <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput
                aria-invalid
                defaultValue="???"
                placeholder="Search..."
            />
        </InputGroup>
    ),
};
