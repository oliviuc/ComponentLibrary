import type { Meta, StoryObj } from "@storybook/react-vite";

import { Skeleton } from "@/components/ui/Skeleton";

const meta = {
    title: "Components/Skeleton",
    component: Skeleton,
    parameters: {
        docs: {
            description: {
                component: "A placeholder shown while content loads.",
            },
        },
    },
    argTypes: {
        className: {
            control: "text",
            description: "Size and shape",
        },
        children: { table: { disable: true } },
    },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        className: "h-4 w-48",
    },
};

export const Circle: Story = {
    args: {
        className: "size-10 rounded-full",
    },
};

export const Card: Story = {
    render: () => (
        <div className="flex w-72 items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="grid flex-1 gap-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-full" />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Stack a few skeletons to sketch a layout.",
            },
        },
    },
};
