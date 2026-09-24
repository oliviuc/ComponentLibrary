import type { Meta, StoryObj } from "@storybook/react-vite";

import {
    Chart,
    ChartArea,
    ChartGrid,
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
    title: "Graphs/Area",
    component: Chart,
    args: { type: "area", "aria-label": "Monthly visitors" },
    parameters: {
        docs: {
            description: {
                component:
                    "Area charts. `gradient` fills under the line. Pass `{ from, to }` to set the stop opacities.",
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

export const Gradient: Story = {
    render: () => (
        <Chart
            aria-label="Monthly visitors"
            type="area"
            data={visitors}
            className="h-64 w-96"
        >
            <ChartSeries dataKey="desktop">Desktop</ChartSeries>
            <ChartSeries dataKey="mobile" className="text-chart-4">
                Mobile
            </ChartSeries>
            <ChartGrid vertical={false} />
            <ChartXAxis
                dataKey="month"
                interval={0}
                tickFormatter={(month) => String(month).slice(0, 3)}
            />
            <ChartYAxis />
            <ChartTooltip />
            <ChartArea dataKey="desktop" gradient />
            <ChartArea dataKey="mobile" gradient />
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

<Chart aria-label="Monthly visitors" type="area" data={visitors} className="h-64 w-96">
    <ChartSeries dataKey="desktop">Desktop</ChartSeries>
    <ChartSeries dataKey="mobile" className="text-chart-4">
        Mobile
    </ChartSeries>
    <ChartGrid vertical={false} />
    <ChartXAxis
        dataKey="month"
        interval={0}
        tickFormatter={(month) => String(month).slice(0, 3)}
    />
    <ChartYAxis />
    <ChartTooltip />
    <ChartArea dataKey="desktop" gradient />
    <ChartArea dataKey="mobile" gradient />
</Chart>`,
            },
        },
    },
};

export const Stops: Story = {
    render: () => (
        <Chart
            aria-label="Monthly visitors"
            type="area"
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
            <ChartArea dataKey="desktop" gradient={{ from: 0.4, to: 0 }} />
        </Chart>
    ),
    parameters: {
        docs: {
            description: {
                story: "`from` and `to` are the opacities at the top and bottom of the fill.",
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

<Chart aria-label="Monthly visitors" type="area" data={visitors} className="h-64 w-96">
    <ChartSeries dataKey="desktop">Desktop</ChartSeries>
    <ChartGrid vertical={false} />
    <ChartXAxis
        dataKey="month"
        interval={0}
        tickFormatter={(month) => String(month).slice(0, 3)}
    />
    <ChartYAxis />
    <ChartTooltip />
    <ChartArea dataKey="desktop" gradient={{ from: 0.4, to: 0 }} />
</Chart>`,
            },
        },
    },
};
