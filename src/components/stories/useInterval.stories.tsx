import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Switch } from "@/components/ui/Switch";
import { useInterval } from "@/hooks/useInterval";

function UseIntervalDemo({ delay }: { delay: number | null }) {
    const [count, setCount] = useState(0);
    const [running, setRunning] = useState(delay !== null);

    useInterval(
        () => {
            setCount((current) => current + 1);
        },
        running ? delay : null,
    );

    return (
        <div className="grid w-80 gap-4">
            <p className="text-4xl font-medium tabular-nums">{count}</p>
            <label className="flex items-center gap-2 text-sm">
                Running
                <Switch
                    checked={running}
                    onCheckedChange={setRunning}
                    disabled={delay === null}
                />
            </label>
        </div>
    );
}

const meta = {
    title: "Hooks/useInterval",
    component: UseIntervalDemo,
    parameters: {
        docs: {
            description: {
                component:
                    "Calls a function repeatedly. Always uses the latest callback without resetting the timer. Pass null to pause. Delay is in milliseconds.",
            },
        },
    },
    args: {
        delay: 1000,
    },
    argTypes: {
        delay: {
            control: { type: "number", min: 0, step: 50 },
            description: "Repeat every n milliseconds. Null pauses.",
        },
    },
} satisfies Meta<typeof UseIntervalDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: `const [count, setCount] = useState(0);
const [running, setRunning] = useState(true);

useInterval(() => {
    setCount((current) => current + 1);
}, running ? 1000 : null);

<div className="grid w-80 gap-4">
    <p className="text-4xl font-medium tabular-nums">{count}</p>
    <label className="flex items-center gap-2 text-sm">
        Running
        <Switch checked={running} onCheckedChange={setRunning} />
    </label>
</div>`,
            },
        },
    },
};

export const Fast: Story = {
    args: { delay: 200 },
    parameters: {
        docs: {
            description: {
                story: "Tick every 200 milliseconds.",
            },
            source: {
                code: `const [count, setCount] = useState(0);
const [running, setRunning] = useState(true);

useInterval(() => {
    setCount((current) => current + 1);
}, running ? 200 : null);

<div className="grid w-80 gap-4">
    <p className="text-4xl font-medium tabular-nums">{count}</p>
    <label className="flex items-center gap-2 text-sm">
        Running
        <Switch checked={running} onCheckedChange={setRunning} />
    </label>
</div>`,
            },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await waitFor(
            () => {
                expect(canvas.getByText("1")).toBeTruthy();
            },
            { timeout: 1500 },
        );
    },
};

export const Paused: Story = {
    args: { delay: null },
    render: function Paused() {
        const [count, setCount] = useState(0);

        useInterval(() => {
            setCount((current) => current + 1);
        }, null);

        return <p className="text-4xl font-medium tabular-nums">{count}</p>;
    },
    parameters: {
        docs: {
            description: {
                story: "Pass null as the delay to pause. Changing it back to a number starts the interval.",
            },
            source: {
                code: `const [count, setCount] = useState(0);

useInterval(() => {
    setCount((current) => current + 1);
}, null);

<p className="text-4xl font-medium tabular-nums">{count}</p>`,
            },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        expect(canvas.getByText("0")).toBeTruthy();
        await new Promise((resolve) => {
            setTimeout(resolve, 400);
        });
        expect(canvas.getByText("0")).toBeTruthy();
    },
};

export const LatestCallback: Story = {
    args: { delay: 500 },
    render: function LatestCallback({ delay }) {
        const [count, setCount] = useState(0);
        const [step, setStep] = useState(1);

        useInterval(() => {
            setCount((current) => current + step);
        }, delay);

        return (
            <div className="grid w-80 gap-4">
                <p className="text-4xl font-medium tabular-nums">{count}</p>
                <div className="grid gap-2">
                    <Label htmlFor="use-interval-step">Step</Label>
                    <Input
                        id="use-interval-step"
                        type="number"
                        value={String(step)}
                        onChange={(event) =>
                            setStep(Number(event.target.value) || 0)
                        }
                    />
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Change the step while it is running. The timer does not restart, and the next tick uses the new value.",
            },
            source: {
                code: `const [count, setCount] = useState(0);
const [step, setStep] = useState(1);

useInterval(() => {
    setCount((current) => current + step);
}, 500);

<div className="grid w-80 gap-4">
    <p className="text-4xl font-medium tabular-nums">{count}</p>
    <div className="grid gap-2">
        <Label htmlFor="use-interval-step">Step</Label>
        <Input
            id="use-interval-step"
            type="number"
            value={String(step)}
            onChange={(event) => setStep(Number(event.target.value) || 0)}
        />
    </div>
</div>`,
            },
        },
    },
};
