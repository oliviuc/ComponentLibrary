import type { Meta, StoryObj } from "@storybook/react-vite";

import { Spinner } from "@/components/ui/Spinner";

const meta = {
    title: "Utilities/Shimmer",
    parameters: {
        docs: {
            description: {
                component:
                    "A highlight that sweeps across text. Add the shimmer class. The band follows the text color, and reduced motion turns the sweep off.",
            },
        },
    },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <p className="shimmer text-sm text-muted-foreground">
            Generating response…
        </p>
    ),
    parameters: {
        docs: {
            source: {
                code: `<p className="shimmer text-sm text-muted-foreground">
    Generating response…
</p>`,
            },
        },
    },
};

export const Color: Story = {
    render: () => (
        <div className="grid gap-2 text-sm text-muted-foreground">
            <p className="shimmer shimmer-color-destructive">Thinking…</p>
            <p className="shimmer shimmer-color-destructive/60">
                Searching files…
            </p>
        </div>
    ),
    parameters: {
        docs: {
            source: {
                code: `<div className="grid gap-2 text-sm text-muted-foreground">
    <p className="shimmer shimmer-color-destructive">Thinking…</p>
    <p className="shimmer shimmer-color-destructive/60">Searching files…</p>
</div>`,
            },
        },
    },
};

export const Duration: Story = {
    render: () => (
        <p className="shimmer shimmer-duration-1000 text-sm text-muted-foreground">
            One second per sweep
        </p>
    ),
    parameters: {
        docs: {
            source: {
                code: `<p className="shimmer shimmer-duration-1000 text-sm text-muted-foreground">
    One second per sweep
</p>`,
            },
        },
    },
};

export const Spread: Story = {
    render: () => (
        <p className="shimmer shimmer-spread-24 text-sm text-muted-foreground">
            A wider band
        </p>
    ),
    parameters: {
        docs: {
            source: {
                code: `<p className="shimmer shimmer-spread-24 text-sm text-muted-foreground">
    A wider band
</p>`,
            },
        },
    },
};

export const Angle: Story = {
    render: () => (
        <p className="shimmer shimmer-angle-45 text-sm text-muted-foreground">
            A tilted band
        </p>
    ),
    parameters: {
        docs: {
            source: {
                code: `<p className="shimmer shimmer-angle-45 text-sm text-muted-foreground">
    A tilted band
</p>`,
            },
        },
    },
};

export const Once: Story = {
    render: () => (
        <p className="shimmer shimmer-once text-sm text-muted-foreground">
            Plays a single sweep
        </p>
    ),
    parameters: {
        docs: {
            source: {
                code: `<p className="shimmer shimmer-once text-sm text-muted-foreground">
    Plays a single sweep
</p>`,
            },
        },
    },
};

export const Reverse: Story = {
    render: () => (
        <p className="shimmer shimmer-reverse text-sm text-muted-foreground">
            Sweeps the other way
        </p>
    ),
    parameters: {
        docs: {
            source: {
                code: `<p className="shimmer shimmer-reverse text-sm text-muted-foreground">
    Sweeps the other way
</p>`,
            },
        },
    },
};

export const Off: Story = {
    render: () => (
        <p className="shimmer shimmer-none text-sm text-muted-foreground">
            The sweep is off
        </p>
    ),
    parameters: {
        docs: {
            source: {
                code: `<p className="shimmer shimmer-none text-sm text-muted-foreground">
    The sweep is off
</p>`,
            },
        },
    },
};

export const LiveStatus: Story = {
    render: () => (
        <p
            role="status"
            className="flex items-center gap-2 text-sm text-muted-foreground"
        >
            <Spinner aria-hidden className="text-muted-foreground" />
            <span className="shimmer">Generating response…</span>
        </p>
    ),
    parameters: {
        docs: {
            source: {
                code: `<p role="status" className="flex items-center gap-2 text-sm text-muted-foreground">
    <Spinner aria-hidden className="text-muted-foreground" />
    <span className="shimmer">Generating response…</span>
</p>`,
            },
        },
    },
};
