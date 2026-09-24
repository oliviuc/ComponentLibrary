import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card } from "@/components/ui/Card";
import {
    Sparkline,
    SparklineArea,
    SparklineBar,
    SparklineBaseline,
    SparklineLine,
} from "@/components/ui/Sparkline";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/Table";

const revenue = [12, 18, 14, 22, 19, 28, 26];
const signups = [8, 11, 9, 16, 14, 12, 18];
const churn = [6, 5, 8, 4, 7, 3, 2];
const balance = [4, -2, 3, -5, 1, 6, -1];
const withGap = [12, 18, null, 22, 19, 28, 26];

const meta = {
    title: "Graphs/Sparkline",
    component: Sparkline,
    parameters: {
        docs: {
            description: {
                component:
                    "A tiny trend. Compose `SparklineLine`, `SparklineArea`, `SparklineBar`, and `SparklineBaseline`. With no children it draws a line. Color it with `text-*` on `className`.",
            },
        },
    },
    args: {
        data: revenue,
        className: "h-10 w-40",
    },
    argTypes: {
        data: {
            description: "Values from left to right. `null` opens a gap.",
        },
        className: {
            description: "Size and color. Use text-* for the series color.",
        },
        children: { table: { disable: true } },
    },
} satisfies Meta<typeof Sparkline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: `<Sparkline data={[12, 18, 14, 22, 19, 28, 26]} className="h-10 w-40" />`,
            },
        },
    },
};

export const Composed: Story = {
    render: () => (
        <Sparkline
            data={revenue}
            className="h-10 w-40 text-chart-2"
            aria-label="Revenue, last 7 days"
        >
            <SparklineArea curve="smooth" className="opacity-20" />
            <SparklineLine curve="smooth" />
        </Sparkline>
    ),
    parameters: {
        docs: {
            description: {
                story: "Stack an area and a line on one scale. `aria-label` makes the sparkline an image.",
            },
            source: {
                code: `const revenue = [12, 18, 14, 22, 19, 28, 26];

<Sparkline
    data={revenue}
    className="h-10 w-40 text-chart-2"
    aria-label="Revenue, last 7 days"
>
    <SparklineArea curve="smooth" className="opacity-20" />
    <SparklineLine curve="smooth" />
</Sparkline>`,
            },
        },
    },
};

export const Bars: Story = {
    render: () => (
        <Sparkline data={balance} min={-6} max={6} className="h-10 w-40">
            <SparklineBaseline />
            <SparklineBar negativeClassName="text-destructive" />
        </Sparkline>
    ),
    parameters: {
        docs: {
            description: {
                story: "Bars grow from zero. `negativeClassName` colors the ones below it. `SparklineBaseline` draws the zero line.",
            },
            source: {
                code: `const balance = [4, -2, 3, -5, 1, 6, -1];

<Sparkline data={balance} min={-6} max={6} className="h-10 w-40">
    <SparklineBaseline />
    <SparklineBar negativeClassName="text-destructive" />
</Sparkline>`,
            },
        },
    },
};

export const Gap: Story = {
    render: () => (
        <Sparkline data={withGap} className="h-10 w-40">
            <SparklineLine />
        </Sparkline>
    ),
    parameters: {
        docs: {
            description: {
                story: "`null` breaks the line so missing points stay missing.",
            },
            source: {
                code: `const withGap = [12, 18, null, 22, 19, 28, 26];

<Sparkline data={withGap} className="h-10 w-40">
    <SparklineLine />
</Sparkline>`,
            },
        },
    },
};

export const Curves: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Sparkline data={revenue} className="h-10 w-40">
                <SparklineLine />
            </Sparkline>
            <Sparkline data={revenue} className="h-10 w-40">
                <SparklineLine curve="smooth" />
            </Sparkline>
            <Sparkline data={revenue} className="h-10 w-40">
                <SparklineLine curve="step" />
            </Sparkline>
            <Sparkline data={revenue} className="h-10 w-40">
                <SparklineArea curve="smooth" />
            </Sparkline>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "`curve` is `linear`, `smooth`, or `step` on a line or an area.",
            },
            source: {
                code: `const revenue = [12, 18, 14, 22, 19, 28, 26];

<div className="flex flex-col gap-4">
    <Sparkline data={revenue} className="h-10 w-40">
        <SparklineLine />
    </Sparkline>
    <Sparkline data={revenue} className="h-10 w-40">
        <SparklineLine curve="smooth" />
    </Sparkline>
    <Sparkline data={revenue} className="h-10 w-40">
        <SparklineLine curve="step" />
    </Sparkline>
    <Sparkline data={revenue} className="h-10 w-40">
        <SparklineArea curve="smooth" />
    </Sparkline>
</div>`,
            },
        },
    },
};

export const Color: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Sparkline data={revenue} className="h-10 w-40" />
            <Sparkline data={revenue} className="h-10 w-40 text-primary" />
            <Sparkline data={revenue} className="h-10 w-40 text-destructive" />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Color comes from `className` via `currentColor`. The default is `text-chart-2`.",
            },
            source: {
                code: `const revenue = [12, 18, 14, 22, 19, 28, 26];

<div className="flex flex-col gap-4">
    <Sparkline data={revenue} className="h-10 w-40" />
    <Sparkline data={revenue} className="h-10 w-40 text-primary" />
    <Sparkline data={revenue} className="h-10 w-40 text-destructive" />
</div>`,
            },
        },
    },
};

export const MetricCards: Story = {
    render: () => (
        <div className="grid w-xl grid-cols-3 gap-4">
            <Card className="flex flex-col gap-3 p-4">
                <div className="flex flex-col gap-1">
                    <p className="text-muted-foreground">Revenue</p>
                    <p className="text-2xl font-medium">$24.8k</p>
                </div>
                <Sparkline data={revenue} className="h-12">
                    <SparklineArea />
                </Sparkline>
            </Card>
            <Card className="flex flex-col gap-3 p-4">
                <div className="flex flex-col gap-1">
                    <p className="text-muted-foreground">Signups</p>
                    <p className="text-2xl font-medium">1,284</p>
                </div>
                <Sparkline data={signups} className="h-12">
                    <SparklineLine />
                </Sparkline>
            </Card>
            <Card className="flex flex-col gap-3 p-4">
                <div className="flex flex-col gap-1">
                    <p className="text-muted-foreground">Churn</p>
                    <p className="text-2xl font-medium">2.1%</p>
                </div>
                <Sparkline data={churn} className="h-12 text-destructive">
                    <SparklineBar />
                </Sparkline>
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Drop a sparkline under a metric.",
            },
            source: {
                code: `const revenue = [12, 18, 14, 22, 19, 28, 26];
const signups = [8, 11, 9, 16, 14, 12, 18];
const churn = [6, 5, 8, 4, 7, 3, 2];

<div className="grid w-xl grid-cols-3 gap-4">
    <Card className="flex flex-col gap-3 p-4">
        <div className="flex flex-col gap-1">
            <p className="text-muted-foreground">Revenue</p>
            <p className="text-2xl font-medium">$24.8k</p>
        </div>
        <Sparkline data={revenue} className="h-12">
            <SparklineArea />
        </Sparkline>
    </Card>
    <Card className="flex flex-col gap-3 p-4">
        <div className="flex flex-col gap-1">
            <p className="text-muted-foreground">Signups</p>
            <p className="text-2xl font-medium">1,284</p>
        </div>
        <Sparkline data={signups} className="h-12">
            <SparklineLine />
        </Sparkline>
    </Card>
    <Card className="flex flex-col gap-3 p-4">
        <div className="flex flex-col gap-1">
            <p className="text-muted-foreground">Churn</p>
            <p className="text-2xl font-medium">2.1%</p>
        </div>
        <Sparkline data={churn} className="h-12 text-destructive">
            <SparklineBar />
        </Sparkline>
    </Card>
</div>`,
            },
        },
    },
};

export const InTable: Story = {
    render: () => (
        <Table className="w-96">
            <TableHeader>
                <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Sales</TableHead>
                    <TableHead className="w-32">Trend</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">Pro plan</TableCell>
                    <TableCell className="text-right">$12,480</TableCell>
                    <TableCell>
                        <Sparkline
                            data={revenue}
                            aria-label="Pro plan sales trend"
                            className="h-8 w-24"
                        />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">Teams</TableCell>
                    <TableCell className="text-right">$8,210</TableCell>
                    <TableCell>
                        <Sparkline
                            data={signups}
                            aria-label="Teams sales trend"
                            className="h-8 w-24"
                        />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">Starter</TableCell>
                    <TableCell className="text-right">$3,940</TableCell>
                    <TableCell>
                        <Sparkline
                            data={churn}
                            aria-label="Starter sales trend"
                            className="h-8 w-24 text-destructive"
                        />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    ),
    parameters: {
        docs: {
            description: {
                story: "A sparkline in a table cell.",
            },
            source: {
                code: `const revenue = [12, 18, 14, 22, 19, 28, 26];
const signups = [8, 11, 9, 16, 14, 12, 18];
const churn = [6, 5, 8, 4, 7, 3, 2];

<Table className="w-96">
    <TableHeader>
        <TableRow>
            <TableHead>Product</TableHead>
            <TableHead className="text-right">Sales</TableHead>
            <TableHead className="w-32">Trend</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        <TableRow>
            <TableCell className="font-medium">Pro plan</TableCell>
            <TableCell className="text-right">$12,480</TableCell>
            <TableCell>
                <Sparkline
                    data={revenue}
                    aria-label="Pro plan sales trend"
                    className="h-8 w-24"
                />
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell className="font-medium">Teams</TableCell>
            <TableCell className="text-right">$8,210</TableCell>
            <TableCell>
                <Sparkline
                    data={signups}
                    aria-label="Teams sales trend"
                    className="h-8 w-24"
                />
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell className="font-medium">Starter</TableCell>
            <TableCell className="text-right">$3,940</TableCell>
            <TableCell>
                <Sparkline
                    data={churn}
                    aria-label="Starter sales trend"
                    className="h-8 w-24 text-destructive"
                />
            </TableCell>
        </TableRow>
    </TableBody>
</Table>`,
            },
        },
    },
};
