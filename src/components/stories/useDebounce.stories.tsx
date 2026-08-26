import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useDebounce } from "@/hooks/useDebounce";

function UseDebounceDemo({ delay }: { delay: number }) {
    const [value, setValue] = useState("");
    const debouncedValue = useDebounce(value, delay);

    return (
        <div className="grid w-80 gap-4">
            <div className="grid gap-2">
                <Label htmlFor="use-debounce-input">Type something</Label>
                <Input
                    id="use-debounce-input"
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    placeholder="Search"
                />
            </div>
            <dl className="grid gap-1 text-sm">
                <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Immediate</dt>
                    <dd>{value || "—"}</dd>
                </div>
                <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Debounced</dt>
                    <dd>{debouncedValue || "—"}</dd>
                </div>
            </dl>
        </div>
    );
}

const meta = {
    title: "Hooks/useDebounce",
    component: UseDebounceDemo,
    parameters: {
        docs: {
            description: {
                component:
                    "Returns a value after it has stopped changing. Delay is in milliseconds.",
            },
        },
    },
    args: {
        delay: 300,
    },
    argTypes: {
        delay: {
            control: { type: "number", min: 0, step: 50 },
            description: "Wait time in milliseconds",
        },
    },
} satisfies Meta<typeof UseDebounceDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Slow: Story = {
    args: { delay: 1000 },
    parameters: {
        docs: {
            description: {
                story: "Wait a full second after the last change.",
            },
        },
    },
};
