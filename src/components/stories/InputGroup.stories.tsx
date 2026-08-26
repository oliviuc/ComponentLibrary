import { useState } from "react";
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
    render: function Default() {
        const [value, setValue] = useState("");

        return (
            <InputGroup className="w-72">
                <InputGroupAddon>
                    <SearchIcon />
                </InputGroupAddon>
                <InputGroupInput
                    placeholder="Search..."
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                />
            </InputGroup>
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [value, setValue] = useState("");

<InputGroup className="w-72">
    <InputGroupAddon>
        <SearchIcon />
    </InputGroupAddon>
    <InputGroupInput
        placeholder="Search..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
    />
</InputGroup>`,
            },
        },
    },
};

export const WithText: Story = {
    render: function WithText() {
        const [value, setValue] = useState("");

        return (
            <InputGroup className="w-72">
                <InputGroupInput
                    placeholder="site"
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                />
                <InputGroupAddon align="inline-end">
                    <InputGroupText>.com</InputGroupText>
                </InputGroupAddon>
            </InputGroup>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Static text can sit before or after the field.",
            },
            source: {
                code: `const [value, setValue] = useState("");

<InputGroup className="w-72">
    <InputGroupInput
        placeholder="site"
        value={value}
        onChange={(event) => setValue(event.target.value)}
    />
    <InputGroupAddon align="inline-end">
        <InputGroupText>.com</InputGroupText>
    </InputGroupAddon>
</InputGroup>`,
            },
        },
    },
};

export const WithButton: Story = {
    render: function WithButton() {
        const [value, setValue] = useState("");

        return (
            <InputGroup className="w-72">
                <InputGroupInput
                    placeholder="Search..."
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                />
                <InputGroupAddon align="inline-end">
                    <InputGroupButton>Go</InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [value, setValue] = useState("");

<InputGroup className="w-72">
    <InputGroupInput
        placeholder="Search..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
    />
    <InputGroupAddon align="inline-end">
        <InputGroupButton>Go</InputGroupButton>
    </InputGroupAddon>
</InputGroup>`,
            },
        },
    },
};

export const Textarea: Story = {
    render: function TextareaStory() {
        const [value, setValue] = useState("");

        return (
            <InputGroup className="w-72">
                <InputGroupTextarea
                    placeholder="Write a short note..."
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                />
            </InputGroup>
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [value, setValue] = useState("");

<InputGroup className="w-72">
    <InputGroupTextarea
        placeholder="Write a short note..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
    />
</InputGroup>`,
            },
        },
    },
};

export const Invalid: Story = {
    render: function Invalid() {
        const [value, setValue] = useState("???");

        return (
            <InputGroup className="w-72">
                <InputGroupAddon>
                    <SearchIcon />
                </InputGroupAddon>
                <InputGroupInput
                    aria-invalid
                    placeholder="Search..."
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                />
            </InputGroup>
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [value, setValue] = useState("???");

<InputGroup className="w-72">
    <InputGroupAddon>
        <SearchIcon />
    </InputGroupAddon>
    <InputGroupInput
        aria-invalid
        placeholder="Search..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
    />
</InputGroup>`,
            },
        },
    },
};
