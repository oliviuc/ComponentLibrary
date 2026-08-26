import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const meta = {
    title: "Components/Card",
    component: Card,
    parameters: {
        docs: {
            description: {
                component: "A grouped block of related content.",
            },
        },
    },
    argTypes: {
        children: { table: { disable: true } },
    },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => (
        <Card {...args} className="flex w-80 flex-col gap-4">
            <div className="flex flex-col gap-1">
                <h2 className="text-base font-medium">Team</h2>
                <p className="text-muted-foreground">
                    Invite people to this workspace.
                </p>
            </div>
            <p>
                You have 3 seats left on the Pro plan. New members can join as
                soon as you send an invite. Invites expire after 7 days.
            </p>
            <div className="flex gap-2">
                <Button>Invite</Button>
                <Button variant="outline">Copy link</Button>
            </div>
        </Card>
    ),
    parameters: {
        docs: {
            source: {
                code: `<Card className="flex w-80 flex-col gap-4">
    <div className="flex flex-col gap-1">
        <h2 className="text-base font-medium">Team</h2>
        <p className="text-muted-foreground">
            Invite people to this workspace.
        </p>
    </div>
    <p>
        You have 3 seats left on the Pro plan. New members can join as
        soon as you send an invite. Invites expire after 7 days.
    </p>
    <div className="flex gap-2">
        <Button>Invite</Button>
        <Button variant="outline">Copy link</Button>
    </div>
</Card>`,
            },
        },
    },
};
