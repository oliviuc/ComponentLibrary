import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/components/ui/Button";
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/Popover";

const meta = {
    title: "Components/Popover",
    component: Popover,
    parameters: {
        docs: {
            description: {
                component: "A small panel anchored to a control.",
            },
        },
    },
    argTypes: {
        children: { table: { disable: true } },
    },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

const popoverUsage = `<Popover>
    <PopoverTrigger asChild>
        <Button variant="outline">Open</Button>
    </PopoverTrigger>
    <PopoverContent>
        <PopoverHeader>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>
                Set the width and height for this layer.
            </PopoverDescription>
        </PopoverHeader>
    </PopoverContent>
</Popover>`;

export const Default: Story = {
    render: (args) => (
        <Popover {...args}>
            <PopoverTrigger asChild>
                <Button variant="outline">Open</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverHeader>
                    <PopoverTitle>Dimensions</PopoverTitle>
                    <PopoverDescription>
                        Set the width and height for this layer.
                    </PopoverDescription>
                </PopoverHeader>
            </PopoverContent>
        </Popover>
    ),
    parameters: {
        docs: { source: { code: popoverUsage } },
    },
};

export const Open: Story = {
    args: { defaultOpen: true },
    render: (args) => (
        <Popover {...args}>
            <PopoverTrigger asChild>
                <Button variant="outline">Open</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverHeader>
                    <PopoverTitle>Dimensions</PopoverTitle>
                    <PopoverDescription>
                        Set the width and height for this layer.
                    </PopoverDescription>
                </PopoverHeader>
            </PopoverContent>
        </Popover>
    ),
    parameters: {
        docs: {
            description: {
                story: "Shown without waiting for a click.",
            },
            source: {
                code: `<Popover defaultOpen>
    <PopoverTrigger asChild>
        <Button variant="outline">Open</Button>
    </PopoverTrigger>
    <PopoverContent>
        <PopoverHeader>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>
                Set the width and height for this layer.
            </PopoverDescription>
        </PopoverHeader>
    </PopoverContent>
</Popover>`,
            },
        },
    },
};
