import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/InputGroup";
import { Spinner } from "@/components/ui/Spinner";

const meta = {
    title: "Components/Spinner",
    component: Spinner,
    parameters: {
        docs: {
            description: {
                component:
                    "A spinning indicator. Set the size and color with className. It announces Loading unless you hide it.",
            },
        },
    },
    argTypes: {
        className: { table: { disable: true } },
    },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <Spinner />,
    parameters: {
        docs: { source: { code: `<Spinner />` } },
    },
};

export const Sizes: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <Spinner className="size-3" />
            <Spinner />
            <Spinner className="size-6" />
            <Spinner className="size-8" />
        </div>
    ),
    parameters: {
        docs: {
            source: {
                code: `<div className="flex items-center gap-4">
    <Spinner className="size-3" />
    <Spinner />
    <Spinner className="size-6" />
    <Spinner className="size-8" />
</div>`,
            },
        },
    },
};

export const Colors: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <Spinner className="text-muted-foreground" />
            <Spinner className="text-primary" />
            <Spinner className="text-destructive" />
            <Spinner className="text-chart-2" />
        </div>
    ),
    parameters: {
        docs: {
            source: {
                code: `<div className="flex items-center gap-4">
    <Spinner className="text-muted-foreground" />
    <Spinner className="text-primary" />
    <Spinner className="text-destructive" />
    <Spinner className="text-chart-2" />
</div>`,
            },
        },
    },
};

export const InButton: Story = {
    render: () => (
        <Button>
            <Spinner aria-hidden />
            Saving...
        </Button>
    ),
    parameters: {
        docs: {
            description: {
                story: "Hide the spinner when the button text already says what is happening.",
            },
            source: {
                code: `<Button>
    <Spinner aria-hidden />
    Saving...
</Button>`,
            },
        },
    },
};

export const InBadge: Story = {
    render: () => (
        <Badge variant="secondary">
            <Spinner aria-hidden />
            Syncing
        </Badge>
    ),
    parameters: {
        docs: {
            source: {
                code: `<Badge variant="secondary">
    <Spinner aria-hidden />
    Syncing
</Badge>`,
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
                    <Spinner aria-label="Searching" />
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
        <Spinner aria-label="Searching" />
    </InputGroupAddon>
</InputGroup>`,
            },
        },
    },
};
