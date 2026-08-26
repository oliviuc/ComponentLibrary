import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/components/ui/Button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/Tooltip";

const meta = {
    title: "Components/Tooltip",
    component: Tooltip,
    parameters: {
        docs: {
            description: {
                component: "Short hint on hover or focus.",
            },
        },
    },
    argTypes: {
        children: { table: { disable: true } },
    },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

const tooltipUsage = `<Tooltip>
    <TooltipTrigger asChild>
        <Button variant="outline">Hover</Button>
    </TooltipTrigger>
    <TooltipContent>Add to library</TooltipContent>
</Tooltip>`;

export const Default: Story = {
    render: (args) => (
        <Tooltip {...args}>
            <TooltipTrigger asChild>
                <Button variant="outline">Hover</Button>
            </TooltipTrigger>
            <TooltipContent>Add to library</TooltipContent>
        </Tooltip>
    ),
    parameters: {
        docs: { source: { code: tooltipUsage } },
    },
};

export const Open: Story = {
    args: { defaultOpen: true },
    render: (args) => (
        <Tooltip {...args}>
            <TooltipTrigger asChild>
                <Button variant="outline">Hover</Button>
            </TooltipTrigger>
            <TooltipContent>Add to library</TooltipContent>
        </Tooltip>
    ),
    parameters: {
        docs: {
            description: {
                story: "Shown without waiting for hover.",
            },
            source: {
                code: `<Tooltip defaultOpen>
    <TooltipTrigger asChild>
        <Button variant="outline">Hover</Button>
    </TooltipTrigger>
    <TooltipContent>Add to library</TooltipContent>
</Tooltip>`,
            },
        },
    },
};
