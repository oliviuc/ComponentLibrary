import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/components/ui/Button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/Dialog";

const meta = {
    title: "Components/Dialog",
    component: Dialog,
    parameters: {
        docs: {
            description: {
                component: "A modal for focused tasks.",
            },
        },
    },
    argTypes: {
        children: { table: { disable: true } },
    },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => (
        <Dialog {...args}>
            <DialogTrigger asChild>
                <Button>Open dialog</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make a change, then save when you are done.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter showCloseButton>
                    <Button>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
};
