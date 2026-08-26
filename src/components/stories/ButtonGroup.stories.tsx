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
        <ButtonGroup {...args}>
            <Button variant="outline">
                <BoldIcon />
            </Button>
            <Button variant="outline">
                <ItalicIcon />
            </Button>
            <Button variant="outline">
                <AlignLeftIcon />
            </Button>
        </ButtonGroup>
    ),
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
        },
    },
};
