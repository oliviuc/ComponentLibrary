import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";

import {
    Chart,
    ChartBar,
    ChartGrid,
    ChartLabelList,
    ChartSeries,
    ChartTooltip,
    ChartXAxis,
    ChartYAxis,
} from "@/components/ui/Chart";

const visitors = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
];

const browsers = [
    { browser: "Chrome", visitors: 275 },
    { browser: "Safari", visitors: 200 },
    { browser: "Firefox", visitors: 287 },
    { browser: "Edge", visitors: 173 },
    { browser: "Other", visitors: 190 },
];

const meta = {
    title: "Graphs/Bar",
    component: Chart,
    args: { type: "bar", "aria-label": "Monthly visitors" },
    parameters: {
        docs: {
            description: {
                component:
                    'Bar charts. Pass `type="bar"` and compose grid, axes, series, tooltips, and legends in JSX. Color a series with `text-*` on `className`. `nameKey` colors each bar from its category.',
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

export const Default: Story = {
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
            <ChartBar dataKey="desktop" />
            <ChartBar dataKey="mobile" />
        </Chart>
    ),
    parameters: {
        docs: {
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
    <ChartBar dataKey="desktop" />
    <ChartBar dataKey="mobile" />
</Chart>`,
            },
        },
    },
};

export const Formatted: Story = {
    render: () => (
        <Chart
            aria-label="Monthly visitors"
            type="bar"
            data={visitors}
            className="h-64 w-96"
        >
            <ChartSeries
                dataKey="desktop"
                format={(value) => `${value} visitors`}
            >
                Desktop
            </ChartSeries>
            <ChartSeries dataKey="mobile">Mobile</ChartSeries>
            <ChartGrid vertical={false} />
            <ChartXAxis
                dataKey="month"
                interval={0}
                tickFormatter={(month) => String(month).slice(0, 3)}
            />
            <ChartTooltip isAnimationActive={false} />
            <ChartBar dataKey="desktop" isAnimationActive={false} />
            <ChartBar dataKey="mobile" isAnimationActive={false} />
        </Chart>
    ),
    parameters: {
        docs: {
            description: {
                story: "`format` on `ChartSeries` renders the tooltip value. A function or `Intl` options both work.",
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
        format={(value) => \`\${value} visitors\`}
    >
        Desktop
    </ChartSeries>
    <ChartSeries dataKey="mobile">Mobile</ChartSeries>
    <ChartGrid vertical={false} />
    <ChartXAxis
        dataKey="month"
        interval={0}
        tickFormatter={(month) => String(month).slice(0, 3)}
    />
    <ChartTooltip isAnimationActive={false} />
    <ChartBar dataKey="desktop" isAnimationActive={false} />
    <ChartBar dataKey="mobile" isAnimationActive={false} />
</Chart>`,
            },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await waitFor(() => {
            const bar = canvasElement.querySelector(".recharts-bar-rectangle");
            const chart = canvasElement.querySelector(".recharts-wrapper");
            expect(bar).toBeTruthy();
            expect(chart).toBeTruthy();
            if (!bar || !chart) {
                return;
            }
            const box = bar.getBoundingClientRect();
            expect(box.height).toBeGreaterThan(8);
            const point = {
                bubbles: true,
                clientX: box.left + box.width / 2,
                clientY: box.top + Math.min(16, box.height / 2),
            };
            chart.dispatchEvent(new MouseEvent("mouseenter", point));
            chart.dispatchEvent(new MouseEvent("mousemove", point));
        });
        await waitFor(() => {
            expect(canvas.getByText("Desktop")).toBeTruthy();
            expect(canvas.getByText("186 visitors")).toBeTruthy();
        });
    },
};

export const Horizontal: Story = {
    render: () => (
        <Chart
            aria-label="Monthly visitors"
            type="bar"
            data={visitors}
            layout="vertical"
            className="h-64 w-96"
        >
            <ChartXAxis dataKey="desktop" type="number" hide />
            <ChartYAxis
                dataKey="month"
                type="category"
                width={72}
                tickWidth={64}
            >
                {(month) => (
                    <span className="font-medium">
                        {String(month).slice(0, 3)}
                    </span>
                )}
            </ChartYAxis>
            <ChartTooltip />
            <ChartBar dataKey="desktop" name="Desktop" />
        </Chart>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Set `layout="vertical"` on the chart. Category labels are JSX on `ChartYAxis`.',
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

<Chart aria-label="Monthly visitors" type="bar" data={visitors} layout="vertical" className="h-64 w-96">
    <ChartXAxis dataKey="desktop" type="number" hide />
    <ChartYAxis
        dataKey="month"
        type="category"
        width={72}
        tickWidth={64}
    >
        {(month) => (
            <span className="font-medium">
                {String(month).slice(0, 3)}
            </span>
        )}
    </ChartYAxis>
    <ChartTooltip />
    <ChartBar dataKey="desktop" name="Desktop" />
</Chart>`,
            },
        },
    },
};

export const Stacked: Story = {
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
            <ChartBar
                dataKey="mobile"
                stackId="visitors"
                radius={[0, 0, 4, 4]}
            />
            <ChartBar
                dataKey="desktop"
                stackId="visitors"
                radius={[4, 4, 0, 0]}
            />
        </Chart>
    ),
    parameters: {
        docs: {
            description: {
                story: "Share a `stackId` to stack series. `radius` rounds the outer corners of the top series.",
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
    <ChartBar
        dataKey="mobile"
        stackId="visitors"
        radius={[0, 0, 4, 4]}
    />
    <ChartBar
        dataKey="desktop"
        stackId="visitors"
        radius={[4, 4, 0, 0]}
    />
</Chart>`,
            },
        },
    },
};

export const Categories: Story = {
    render: () => (
        <Chart
            aria-label="Browser share"
            type="bar"
            data={browsers}
            className="h-64 w-96"
        >
            <ChartSeries dataKey="Chrome">Chrome</ChartSeries>
            <ChartSeries dataKey="Safari">Safari</ChartSeries>
            <ChartSeries dataKey="Firefox">Firefox</ChartSeries>
            <ChartSeries dataKey="Edge">Edge</ChartSeries>
            <ChartSeries dataKey="Other">Other</ChartSeries>
            <ChartGrid vertical={false} />
            <ChartXAxis dataKey="browser" interval={0} />
            <ChartTooltip />
            <ChartBar dataKey="visitors" nameKey="browser" />
        </Chart>
    ),
    parameters: {
        docs: {
            description: {
                story: "`nameKey` paints each bar from that field. A `ChartSeries` with the same name sets its label and color.",
            },
            source: {
                code: `const browsers = [
    { browser: "Chrome", visitors: 275 },
    { browser: "Safari", visitors: 200 },
    { browser: "Firefox", visitors: 287 },
    { browser: "Edge", visitors: 173 },
    { browser: "Other", visitors: 190 },
];

<Chart aria-label="Browser share" type="bar" data={browsers} className="h-64 w-96">
    <ChartSeries dataKey="Chrome">Chrome</ChartSeries>
    <ChartSeries dataKey="Safari">Safari</ChartSeries>
    <ChartSeries dataKey="Firefox">Firefox</ChartSeries>
    <ChartSeries dataKey="Edge">Edge</ChartSeries>
    <ChartSeries dataKey="Other">Other</ChartSeries>
    <ChartGrid vertical={false} />
    <ChartXAxis dataKey="browser" interval={0} />
    <ChartTooltip />
    <ChartBar dataKey="visitors" nameKey="browser" />
</Chart>`,
            },
        },
    },
};

function RevenueBars() {
    return (
        <>
            <ChartBar dataKey="desktop" isAnimationActive={false} />
            <ChartBar dataKey="mobile" isAnimationActive={false} />
        </>
    );
}

export const Wrapped: Story = {
    render: () => (
        <Chart
            aria-label="Monthly visitors"
            type="bar"
            data={visitors}
            className="h-64 w-96"
        >
            <ChartGrid vertical={false} />
            <ChartXAxis
                dataKey="month"
                interval={0}
                tickFormatter={(month) => String(month).slice(0, 3)}
            />
            <ChartTooltip />
            <RevenueBars />
        </Chart>
    ),
    parameters: {
        docs: {
            description: {
                story: "Series inside your own component still register, so each one keeps its own palette color.",
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

function RevenueBars() {
    return (
        <>
            <ChartBar dataKey="desktop" isAnimationActive={false} />
            <ChartBar dataKey="mobile" isAnimationActive={false} />
        </>
    );
}

<Chart aria-label="Monthly visitors" type="bar" data={visitors} className="h-64 w-96">
    <ChartGrid vertical={false} />
    <ChartXAxis
        dataKey="month"
        interval={0}
        tickFormatter={(month) => String(month).slice(0, 3)}
    />
    <ChartTooltip />
    <RevenueBars />
</Chart>`,
            },
        },
    },
    play: async ({ canvasElement }) => {
        await waitFor(() => {
            expect(canvasElement.querySelectorAll(".recharts-bar").length).toBe(
                2,
            );
        });
        const bars = canvasElement.querySelectorAll(".recharts-bar");
        expect(bars[0]?.getAttribute("class")).toContain("text-chart-1");
        expect(bars[1]?.getAttribute("class")).toContain("text-chart-2");
    },
};

export const Labels: Story = {
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
            <ChartBar dataKey="desktop">
                <ChartLabelList series="desktop" position="top" />
            </ChartBar>
        </Chart>
    ),
    parameters: {
        docs: {
            description: {
                story: "`ChartLabelList` sits on a series. `series` borrows that series color.",
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
    <ChartBar dataKey="desktop">
        <ChartLabelList series="desktop" position="top" />
    </ChartBar>
</Chart>`,
            },
        },
    },
};
