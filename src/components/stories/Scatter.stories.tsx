import type { Meta, StoryObj } from "@storybook/react-vite";

import {
    Chart,
    ChartGrid,
    ChartScatter,
    ChartSeries,
    ChartTooltip,
    ChartXAxis,
    ChartYAxis,
} from "@/components/ui/Chart";

const points = [
    { x: 100, y: 200 },
    { x: 120, y: 100 },
    { x: 170, y: 300 },
    { x: 140, y: 250 },
    { x: 150, y: 400 },
    { x: 110, y: 280 },
];

const meta = {
    title: "Graphs/Scatter",
    component: Chart,
    args: { type: "scatter" },
    parameters: {
        docs: {
            description: {
                component:
                    "Scatter charts. `ChartScatter` plots one point per row. Both axes are numeric.",
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
        <Chart type="scatter" data={points} className="h-64 w-96">
            <ChartSeries dataKey="y">Visitors</ChartSeries>
            <ChartGrid />
            <ChartXAxis dataKey="x" type="number" />
            <ChartYAxis dataKey="y" />
            <ChartTooltip />
            <ChartScatter dataKey="y" />
        </Chart>
    ),
    parameters: {
        docs: {
            source: {
                code: `const points = [
    { x: 100, y: 200 },
    { x: 120, y: 100 },
    { x: 170, y: 300 },
    { x: 140, y: 250 },
    { x: 150, y: 400 },
    { x: 110, y: 280 },
];

<Chart type="scatter" data={points} className="h-64 w-96">
    <ChartSeries dataKey="y">Visitors</ChartSeries>
    <ChartGrid />
    <ChartXAxis dataKey="x" type="number" />
    <ChartYAxis dataKey="y" />
    <ChartTooltip />
    <ChartScatter dataKey="y" />
</Chart>`,
            },
        },
    },
};
