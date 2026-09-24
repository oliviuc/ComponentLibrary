import type { Meta, StoryObj } from "@storybook/react-vite";

import { Separator } from "@/components/ui/Separator";

const meta = {
    title: "Components/Separator",
    component: Separator,
    parameters: {
        docs: {
            description: {
                component: "A line that divides content.",
            },
        },
    },
    argTypes: {
        orientation: {
            control: "select",
            options: ["horizontal", "vertical"],
            description: "Direction of the line",
        },
        className: { table: { disable: true } },
    },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <div className="w-72">
            <p className="text-sm">A short note above the line.</p>
            <Separator className="my-4" />
            <p className="text-sm text-muted-foreground">
                And the rest of the content below it.
            </p>
        </div>
    ),
    parameters: {
        docs: {
            source: {
                code: `<div className="w-72">
    <p className="text-sm">A short note above the line.</p>
    <Separator className="my-4" />
    <p className="text-sm text-muted-foreground">
        And the rest of the content below it.
    </p>
</div>`,
            },
        },
    },
};

export const Vertical: Story = {
    render: () => (
        <div className="flex h-5 items-center gap-4 text-sm">
            <span>Blog</span>
            <Separator orientation="vertical" />
            <span>Docs</span>
            <Separator orientation="vertical" />
            <span>Source</span>
        </div>
    ),
    parameters: {
        docs: {
            source: {
                code: `<div className="flex h-5 items-center gap-4 text-sm">
    <span>Blog</span>
    <Separator orientation="vertical" />
    <span>Docs</span>
    <Separator orientation="vertical" />
    <span>Source</span>
</div>`,
            },
        },
    },
};

export const InAList: Story = {
    render: () => (
        <div className="w-64 text-sm">
            <div className="py-2">Profile</div>
            <Separator />
            <div className="py-2">Billing</div>
            <Separator />
            <div className="py-2">Notifications</div>
        </div>
    ),
    parameters: {
        docs: {
            source: {
                code: `<div className="w-64 text-sm">
    <div className="py-2">Profile</div>
    <Separator />
    <div className="py-2">Billing</div>
    <Separator />
    <div className="py-2">Notifications</div>
</div>`,
            },
        },
    },
};

export const CustomColor: Story = {
    render: () => <Separator className="w-64 bg-primary" />,
    parameters: {
        docs: {
            description: {
                story: "Color the line with a background class.",
            },
            source: {
                code: `<Separator className="w-64 bg-primary" />`,
            },
        },
    },
};
