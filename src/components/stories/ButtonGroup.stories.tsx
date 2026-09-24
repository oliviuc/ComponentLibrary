import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlignLeftIcon, BoldIcon, ItalicIcon, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
    ButtonGroup,
    ButtonGroupSeparator,
    ButtonGroupText,
} from "@/components/ui/ButtonGroup";

const meta = {
    title: "Components/ButtonGroup",
    component: ButtonGroup,
    parameters: {
        docs: {
            description: {
                component: "Join related buttons into one control.",
            },
        },
    },
    argTypes: {
        orientation: {
            control: "select",
            options: ["horizontal", "vertical"],
            description: "Layout direction",
        },
        children: { table: { disable: true } },
    },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => (
        <ButtonGroup aria-label="Text formatting" {...args}>
            <Button variant="outline" aria-label="Bold">
                <BoldIcon />
            </Button>
            <Button variant="outline" aria-label="Italic">
                <ItalicIcon />
            </Button>
            <Button variant="outline" aria-label="Align left">
                <AlignLeftIcon />
            </Button>
        </ButtonGroup>
    ),
    parameters: {
        docs: {
            source: {
                code: `<ButtonGroup aria-label="Text formatting">
    <Button variant="outline" aria-label="Bold">
        <BoldIcon />
    </Button>
    <Button variant="outline" aria-label="Italic">
        <ItalicIcon />
    </Button>
    <Button variant="outline" aria-label="Align left">
        <AlignLeftIcon />
    </Button>
</ButtonGroup>`,
            },
        },
    },
};

export const Vertical: Story = {
    args: { orientation: "vertical" },
    render: (args) => (
        <ButtonGroup {...args}>
            <Button variant="outline">Left</Button>
            <Button variant="outline">Center</Button>
            <Button variant="outline">Right</Button>
        </ButtonGroup>
    ),
    parameters: {
        docs: {
            source: {
                code: `<ButtonGroup orientation="vertical">
    <Button variant="outline">Left</Button>
    <Button variant="outline">Center</Button>
    <Button variant="outline">Right</Button>
</ButtonGroup>`,
            },
        },
    },
};

export const WithText: Story = {
    render: (args) => (
        <ButtonGroup {...args}>
            <ButtonGroupText>
                <SearchIcon />
                Search
            </ButtonGroupText>
            <Button variant="outline">Go</Button>
        </ButtonGroup>
    ),
    parameters: {
        docs: {
            description: {
                story: "Static text can sit beside the buttons.",
            },
            source: {
                code: `<ButtonGroup>
    <ButtonGroupText>
        <SearchIcon />
        Search
    </ButtonGroupText>
    <Button variant="outline">Go</Button>
</ButtonGroup>`,
            },
        },
    },
};

export const WithSeparator: Story = {
    render: (args) => (
        <ButtonGroup {...args}>
            <Button variant="outline">Copy</Button>
            <ButtonGroupSeparator />
            <Button variant="outline">Paste</Button>
        </ButtonGroup>
    ),
    parameters: {
        docs: {
            description: {
                story: "A divider between actions that should stay grouped.",
            },
            source: {
                code: `<ButtonGroup>
    <Button variant="outline">Copy</Button>
    <ButtonGroupSeparator />
    <Button variant="outline">Paste</Button>
</ButtonGroup>`,
            },
        },
    },
};
