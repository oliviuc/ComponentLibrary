import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/components/ui/Button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";

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
        size: {
            control: "select",
            options: ["default", "sm"],
            description: "Padding and title size",
        },
        children: { table: { disable: true } },
    },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => (
        <Card className="w-72" {...args}>
            <CardHeader>
                <CardTitle>Team</CardTitle>
                <CardDescription>
                    Invite people to this workspace.
                </CardDescription>
            </CardHeader>
            <CardContent>You have 3 seats left.</CardContent>
            <CardFooter>
                <Button>Invite</Button>
            </CardFooter>
        </Card>
    ),
};

export const Small: Story = {
    args: { size: "sm" },
    render: (args) => (
        <Card className="w-72" {...args}>
            <CardHeader>
                <CardTitle>Team</CardTitle>
                <CardDescription>
                    Invite people to this workspace.
                </CardDescription>
            </CardHeader>
            <CardContent>You have 3 seats left.</CardContent>
        </Card>
    ),
};

export const WithAction: Story = {
    render: (args) => (
        <Card className="w-72" {...args}>
            <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>You have 2 unread messages.</CardDescription>
                <CardAction>
                    <Button variant="outline">Mark all</Button>
                </CardAction>
            </CardHeader>
            <CardContent>New replies from Alex and Sam.</CardContent>
        </Card>
    ),
    parameters: {
        docs: {
            description: {
                story: "An action can sit in the header beside the title.",
            },
        },
    },
};
