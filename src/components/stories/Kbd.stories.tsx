import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/components/ui/Button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/InputGroup";
import { Kbd, KbdGroup } from "@/components/ui/Kbd";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/Tooltip";

const meta = {
    title: "Components/Kbd",
    component: Kbd,
    parameters: {
        docs: {
            description: {
                component:
                    "A keyboard key. Spell symbols out for screen readers.",
            },
        },
    },
    argTypes: {
        children: { table: { disable: true } },
        className: { table: { disable: true } },
    },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <Kbd>Ctrl</Kbd>,
    parameters: {
        docs: { source: { code: `<Kbd>Ctrl</Kbd>` } },
    },
};

export const Group: Story = {
    render: () => (
        <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>K</Kbd>
        </KbdGroup>
    ),
    parameters: {
        docs: {
            source: {
                code: `<KbdGroup>
    <Kbd>Ctrl</Kbd>
    <Kbd>K</Kbd>
</KbdGroup>`,
            },
        },
    },
};

export const InTooltip: Story = {
    render: () => (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="outline">Save</Button>
            </TooltipTrigger>
            <TooltipContent>
                Save
                <KbdGroup>
                    <Kbd>
                        <span aria-hidden="true">⌘</span>
                        <span className="sr-only">Command</span>
                    </Kbd>
                    <Kbd>S</Kbd>
                </KbdGroup>
            </TooltipContent>
        </Tooltip>
    ),
    parameters: {
        docs: {
            source: {
                code: `<Tooltip>
    <TooltipTrigger asChild>
        <Button variant="outline">Save</Button>
    </TooltipTrigger>
    <TooltipContent>
        Save
        <KbdGroup>
            <Kbd>
                <span aria-hidden="true">⌘</span>
                <span className="sr-only">Command</span>
            </Kbd>
            <Kbd>S</Kbd>
        </KbdGroup>
    </TooltipContent>
</Tooltip>`,
            },
        },
    },
};

export const InButton: Story = {
    render: () => (
        <Button variant="outline">
            Search
            <KbdGroup>
                <Kbd>Ctrl</Kbd>
                <Kbd>K</Kbd>
            </KbdGroup>
        </Button>
    ),
    parameters: {
        docs: {
            source: {
                code: `<Button variant="outline">
    Search
    <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>K</Kbd>
    </KbdGroup>
</Button>`,
            },
        },
    },
};

export const InInputGroup: Story = {
    render: function InInputGroup() {
        const [value, setValue] = useState("");

        return (
            <InputGroup className="w-72">
                <InputGroupInput
                    aria-label="Search"
                    placeholder="Search..."
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                />
                <InputGroupAddon align="inline-end">
                    <Kbd>Ctrl K</Kbd>
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
        aria-label="Search"
        placeholder="Search..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
    />
    <InputGroupAddon align="inline-end">
        <Kbd>Ctrl K</Kbd>
    </InputGroupAddon>
</InputGroup>`,
            },
        },
    },
};

export const Symbols: Story = {
    render: () => (
        <KbdGroup>
            <Kbd>
                <span aria-hidden="true">⌘</span>
                <span className="sr-only">Command</span>
            </Kbd>
            <Kbd>
                <span aria-hidden="true">⇧</span>
                <span className="sr-only">Shift</span>
            </Kbd>
            <Kbd>P</Kbd>
        </KbdGroup>
    ),
    parameters: {
        docs: {
            source: {
                code: `<KbdGroup>
    <Kbd>
        <span aria-hidden="true">⌘</span>
        <span className="sr-only">Command</span>
    </Kbd>
    <Kbd>
        <span aria-hidden="true">⇧</span>
        <span className="sr-only">Shift</span>
    </Kbd>
    <Kbd>P</Kbd>
</KbdGroup>`,
            },
        },
    },
};
