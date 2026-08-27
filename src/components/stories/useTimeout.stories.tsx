import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";

import { Badge } from "@/components/ui/Badge";
import { useTimeout } from "@/hooks/useTimeout";

function UseTimeoutDemo({ delay }: { delay: number | null }) {
    const [status, setStatus] = useState<"waiting" | "fired">("waiting");

    useTimeout(() => {
        setStatus("fired");
    }, delay);

    return (
        <Badge variant={status === "fired" ? "default" : "secondary"}>
            {status === "waiting" ? "Waiting" : "Fired"}
        </Badge>
    );
}

const meta = {
    title: "Hooks/useTimeout",
    component: UseTimeoutDemo,
    parameters: {
        docs: {
            description: {
                component:
                    "Calls a function once after a delay. Always uses the latest callback without resetting the timer. Pass null to cancel. Delay is in milliseconds.",
            },
        },
    },
    args: {
        delay: 1000,
    },
    argTypes: {
        delay: {
            control: { type: "number", min: 0, step: 50 },
            description: "Wait this many milliseconds. Null cancels.",
        },
    },
} satisfies Meta<typeof UseTimeoutDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: `const [status, setStatus] = useState("waiting");

useTimeout(() => {
    setStatus("fired");
}, 1000);

<Badge variant={status === "fired" ? "default" : "secondary"}>
    {status === "waiting" ? "Waiting" : "Fired"}
</Badge>`,
            },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await waitFor(
            () => {
                expect(canvas.getByText("Fired")).toBeTruthy();
            },
            { timeout: 2000 },
        );
    },
};

export const Slow: Story = {
    args: { delay: 3000 },
    parameters: {
        docs: {
            description: {
                story: "Wait three seconds, then fire once.",
            },
            source: {
                code: `const [status, setStatus] = useState("waiting");

useTimeout(() => {
    setStatus("fired");
}, 3000);

<Badge variant={status === "fired" ? "default" : "secondary"}>
    {status === "waiting" ? "Waiting" : "Fired"}
</Badge>`,
            },
        },
    },
};

export const Cancelled: Story = {
    args: { delay: null },
    render: function Cancelled() {
        const [status, setStatus] = useState<"waiting" | "fired">("waiting");

        useTimeout(() => {
            setStatus("fired");
        }, null);

        return (
            <Badge variant="secondary">
                {status === "waiting" ? "Waiting" : "Fired"}
            </Badge>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Pass null as the delay to cancel. Changing it back to a number starts the timeout.",
            },
            source: {
                code: `const [status, setStatus] = useState("waiting");

useTimeout(() => {
    setStatus("fired");
}, null);

<Badge variant="secondary">
    {status === "waiting" ? "Waiting" : "Fired"}
</Badge>`,
            },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        expect(canvas.getByText("Waiting")).toBeTruthy();
        await new Promise((resolve) => {
            setTimeout(resolve, 400);
        });
        expect(canvas.getByText("Waiting")).toBeTruthy();
    },
};
