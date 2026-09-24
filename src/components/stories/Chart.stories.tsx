import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MonitorIcon, SmartphoneIcon, TrendingUpIcon } from "lucide-react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import {
    Chart,
    ChartBar,
    ChartBrush,
    ChartGrid,
    ChartLegend,
    ChartLegendItem,
    ChartName,
    ChartSeries,
    ChartSwatch,
    ChartTooltip,
    ChartTooltipItem,
    ChartTooltipTitle,
    ChartValue,
    ChartXAxis,
    ChartYAxis,
    useChartPoints,
} from "@/components/ui/Chart";

const visitors = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
];

const meta = {
    title: "Graphs/Chart",
    component: Chart,
    args: { type: "bar", "aria-label": "Monthly visitors" },
    parameters: {
        docs: {
            description: {
                component:
                    "Shared chart parts: series labels, tooltip, legend, ticks, formatting, and a brush. Color a series with `text-*` on `className`. `useChartPoints` reads the active tooltip.",
            },
        },
    },
    argTypes: {
        children: { table: { disable: true } },
        type: { table: { disable: true } },
    },
} satisfies Meta<typeof Chart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Icons: Story = {
    render: () => (
        <Chart
            aria-label="Monthly visitors"
            type="bar"
            data={visitors}
            className="h-64 w-96"
        >
            <ChartSeries dataKey="desktop">
                <MonitorIcon className="size-3" /> Desktop
            </ChartSeries>
            <ChartSeries dataKey="mobile">
                <SmartphoneIcon className="size-3" /> Mobile
            </ChartSeries>
            <ChartGrid vertical={false} />
            <ChartXAxis dataKey="month">
                {(month) => (
                    <span className="font-medium">
                        {String(month).slice(0, 3)}
                    </span>
                )}
            </ChartXAxis>
            <ChartTooltip />
            <ChartLegend />
            <ChartBar dataKey="desktop" />
            <ChartBar dataKey="mobile" />
        </Chart>
    ),
    parameters: {
        docs: {
            description: {
                story: "`ChartSeries` children are JSX, so labels can mix icons and text. Tooltip and legend both pick them up.",
            },
            source: {
                code: `const visitors = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
];

<Chart aria-label="Monthly visitors" type="bar" data={visitors} className="h-64 w-96">
    <ChartSeries dataKey="desktop">
        <MonitorIcon className="size-3" /> Desktop
    </ChartSeries>
    <ChartSeries dataKey="mobile">
        <SmartphoneIcon className="size-3" /> Mobile
    </ChartSeries>
    <ChartGrid vertical={false} />
    <ChartXAxis dataKey="month">
        {(month) => (
            <span className="font-medium">
                {String(month).slice(0, 3)}
            </span>
        )}
    </ChartXAxis>
    <ChartTooltip />
    <ChartLegend />
    <ChartBar dataKey="desktop" />
    <ChartBar dataKey="mobile" />
</Chart>`,
            },
        },
    },
};

export const Color: Story = {
    render: () => (
        <Chart
            aria-label="Monthly visitors"
            type="bar"
            data={visitors}
            className="h-64 w-96"
        >
            <ChartSeries dataKey="desktop">Desktop</ChartSeries>
            <ChartSeries dataKey="mobile">Mobile</ChartSeries>
            <ChartGrid vertical={false} />
            <ChartXAxis
                dataKey="month"
                interval={0}
                tickFormatter={(month) => String(month).slice(0, 3)}
            />
            <ChartTooltip />
            <ChartLegend />
            <ChartBar dataKey="desktop" className="text-destructive" />
            <ChartBar dataKey="mobile" />
        </Chart>
    ),
    parameters: {
        docs: {
            description: {
                story: "Palette colors assign themselves in series order. Override one with `text-*` on `className`.",
            },
            source: {
                code: `const visitors = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
];

<Chart aria-label="Monthly visitors" type="bar" data={visitors} className="h-64 w-96">
    <ChartSeries dataKey="desktop">Desktop</ChartSeries>
    <ChartSeries dataKey="mobile">Mobile</ChartSeries>
    <ChartGrid vertical={false} />
    <ChartXAxis
        dataKey="month"
        interval={0}
        tickFormatter={(month) => String(month).slice(0, 3)}
    />
    <ChartTooltip />
    <ChartLegend />
    <ChartBar dataKey="desktop" className="text-destructive" />
    <ChartBar dataKey="mobile" />
</Chart>`,
            },
        },
    },
};

export const Tooltip: Story = {
    render: () => (
        <Chart
            aria-label="Monthly visitors"
            type="bar"
            data={visitors}
            className="h-64 w-96"
        >
            <ChartSeries dataKey="desktop">Desktop</ChartSeries>
            <ChartSeries dataKey="mobile">Mobile</ChartSeries>
            <ChartGrid vertical={false} />
            <ChartXAxis
                dataKey="month"
                interval={0}
                tickFormatter={(month) => String(month).slice(0, 3)}
            />
            <ChartTooltip>
                <ChartTooltipTitle />
                <ChartTooltipItem>
                    <ChartName />
                    <ChartValue>
                        {(value) => (
                            <span className="flex items-center gap-1">
                                {typeof value === "number"
                                    ? value.toLocaleString()
                                    : String(value)}
                                <span className="text-muted-foreground">
                                    visitors
                                </span>
                                <TrendingUpIcon className="size-3" />
                            </span>
                        )}
                    </ChartValue>
                </ChartTooltipItem>
            </ChartTooltip>
            <ChartBar dataKey="desktop" />
            <ChartBar dataKey="mobile" />
        </Chart>
    ),
    parameters: {
        docs: {
            description: {
                story: "Compose the tooltip from title, item, name, and value parts. A render function owns the text.",
            },
            source: {
                code: `const visitors = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
];

<Chart aria-label="Monthly visitors" type="bar" data={visitors} className="h-64 w-96">
    <ChartSeries dataKey="desktop">Desktop</ChartSeries>
    <ChartSeries dataKey="mobile">Mobile</ChartSeries>
    <ChartGrid vertical={false} />
    <ChartXAxis
        dataKey="month"
        interval={0}
        tickFormatter={(month) => String(month).slice(0, 3)}
    />
    <ChartTooltip>
        <ChartTooltipTitle />
        <ChartTooltipItem>
            <ChartName />
            <ChartValue>
                {(value) => (
                    <span className="flex items-center gap-1">
                        {typeof value === "number"
                            ? value.toLocaleString()
                            : String(value)}
                        <span className="text-muted-foreground">
                            visitors
                        </span>
                        <TrendingUpIcon className="size-3" />
                    </span>
                )}
            </ChartValue>
        </ChartTooltipItem>
    </ChartTooltip>
    <ChartBar dataKey="desktop" />
    <ChartBar dataKey="mobile" />
</Chart>`,
            },
        },
    },
};

export const Ticks: Story = {
    render: () => (
        <Chart
            aria-label="Monthly visitors"
            type="bar"
            data={visitors}
            className="h-64 w-96"
        >
            <ChartSeries dataKey="desktop">Desktop</ChartSeries>
            <ChartGrid vertical={false} />
            <ChartXAxis dataKey="month" height={48} tickHeight={36}>
                {(month) => (
                    <span className="flex flex-col items-center gap-0.5">
                        <MonitorIcon className="size-3" />
                        {String(month).slice(0, 3)}
                    </span>
                )}
            </ChartXAxis>
            <ChartTooltip />
            <ChartBar dataKey="desktop" />
        </Chart>
    ),
    parameters: {
        docs: {
            description: {
                story: "A render function on the axis draws each tick as JSX. Plain text ticks stay SVG.",
            },
            source: {
                code: `const visitors = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
];

<Chart aria-label="Monthly visitors" type="bar" data={visitors} className="h-64 w-96">
    <ChartSeries dataKey="desktop">Desktop</ChartSeries>
    <ChartGrid vertical={false} />
    <ChartXAxis dataKey="month" height={48} tickHeight={36}>
        {(month) => (
            <span className="flex flex-col items-center gap-0.5">
                <MonitorIcon className="size-3" />
                {String(month).slice(0, 3)}
            </span>
        )}
    </ChartXAxis>
    <ChartTooltip />
    <ChartBar dataKey="desktop" />
</Chart>`,
            },
        },
    },
};

export const Currency: Story = {
    render: () => (
        <Chart
            aria-label="Monthly visitors"
            type="bar"
            data={visitors}
            className="h-64 w-96"
        >
            <ChartSeries
                dataKey="desktop"
                format={{
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                }}
            >
                Desktop
            </ChartSeries>
            <ChartSeries
                dataKey="mobile"
                format={{
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                }}
            >
                Mobile
            </ChartSeries>
            <ChartGrid vertical={false} />
            <ChartXAxis
                dataKey="month"
                interval={0}
                tickFormatter={(month) => String(month).slice(0, 3)}
            />
            <ChartYAxis
                format={{
                    style: "currency",
                    currency: "USD",
                    notation: "compact",
                    maximumFractionDigits: 0,
                }}
            />
            <ChartTooltip />
            <ChartBar dataKey="desktop" />
            <ChartBar dataKey="mobile" />
        </Chart>
    ),
    parameters: {
        docs: {
            description: {
                story: "`format` accepts `Intl` options on a series and on an axis.",
            },
            source: {
                code: `const visitors = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
];

<Chart aria-label="Monthly visitors" type="bar" data={visitors} className="h-64 w-96">
    <ChartSeries
        dataKey="desktop"
        format={{
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }}
    >
        Desktop
    </ChartSeries>
    <ChartSeries
        dataKey="mobile"
        format={{
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }}
    >
        Mobile
    </ChartSeries>
    <ChartGrid vertical={false} />
    <ChartXAxis
        dataKey="month"
        interval={0}
        tickFormatter={(month) => String(month).slice(0, 3)}
    />
    <ChartYAxis
        format={{
            style: "currency",
            currency: "USD",
            notation: "compact",
            maximumFractionDigits: 0,
        }}
    />
    <ChartTooltip />
    <ChartBar dataKey="desktop" />
    <ChartBar dataKey="mobile" />
</Chart>`,
            },
        },
    },
};

function ChartTotal() {
    const { points } = useChartPoints();
    const total = points.reduce(
        (sum, point) =>
            sum + (typeof point.value === "number" ? point.value : 0),
        0,
    );

    return (
        <div className="flex justify-between gap-4 border-t border-border pt-1.5 font-medium">
            Total
            <span>{total.toLocaleString()}</span>
        </div>
    );
}

export const Total: Story = {
    render: () => (
        <Chart
            aria-label="Monthly visitors"
            type="bar"
            data={visitors}
            className="h-64 w-96"
        >
            <ChartSeries dataKey="desktop">Desktop</ChartSeries>
            <ChartSeries dataKey="mobile">Mobile</ChartSeries>
            <ChartGrid vertical={false} />
            <ChartXAxis
                dataKey="month"
                interval={0}
                tickFormatter={(month) => String(month).slice(0, 3)}
            />
            <ChartTooltip>
                <ChartTooltipTitle />
                <ChartTooltipItem />
                <ChartTotal />
            </ChartTooltip>
            <ChartBar dataKey="desktop" />
            <ChartBar dataKey="mobile" />
        </Chart>
    ),
    parameters: {
        docs: {
            description: {
                story: "`useChartPoints` reads every active series, so a tooltip can add its own total row.",
            },
            source: {
                code: `const visitors = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
];

function ChartTotal() {
    const { points } = useChartPoints();
    const total = points.reduce(
        (sum, point) =>
            sum + (typeof point.value === "number" ? point.value : 0),
        0,
    );

    return (
        <div className="flex justify-between gap-4 border-t border-border pt-1.5 font-medium">
            Total
            <span>{total.toLocaleString()}</span>
        </div>
    );
}

<Chart aria-label="Monthly visitors" type="bar" data={visitors} className="h-64 w-96">
    <ChartSeries dataKey="desktop">Desktop</ChartSeries>
    <ChartSeries dataKey="mobile">Mobile</ChartSeries>
    <ChartGrid vertical={false} />
    <ChartXAxis
        dataKey="month"
        interval={0}
        tickFormatter={(month) => String(month).slice(0, 3)}
    />
    <ChartTooltip>
        <ChartTooltipTitle />
        <ChartTooltipItem />
        <ChartTotal />
    </ChartTooltip>
    <ChartBar dataKey="desktop" />
    <ChartBar dataKey="mobile" />
</Chart>`,
            },
        },
    },
};

export const Toggle: Story = {
    render: function ToggleStory() {
        const [hidden, setHidden] = useState<Record<string, boolean>>({});

        return (
            <Chart
                aria-label="Monthly visitors"
                type="bar"
                data={visitors}
                className="h-64 w-96"
            >
                <ChartSeries dataKey="desktop">Desktop</ChartSeries>
                <ChartSeries dataKey="mobile">Mobile</ChartSeries>
                <ChartGrid vertical={false} />
                <ChartXAxis
                    dataKey="month"
                    interval={0}
                    tickFormatter={(month) => String(month).slice(0, 3)}
                />
                <ChartLegend>
                    <ChartLegendItem>
                        {(point) => (
                            <button
                                type="button"
                                className="flex items-center gap-1.5"
                                onClick={() => {
                                    const key = String(point.dataKey);
                                    setHidden((current) => ({
                                        ...current,
                                        [key]: !current[key],
                                    }));
                                }}
                            >
                                <ChartSwatch />
                                <ChartName />
                            </button>
                        )}
                    </ChartLegendItem>
                </ChartLegend>
                <ChartBar
                    dataKey="desktop"
                    hide={hidden.desktop}
                    isAnimationActive={false}
                />
                <ChartBar
                    dataKey="mobile"
                    hide={hidden.mobile}
                    isAnimationActive={false}
                />
            </Chart>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "A legend item can be a button. `hide` removes that series without shifting the other colors.",
            },
            source: {
                code: `const visitors = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
];

const [hidden, setHidden] = useState<Record<string, boolean>>({});

<Chart aria-label="Monthly visitors" type="bar" data={visitors} className="h-64 w-96">
    <ChartSeries dataKey="desktop">Desktop</ChartSeries>
    <ChartSeries dataKey="mobile">Mobile</ChartSeries>
    <ChartGrid vertical={false} />
    <ChartXAxis
        dataKey="month"
        interval={0}
        tickFormatter={(month) => String(month).slice(0, 3)}
    />
    <ChartLegend>
        <ChartLegendItem>
            {(point) => (
                <button
                    type="button"
                    className="flex items-center gap-1.5"
                    onClick={() => {
                        const key = String(point.dataKey);
                        setHidden((current) => ({
                            ...current,
                            [key]: !current[key],
                        }));
                    }}
                >
                    <ChartSwatch />
                    <ChartName />
                </button>
            )}
        </ChartLegendItem>
    </ChartLegend>
    <ChartBar
        dataKey="desktop"
        hide={hidden.desktop}
        isAnimationActive={false}
    />
    <ChartBar
        dataKey="mobile"
        hide={hidden.mobile}
        isAnimationActive={false}
    />
</Chart>`,
            },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await waitFor(() => {
            expect(canvasElement.querySelectorAll(".recharts-bar").length).toBe(
                2,
            );
        });
        await userEvent.click(canvas.getByRole("button", { name: "Mobile" }));
        await waitFor(() => {
            expect(canvasElement.querySelectorAll(".recharts-bar").length).toBe(
                1,
            );
        });
    },
};

export const LegendLayout: Story = {
    render: () => (
        <Chart
            aria-label="Monthly visitors"
            type="bar"
            data={visitors}
            className="h-64 w-96"
        >
            <ChartSeries dataKey="desktop">Desktop</ChartSeries>
            <ChartSeries dataKey="mobile">Mobile</ChartSeries>
            <ChartGrid vertical={false} />
            <ChartXAxis
                dataKey="month"
                interval={0}
                tickFormatter={(month) => String(month).slice(0, 3)}
            />
            <ChartTooltip />
            <ChartLegend
                layout="vertical"
                align="right"
                verticalAlign="middle"
            />
            <ChartBar dataKey="desktop" />
            <ChartBar dataKey="mobile" />
        </Chart>
    ),
    parameters: {
        docs: {
            description: {
                story: '`layout="vertical"` stacks the legend. `align` and `verticalAlign` place it.',
            },
            source: {
                code: `const visitors = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
];

<Chart aria-label="Monthly visitors" type="bar" data={visitors} className="h-64 w-96">
    <ChartSeries dataKey="desktop">Desktop</ChartSeries>
    <ChartSeries dataKey="mobile">Mobile</ChartSeries>
    <ChartGrid vertical={false} />
    <ChartXAxis
        dataKey="month"
        interval={0}
        tickFormatter={(month) => String(month).slice(0, 3)}
    />
    <ChartTooltip />
    <ChartLegend layout="vertical" align="right" verticalAlign="middle" />
    <ChartBar dataKey="desktop" />
    <ChartBar dataKey="mobile" />
</Chart>`,
            },
        },
    },
};

export const Brush: Story = {
    render: () => (
        <Chart
            aria-label="Monthly visitors"
            type="bar"
            data={visitors}
            className="h-64 w-96"
        >
            <ChartSeries dataKey="desktop">Desktop</ChartSeries>
            <ChartGrid vertical={false} />
            <ChartXAxis
                dataKey="month"
                interval={0}
                tickFormatter={(month) => String(month).slice(0, 3)}
            />
            <ChartTooltip />
            <ChartBar dataKey="desktop" />
            <ChartBrush dataKey="month" />
        </Chart>
    ),
    parameters: {
        docs: {
            description: {
                story: "`ChartBrush` pans a long series.",
            },
            source: {
                code: `const visitors = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
];

<Chart aria-label="Monthly visitors" type="bar" data={visitors} className="h-64 w-96">
    <ChartSeries dataKey="desktop">Desktop</ChartSeries>
    <ChartGrid vertical={false} />
    <ChartXAxis
        dataKey="month"
        interval={0}
        tickFormatter={(month) => String(month).slice(0, 3)}
    />
    <ChartTooltip />
    <ChartBar dataKey="desktop" />
    <ChartBrush dataKey="month" />
</Chart>`,
            },
        },
    },
};
