import type { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/components/ui/Button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/Drawer";

const meta = {
    title: "Components/Drawer",
    component: Drawer,
    parameters: {
        docs: {
            description: {
                component: "A panel that slides in from the edge.",
            },
        },
    },
    argTypes: {
        direction: {
            control: "select",
            options: ["bottom", "top", "left", "right"],
            description: "Edge it slides in from",
        },
        children: { table: { disable: true } },
    },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

function DrawerExample(
    args: ComponentProps<typeof Drawer> & { trigger: string },
) {
    const { trigger, ...drawerArgs } = args;
    return (
        <Drawer {...drawerArgs}>
            <DrawerTrigger asChild>
                <Button>{trigger}</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Move goal</DrawerTitle>
                    <DrawerDescription>
                        Set your daily activity goal.
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

const drawerUsage = (
    trigger: string,
    direction?: "bottom" | "right" | "left",
) => `<Drawer${direction ? ` direction="${direction}"` : ""}>
    <DrawerTrigger asChild>
        <Button>${trigger}</Button>
    </DrawerTrigger>
    <DrawerContent>
        <DrawerHeader>
            <DrawerTitle>Move goal</DrawerTitle>
            <DrawerDescription>
                Set your daily activity goal.
            </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
            </DrawerClose>
        </DrawerFooter>
    </DrawerContent>
</Drawer>`;

export const Default: Story = {
    args: { direction: "bottom" },
    render: (args) => <DrawerExample {...args} trigger="Open drawer" />,
    parameters: {
        docs: {
            source: { code: drawerUsage("Open drawer") },
        },
    },
};

export const Right: Story = {
    args: { direction: "right" },
    render: (args) => <DrawerExample {...args} trigger="Open from right" />,
    parameters: {
        docs: {
            source: { code: drawerUsage("Open from right", "right") },
        },
    },
};

export const Left: Story = {
    args: { direction: "left" },
    render: (args) => <DrawerExample {...args} trigger="Open from left" />,
    parameters: {
        docs: {
            source: { code: drawerUsage("Open from left", "left") },
        },
    },
};
