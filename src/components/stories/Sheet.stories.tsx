import type { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/components/ui/Button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/Sheet";

const meta = {
    title: "Components/Sheet",
    component: Sheet,
    parameters: {
        docs: {
            description: {
                component: "A panel that slides over the page.",
            },
        },
    },
    argTypes: {
        children: { table: { disable: true } },
    },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

function SheetExample({
    trigger,
    side,
}: {
    trigger: string;
    side?: ComponentProps<typeof SheetContent>["side"];
}) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button>{trigger}</Button>
            </SheetTrigger>
            <SheetContent side={side}>
                <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>
                        Make a change, then save when you are done.
                    </SheetDescription>
                </SheetHeader>
                <SheetFooter>
                    <Button>Save</Button>
                    <SheetClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

const sheetUsage = (trigger: string, side?: string) => `<Sheet>
    <SheetTrigger asChild>
        <Button>${trigger}</Button>
    </SheetTrigger>
    <SheetContent${side ? ` side="${side}"` : ""}>
        <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
                Make a change, then save when you are done.
            </SheetDescription>
        </SheetHeader>
        <SheetFooter>
            <Button>Save</Button>
            <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
            </SheetClose>
        </SheetFooter>
    </SheetContent>
</Sheet>`;

export const Default: Story = {
    render: () => <SheetExample trigger="Open sheet" />,
    parameters: {
        docs: {
            source: { code: sheetUsage("Open sheet") },
        },
    },
};

export const Left: Story = {
    render: () => <SheetExample trigger="Open from left" side="left" />,
    parameters: {
        docs: {
            source: { code: sheetUsage("Open from left", "left") },
        },
    },
};

export const Top: Story = {
    render: () => <SheetExample trigger="Open from top" side="top" />,
    parameters: {
        docs: {
            source: { code: sheetUsage("Open from top", "top") },
        },
    },
};

export const Bottom: Story = {
    render: () => <SheetExample trigger="Open from bottom" side="bottom" />,
    parameters: {
        docs: {
            source: { code: sheetUsage("Open from bottom", "bottom") },
        },
    },
};
