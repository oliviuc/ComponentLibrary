import type { Meta, StoryObj } from "@storybook/react-vite";

import {
    Chart,
    ChartCenter,
    ChartPie,
    ChartPolarGrid,
    ChartPolarRadiusAxis,
    ChartRadialBar,
    ChartSeries,
    ChartTooltip,
    ChartTooltipItem,
} from "@/components/ui/Chart";

const browsers = [
    { browser: "Chrome", visitors: 275 },
    { browser: "Safari", visitors: 200 },
    { browser: "Firefox", visitors: 287 },
    { browser: "Edge", visitors: 173 },
    { browser: "Other", visitors: 190 },
];

const totalVisitors = browsers.reduce((sum, item) => sum + item.visitors, 0);

const radial = [{ browser: "Safari", visitors: 1260 }];

const meta = {
    title: "Graphs/Pie",
    component: Chart,
    args: { type: "pie" },
    parameters: {
        docs: {
            description: {
                component:
                    'Pie and radial charts. `type="pie"` draws slices from `ChartPie`. `type="radial"` draws a gauge from `ChartRadialBar`. A `ChartSeries` whose `dataKey` matches a slice name sets that slice’s label and color.',
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

export const Donut: Story = {
    render: () => (
        <Chart type="pie" className="aspect-square w-72">
            <ChartSeries dataKey="Chrome">Chrome</ChartSeries>
            <ChartSeries dataKey="Safari">Safari</ChartSeries>
            <ChartSeries dataKey="Firefox">Firefox</ChartSeries>
            <ChartSeries dataKey="Edge">Edge</ChartSeries>
            <ChartSeries dataKey="Other">Other</ChartSeries>
            <ChartTooltip>
                <ChartTooltipItem />
            </ChartTooltip>
            <ChartPie
                data={browsers}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={68}
                strokeWidth={5}
            >
                <ChartCenter>
                    <span className="text-3xl font-medium">
                        {totalVisitors.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">Visitors</span>
                </ChartCenter>
            </ChartPie>
        </Chart>
    ),
    parameters: {
        docs: {
            description: {
                story: "`ChartCenter` sits in the hole. Slice colors follow each `ChartSeries`.",
            },
            source: {
                code: `const browsers = [
    { browser: "Chrome", visitors: 275 },
    { browser: "Safari", visitors: 200 },
    { browser: "Firefox", visitors: 287 },
    { browser: "Edge", visitors: 173 },
    { browser: "Other", visitors: 190 },
];

const totalVisitors = browsers.reduce(
    (sum, item) => sum + item.visitors,
    0,
);

<Chart type="pie" className="aspect-square w-72">
    <ChartSeries dataKey="Chrome">Chrome</ChartSeries>
    <ChartSeries dataKey="Safari">Safari</ChartSeries>
    <ChartSeries dataKey="Firefox">Firefox</ChartSeries>
    <ChartSeries dataKey="Edge">Edge</ChartSeries>
    <ChartSeries dataKey="Other">Other</ChartSeries>
    <ChartTooltip>
        <ChartTooltipItem />
    </ChartTooltip>
    <ChartPie
        data={browsers}
        dataKey="visitors"
        nameKey="browser"
        innerRadius={68}
        strokeWidth={5}
    >
        <ChartCenter>
            <span className="text-3xl font-medium">
                {totalVisitors.toLocaleString()}
            </span>
            <span className="text-muted-foreground">Visitors</span>
        </ChartCenter>
    </ChartPie>
</Chart>`,
            },
        },
    },
};

export const Radial: Story = {
    render: () => (
        <Chart
            type="radial"
            data={radial}
            endAngle={100}
            innerRadius={80}
            outerRadius={140}
            className="aspect-square w-72"
        >
            <ChartPolarGrid
                gridType="circle"
                radialLines={false}
                polarRadius={[86, 74]}
                stroke="none"
                className="first:fill-muted last:fill-background"
            />
            <ChartRadialBar dataKey="visitors" background />
            <ChartPolarRadiusAxis
                tick={false}
                tickLine={false}
                axisLine={false}
            >
                <ChartCenter>
                    <span className="text-3xl font-medium">
                        {radial[0].visitors.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">Visitors</span>
                </ChartCenter>
            </ChartPolarRadiusAxis>
        </Chart>
    ),
    parameters: {
        docs: {
            description: {
                story: "A gauge. `ChartCenter` goes inside `ChartPolarRadiusAxis`.",
            },
            source: {
                code: `const radial = [{ browser: "Safari", visitors: 1260 }];

<Chart
    type="radial"
    data={radial}
    endAngle={100}
    innerRadius={80}
    outerRadius={140}
    className="aspect-square w-72"
>
    <ChartPolarGrid
        gridType="circle"
        radialLines={false}
        polarRadius={[86, 74]}
        stroke="none"
        className="first:fill-muted last:fill-background"
    />
    <ChartRadialBar dataKey="visitors" background />
    <ChartPolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
        <ChartCenter>
            <span className="text-3xl font-medium">
                {radial[0].visitors.toLocaleString()}
            </span>
            <span className="text-muted-foreground">Visitors</span>
        </ChartCenter>
    </ChartPolarRadiusAxis>
</Chart>`,
            },
        },
    },
};
