import type { Meta, StoryObj } from "@storybook/react-vite";

import {
    Chart,
    ChartPolarAngleAxis,
    ChartPolarGrid,
    ChartRadar,
    ChartSeries,
    ChartTooltip,
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
    title: "Graphs/Radar",
    component: Chart,
    args: { type: "radar", "aria-label": "Monthly visitors" },
    parameters: {
        docs: {
            description: {
                component:
                    "Radar charts. `ChartPolarGrid` and `ChartPolarAngleAxis` frame the plot. One `ChartRadar` per series.",
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
            type="radar"
            data={visitors}
            className="aspect-square w-72"
        >
            <ChartSeries dataKey="desktop">Desktop</ChartSeries>
            <ChartSeries dataKey="mobile">Mobile</ChartSeries>
            <ChartTooltip />
            <ChartPolarAngleAxis
                dataKey="month"
                tickFormatter={(month) => String(month).slice(0, 3)}
            />
            <ChartPolarGrid />
            <ChartRadar dataKey="desktop" />
            <ChartRadar dataKey="mobile" fillOpacity={0.4} />
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

<Chart aria-label="Monthly visitors" type="radar" data={visitors} className="aspect-square w-72">
    <ChartSeries dataKey="desktop">Desktop</ChartSeries>
    <ChartSeries dataKey="mobile">Mobile</ChartSeries>
    <ChartTooltip />
    <ChartPolarAngleAxis
        dataKey="month"
        tickFormatter={(month) => String(month).slice(0, 3)}
    />
    <ChartPolarGrid />
    <ChartRadar dataKey="desktop" />
    <ChartRadar dataKey="mobile" fillOpacity={0.4} />
</Chart>`,
            },
        },
    },
};
