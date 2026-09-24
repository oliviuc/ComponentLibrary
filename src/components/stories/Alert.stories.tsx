import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircleAlertIcon, InfoIcon } from "lucide-react";

import {
    Alert,
    AlertAction,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";

const meta = {
    title: "Components/Alert",
    component: Alert,
    parameters: {
        docs: {
            description: {
                component: "A callout for user attention.",
            },
        },
    },
    args: {
        className: "w-96",
    },
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "destructive"],
            description: "Visual style",
        },
        children: { table: { disable: true } },
        className: { table: { disable: true } },
    },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => (
        <Alert {...args}>
            <InfoIcon />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
                You can add components to your app using the CLI.
            </AlertDescription>
        </Alert>
    ),
    parameters: {
        docs: {
            source: {
                code: `<Alert className="w-96">
    <InfoIcon />
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
        You can add components to your app using the CLI.
    </AlertDescription>
</Alert>`,
            },
        },
    },
};

export const Destructive: Story = {
    args: { variant: "destructive" },
    render: (args) => (
        <Alert {...args}>
            <CircleAlertIcon />
            <AlertTitle>Something went wrong!</AlertTitle>
            <AlertDescription>
                Your session has expired. Please log in again.
            </AlertDescription>
        </Alert>
    ),
    parameters: {
        docs: {
            description: {
                story: "Use the destructive variant for errors.",
            },
            source: {
                code: `<Alert variant="destructive" className="w-96">
    <CircleAlertIcon />
    <AlertTitle>Something went wrong!</AlertTitle>
    <AlertDescription>
        Your session has expired. Please log in again.
    </AlertDescription>
</Alert>`,
            },
        },
    },
};

export const Action: Story = {
    render: (args) => (
        <Alert {...args}>
            <InfoIcon />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
                You can add components to your app using the CLI.
            </AlertDescription>
            <AlertAction>
                <Button variant="outline">Enable</Button>
            </AlertAction>
        </Alert>
    ),
    parameters: {
        docs: {
            description: {
                story: "Place a button in the corner with AlertAction.",
            },
            source: {
                code: `<Alert className="w-96">
    <InfoIcon />
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
        You can add components to your app using the CLI.
    </AlertDescription>
    <AlertAction>
        <Button variant="outline">Enable</Button>
    </AlertAction>
</Alert>`,
            },
        },
    },
};
