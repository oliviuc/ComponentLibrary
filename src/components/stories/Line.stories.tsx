import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";

import {
    Chart,
    ChartBar,
    ChartGrid,
    ChartLine,
    ChartReferenceArea,
    ChartReferenceDot,
    ChartReferenceLine,
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

const meta = {
    title: "Graphs/Line",
    component: Chart,
    args: { type: "line", "aria-label": "Monthly visitors" },
    parameters: {
        docs: {
            description: {
                component:
                    'Line charts. `type="line"` draws a line per `ChartLine`. `type="composed"` mixes bars and lines in one chart.',
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
            type="line"
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
            <ChartYAxis />
            <ChartTooltip isAnimationActive={false} />
            <ChartLine dataKey="desktop" isAnimationActive={false} />
            <ChartLine dataKey="mobile" isAnimationActive={false} />
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

<Chart aria-label="Monthly visitors" type="line" data={visitors} className="h-64 w-96">
    <ChartSeries dataKey="desktop">Desktop</ChartSeries>
    <ChartSeries dataKey="mobile">Mobile</ChartSeries>
    <ChartGrid vertical={false} />
    <ChartXAxis
        dataKey="month"
        interval={0}
        tickFormatter={(month) => String(month).slice(0, 3)}
    />
    <ChartYAxis />
    <ChartTooltip isAnimationActive={false} />
    <ChartLine dataKey="desktop" isAnimationActive={false} />
    <ChartLine dataKey="mobile" isAnimationActive={false} />
</Chart>`,
            },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await waitFor(() => {
            const chart = canvasElement.querySelector(".recharts-wrapper");
            expect(
                canvasElement.querySelector(".recharts-line-curve"),
            ).toBeTruthy();
            expect(chart).toBeTruthy();
            if (!chart) {
                return;
            }
            const box = chart.getBoundingClientRect();
            expect(box.width).toBeGreaterThan(50);
            const point = {
                bubbles: true,
                clientX: box.left + box.width * 0.3,
                clientY: box.top + box.height * 0.45,
            };
            chart.dispatchEvent(new MouseEvent("mouseenter", point));
            chart.dispatchEvent(new MouseEvent("mousemove", point));
        });
        await waitFor(() => {
            const dot = canvasElement.querySelector(
                ".recharts-active-dot circle",
            );
            expect(dot?.getAttribute("class") ?? "").toContain("text-chart-1");
            expect(canvas.getByText("Desktop")).toBeTruthy();
        });
    },
};

export const Step: Story = {
    render: () => (
        <Chart
            aria-label="Monthly visitors"
            type="line"
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
            <ChartLine dataKey="desktop" type="step" />
        </Chart>
    ),
    parameters: {
        docs: {
            description: {
                story: '`type="step"` draws a step line. `linear` and `monotone` are the other common curves.',
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

<Chart aria-label="Monthly visitors" type="line" data={visitors} className="h-64 w-96">
    <ChartSeries dataKey="desktop">Desktop</ChartSeries>
    <ChartGrid vertical={false} />
    <ChartXAxis
        dataKey="month"
        interval={0}
        tickFormatter={(month) => String(month).slice(0, 3)}
    />
    <ChartTooltip />
    <ChartLine dataKey="desktop" type="step" />
</Chart>`,
            },
        },
    },
};

export const Mixed: Story = {
    render: () => (
        <Chart
            aria-label="Monthly visitors"
            type="composed"
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
            <ChartYAxis />
            <ChartTooltip />
            <ChartBar dataKey="mobile" />
            <ChartLine dataKey="desktop" />
        </Chart>
    ),
    parameters: {
        docs: {
            description: {
                story: '`type="composed"` puts bars and lines on the same axes.',
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

<Chart aria-label="Monthly visitors" type="composed" data={visitors} className="h-64 w-96">
    <ChartSeries dataKey="desktop">Desktop</ChartSeries>
    <ChartSeries dataKey="mobile">Mobile</ChartSeries>
    <ChartGrid vertical={false} />
    <ChartXAxis
        dataKey="month"
        interval={0}
        tickFormatter={(month) => String(month).slice(0, 3)}
    />
    <ChartYAxis />
    <ChartTooltip />
    <ChartBar dataKey="mobile" />
    <ChartLine dataKey="desktop" />
</Chart>`,
            },
        },
    },
};

export const Reference: Story = {
    render: () => (
        <Chart
            aria-label="Monthly visitors"
            type="line"
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
            <ChartYAxis />
            <ChartTooltip />
            <ChartReferenceArea y1={100} y2={200} label="Typical" />
            <ChartReferenceLine y={250} series="desktop" label="Goal" />
            <ChartReferenceDot x="March" y={237} series="desktop" />
            <ChartLine dataKey="desktop" />
        </Chart>
    ),
    parameters: {
        docs: {
            description: {
                story: "Reference marks use muted tokens by default. `series` borrows that series color.",
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

<Chart aria-label="Monthly visitors" type="line" data={visitors} className="h-64 w-96">
    <ChartSeries dataKey="desktop">Desktop</ChartSeries>
    <ChartGrid vertical={false} />
    <ChartXAxis
        dataKey="month"
        interval={0}
        tickFormatter={(month) => String(month).slice(0, 3)}
    />
    <ChartYAxis />
    <ChartTooltip />
    <ChartReferenceArea y1={100} y2={200} label="Typical" />
    <ChartReferenceLine y={250} series="desktop" label="Goal" />
    <ChartReferenceDot x="March" y={237} series="desktop" />
    <ChartLine dataKey="desktop" />
</Chart>`,
            },
        },
    },
};
