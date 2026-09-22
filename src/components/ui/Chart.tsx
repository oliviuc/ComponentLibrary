import {
    createContext,
    isValidElement,
    useContext,
    useId,
    useLayoutEffect,
    useState,
    useSyncExternalStore,
    type ComponentProps,
    type CSSProperties,
    type MouseEvent,
    type ReactElement,
    type ReactNode,
} from "react";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    Brush,
    CartesianGrid,
    ComposedChart,
    Label,
    LabelList,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    RadialBar,
    RadialBarChart,
    Rectangle,
    ReferenceArea,
    ReferenceDot,
    ReferenceLine,
    Scatter,
    ScatterChart,
    Sector,
    Tooltip,
    XAxis,
    YAxis,
    useChartHeight,
    useChartWidth,
    type LegendProps,
    type TooltipItemSorter,
    type TooltipProps,
} from "recharts";

import {
    asKey,
    createSeriesStore,
    formatChartValue,
    lookupSeries,
    rowName,
    seriesColor,
    sortChartItems,
    type ChartItemSorter,
    tickBox,
    tickFormatterFromFormat,
    valueBox,
    type AxisFormat,
    type ChartFormat,
    type SeriesPatch,
    type SeriesStore,
    type TickOrientation,
} from "@/lib/chart";
import { cn } from "@/lib/utils";

export type { ChartFormat };

const CHART_CLASS =
    "aspect-video w-full text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden";

const SeriesStoreContext = createContext<SeriesStore | null>(null);

function useSeriesStore() {
    const store = useContext(SeriesStoreContext);
    if (!store) {
        throw new Error("Chart parts must be used within a <Chart />");
    }
    return store;
}

function useSeriesPaintMap() {
    const store = useSeriesStore();
    return useSyncExternalStore(
        store.subscribe,
        store.getPaint,
        store.getPaint,
    );
}

/** Series colors registered on this chart, keyed by dataKey or slice name. */
export function useChart() {
    const series = useSeriesPaintMap();
    return { series };
}

export type ChartSeriesInfo = {
    index: number;
    className?: string;
    color?: string;
    label?: ReactNode;
    format?: ChartFormat;
};

/** One registered series: palette slot, label, color, and format. */
export function useChartSeries(
    key: string | number | undefined,
): ChartSeriesInfo | undefined {
    const store = useSeriesStore();
    const paint = useSeriesPaintMap();
    const id = asKey(key);
    if (id == null) {
        return undefined;
    }
    const entry = paint[id];
    if (!entry) {
        return undefined;
    }
    const meta = store.getMeta(id);
    return {
        index: entry.index,
        className: entry.className,
        color: entry.color,
        label: meta?.label,
        format: meta?.format,
    };
}

function useRegisterSeries(
    key: unknown,
    patch: SeriesPatch,
    source: "series" | "part",
) {
    const store = useSeriesStore();
    const id = asKey(key);
    const { label, className, color, format, nameKey } = patch;

    useLayoutEffect(() => {
        if (id == null) {
            return;
        }
        store.register(
            id,
            { label, className, color, format, nameKey },
            source,
        );
    }, [store, id, label, className, color, format, nameKey, source]);
}

function usePaint(
    key: unknown,
    className?: string,
    color?: string,
    fallbackIndex = 0,
) {
    const entry = useChartSeries(asKey(key));
    const index = entry?.index ?? fallbackIndex;
    return {
        className: cn(seriesColor(index), entry?.className, className),
        color: color ?? entry?.color,
        entry,
    };
}

function colorStyle(
    color: string | undefined,
    style?: CSSProperties,
): CSSProperties | undefined {
    if (!color) {
        return style;
    }
    return { ...style, color };
}

function paintMarker<T>(
    marker: T,
    className: string,
    whenActive: Record<string, unknown>,
): T {
    if (
        marker === false ||
        marker == null ||
        typeof marker === "function" ||
        isValidElement(marker)
    ) {
        return marker;
    }
    if (marker === true) {
        return { ...whenActive, className } as T;
    }
    if (typeof marker === "object") {
        const record = marker as { className?: string };
        return {
            ...whenActive,
            ...record,
            className: cn(className, record.className),
        } as T;
    }
    return marker;
}

function paintLabel(label: unknown, className: string) {
    if (label == null || label === false) {
        return label ?? false;
    }
    if (label === true) {
        return { className, fill: "currentColor" };
    }
    if (typeof label === "function" || isValidElement(label)) {
        return label;
    }
    if (typeof label === "object") {
        const record = label as { className?: string; fill?: string };
        return {
            ...record,
            fill: record.fill ?? "currentColor",
            className: cn(className, record.className),
        };
    }
    return label;
}

type CartesianChartProps = ComponentProps<typeof BarChart>;
type PolarChartProps = ComponentProps<typeof PieChart>;

export type ChartProps =
    | (CartesianChartProps & {
          type: "bar" | "line" | "area" | "composed" | "scatter";
      })
    | (PolarChartProps & { type: "pie" | "radar" | "radial" });

const CARTESIAN = {
    bar: BarChart,
    line: LineChart,
    area: AreaChart,
    composed: ComposedChart,
    scatter: ScatterChart,
} as const;

const POLAR = {
    pie: PieChart,
    radar: RadarChart,
    radial: RadialBarChart,
} as const;

/** A chart you compose in JSX. `type` picks the plot. Apps never import Recharts. */
export function Chart({
    type,
    className,
    responsive = true,
    children,
    ...props
}: ChartProps) {
    const [store] = useState(createSeriesStore);
    const chartClass = cn(CHART_CLASS, className);
    const shared = { responsive, className: chartClass, children, ...props };

    let chart: ReactElement;
    if (type === "pie" || type === "radar" || type === "radial") {
        const Root = POLAR[type];
        chart = <Root {...(shared as PolarChartProps)} />;
    } else {
        const Root = CARTESIAN[type];
        chart = <Root {...(shared as CartesianChartProps)} />;
    }

    return (
        <SeriesStoreContext.Provider value={store}>
            {chart}
        </SeriesStoreContext.Provider>
    );
}

export type ChartSeriesProps = {
    dataKey: string;
    className?: string;
    /** Any CSS color. Use `className` for theme tokens. */
    color?: string;
    format?: ChartFormat;
    children?: ReactNode;
};

/** Declares a JSX label, color, and format for a series or slice. Renders nothing. */
export function ChartSeries({
    dataKey,
    className,
    color,
    format,
    children,
}: ChartSeriesProps) {
    useRegisterSeries(
        dataKey,
        { label: children, className, color, format },
        "series",
    );
    return null;
}

export type ChartBarProps = Omit<
    ComponentProps<typeof Bar>,
    "fill" | "stroke" | "shape"
> & {
    fill?: string;
    stroke?: string;
    color?: string;
    /** Color each bar from the named field on the data row. */
    nameKey?: string;
    shape?: ComponentProps<typeof Bar>["shape"];
};

function BarSlice({
    nameKey,
    payload,
    className,
    style,
    fill,
    stroke,
    x,
    y,
    width,
    height,
    radius,
}: {
    nameKey: string;
    payload?: unknown;
    className?: string;
    style?: CSSProperties;
    fill?: string;
    stroke?: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    radius?: ComponentProps<typeof Rectangle>["radius"];
}) {
    const name = rowName(payload, nameKey);
    useRegisterSeries(name, name != null ? { label: name } : {}, "part");
    const paint = usePaint(name);
    return (
        <Rectangle
            x={x}
            y={y}
            width={width}
            height={height}
            radius={radius}
            fill={fill ?? "currentColor"}
            stroke={stroke}
            className={cn(paint.className, className)}
            style={colorStyle(paint.color, style)}
        />
    );
}

/** A bar series. Color it with `text-*` on `className`, or `color` for a CSS color. */
export function ChartBar({
    className,
    color,
    fill,
    stroke,
    style,
    radius = 4,
    name,
    nameKey,
    shape,
    activeBar = false,
    label = false,
    ...props
}: ChartBarProps) {
    useRegisterSeries(
        props.dataKey,
        {
            className,
            color,
            nameKey,
            ...(name != null ? { label: name } : {}),
        },
        "part",
    );
    const paint = usePaint(props.dataKey, className, color);

    return (
        <Bar
            radius={radius}
            {...props}
            name={name}
            fill={fill ?? "currentColor"}
            stroke={stroke}
            className={nameKey ? undefined : paint.className}
            style={nameKey ? style : colorStyle(paint.color, style)}
            shape={
                (shape ??
                    (nameKey ? (
                        <BarSlice nameKey={nameKey} />
                    ) : undefined)) as ChartBarProps["shape"]
            }
            activeBar={paintMarker(activeBar, paint.className, {
                fill: fill ?? "currentColor",
            })}
            label={paintLabel(label, paint.className)}
        />
    );
}

export type ChartLineProps = Omit<
    ComponentProps<typeof Line>,
    "fill" | "stroke"
> & {
    fill?: string;
    stroke?: string;
    color?: string;
};

/** A line series. Color it with `text-*` on `className`, or `color` for a CSS color. */
export function ChartLine({
    className,
    color,
    fill,
    stroke,
    style,
    type = "monotone",
    strokeWidth = 2,
    dot = false,
    activeDot = true,
    name,
    label = false,
    ...props
}: ChartLineProps) {
    useRegisterSeries(
        props.dataKey,
        { className, color, ...(name != null ? { label: name } : {}) },
        "part",
    );
    const paint = usePaint(props.dataKey, className, color);

    return (
        <Line
            type={type}
            strokeWidth={strokeWidth}
            {...props}
            name={name}
            fill={fill}
            stroke={stroke ?? "currentColor"}
            className={paint.className}
            style={colorStyle(paint.color, style)}
            dot={paintMarker(dot, paint.className, { fill: "currentColor" })}
            activeDot={paintMarker(activeDot, paint.className, {
                fill: "currentColor",
                stroke: "var(--background)",
            })}
            label={paintLabel(label, paint.className)}
        />
    );
}

export type ChartGradient = boolean | { from?: number; to?: number };

export type ChartAreaProps = Omit<
    ComponentProps<typeof Area>,
    "fill" | "stroke"
> & {
    fill?: string;
    stroke?: string;
    color?: string;
    /** Fade the fill. Pass opacities with `{ from, to }` (top, then bottom). */
    gradient?: ChartGradient;
};

/** An area series. Color it with `text-*` on `className`. Pass `gradient` for a fade. */
export function ChartArea({
    className,
    color,
    fill,
    stroke,
    style,
    gradient = false,
    type = "natural",
    dot = false,
    activeDot = true,
    name,
    label = false,
    ...props
}: ChartAreaProps) {
    useRegisterSeries(
        props.dataKey,
        { className, color, ...(name != null ? { label: name } : {}) },
        "part",
    );
    const paint = usePaint(props.dataKey, className, color);
    const id = `chart-gradient-${useId()}`;
    const stops = typeof gradient === "object" ? gradient : undefined;
    const from = stops?.from ?? 0.8;
    const to = stops?.to ?? 0.1;
    const fillPaint = fill ?? (gradient ? `url(#${id})` : "currentColor");

    return (
        <>
            {gradient ? (
                <defs>
                    <linearGradient
                        id={id}
                        className={paint.className}
                        style={colorStyle(paint.color)}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="5%"
                            stopColor="currentColor"
                            stopOpacity={from}
                        />
                        <stop
                            offset="95%"
                            stopColor="currentColor"
                            stopOpacity={to}
                        />
                    </linearGradient>
                </defs>
            ) : null}
            <Area
                type={type}
                {...props}
                name={name}
                fill={fillPaint}
                stroke={stroke ?? "currentColor"}
                className={paint.className}
                style={colorStyle(paint.color, style)}
                dot={paintMarker(dot, paint.className, {
                    fill: "currentColor",
                })}
                activeDot={paintMarker(activeDot, paint.className, {
                    fill: "currentColor",
                    stroke: "var(--background)",
                })}
                label={paintLabel(label, paint.className)}
            />
        </>
    );
}

export type ChartRadarProps = Omit<
    ComponentProps<typeof Radar>,
    "fill" | "stroke"
> & {
    fill?: string;
    stroke?: string;
    color?: string;
};

/** A radar series. Color it with `text-*` on `className`. */
export function ChartRadar({
    className,
    color,
    fill,
    stroke,
    style,
    fillOpacity = 0.6,
    name,
    label = false,
    ...props
}: ChartRadarProps) {
    useRegisterSeries(
        props.dataKey,
        { className, color, ...(name != null ? { label: name } : {}) },
        "part",
    );
    const paint = usePaint(props.dataKey, className, color);

    return (
        <Radar
            fillOpacity={fillOpacity}
            {...props}
            name={name}
            fill={fill ?? "currentColor"}
            stroke={stroke ?? "currentColor"}
            className={paint.className}
            style={colorStyle(paint.color, style)}
            label={paintLabel(label, paint.className)}
        />
    );
}

export type ChartScatterProps = Omit<
    ComponentProps<typeof Scatter>,
    "fill" | "stroke"
> & {
    fill?: string;
    stroke?: string;
    color?: string;
};

/** A scatter series. Color it with `text-*` on `className`. */
export function ChartScatter({
    className,
    color,
    fill,
    stroke,
    style,
    name,
    activeShape = true,
    label = false,
    ...props
}: ChartScatterProps) {
    useRegisterSeries(
        props.dataKey,
        { className, color, ...(name != null ? { label: name } : {}) },
        "part",
    );
    const paint = usePaint(props.dataKey, className, color);

    return (
        <Scatter
            {...props}
            name={name}
            fill={fill ?? "currentColor"}
            stroke={stroke}
            className={paint.className}
            style={colorStyle(paint.color, style)}
            activeShape={paintMarker(activeShape, paint.className, {
                fill: fill ?? "currentColor",
            })}
            label={paintLabel(label, paint.className)}
        />
    );
}

function PieSlice(props: {
    name?: string | number;
    index?: number;
    fill?: string;
    className?: string;
    style?: CSSProperties;
}) {
    const {
        name: sliceName,
        index = 0,
        fill,
        className,
        style,
        ...geometry
    } = props as {
        name?: string | number;
        index?: number;
        fill?: string;
        className?: string;
        style?: CSSProperties;
        [key: string]: unknown;
    };
    const name = asKey(sliceName) ?? `slice-${index}`;
    useRegisterSeries(
        name,
        sliceName != null ? { label: sliceName } : {},
        "part",
    );
    const paint = usePaint(name, undefined, undefined, index);

    return (
        <Sector
            {...(geometry as ComponentProps<typeof Sector>)}
            fill={fill ?? "currentColor"}
            className={cn(paint.className, className)}
            style={colorStyle(paint.color, style)}
        />
    );
}

export type ChartPieProps = Omit<
    ComponentProps<typeof Pie>,
    "fill" | "stroke" | "shape"
> & {
    fill?: string;
    stroke?: string;
    shape?: ComponentProps<typeof Pie>["shape"];
};

/** A pie or donut. Slice colors follow the palette, or a `ChartSeries` per name. */
export function ChartPie({
    className,
    fill,
    stroke,
    shape,
    ...props
}: ChartPieProps) {
    return (
        <Pie
            {...props}
            fill={fill ?? "currentColor"}
            stroke={stroke}
            className={className}
            shape={(shape ?? <PieSlice />) as ChartPieProps["shape"]}
        />
    );
}

function RadialSlice({
    nameKey,
    payload,
    className,
    style,
    fill,
    index = 0,
    option,
    isActive,
    ...props
}: {
    nameKey: string;
    payload?: unknown;
    className?: string;
    style?: CSSProperties;
    fill?: string;
    index?: number;
    option?: unknown;
    isActive?: boolean;
}) {
    void option;
    void isActive;
    const name = rowName(payload, nameKey) ?? `slice-${index}`;
    useRegisterSeries(name, { label: name }, "part");
    const paint = usePaint(name, undefined, undefined, index);

    return (
        <Sector
            {...(props as ComponentProps<typeof Sector>)}
            fill={fill ?? "currentColor"}
            className={cn(paint.className, className)}
            style={colorStyle(paint.color, style)}
        />
    );
}

export type ChartRadialBarProps = Omit<
    ComponentProps<typeof RadialBar>,
    "fill" | "stroke" | "shape"
> & {
    fill?: string;
    stroke?: string;
    color?: string;
    /** Color each ring from the named field on the data row. */
    nameKey?: string;
    shape?: ComponentProps<typeof RadialBar>["shape"];
};

/** A radial bar. Color it with `text-*` on `className`, or `nameKey` per row. */
export function ChartRadialBar({
    className,
    color,
    fill,
    stroke,
    style,
    name,
    nameKey,
    shape,
    label = false,
    ...props
}: ChartRadialBarProps) {
    useRegisterSeries(
        props.dataKey,
        {
            className,
            color,
            nameKey,
            ...(name != null ? { label: name } : {}),
        },
        "part",
    );
    const paint = usePaint(props.dataKey, className, color);

    return (
        <RadialBar
            {...props}
            name={name}
            fill={fill ?? "currentColor"}
            stroke={stroke}
            className={nameKey ? undefined : paint.className}
            style={nameKey ? style : colorStyle(paint.color, style)}
            shape={
                (shape ??
                    (nameKey ? (
                        <RadialSlice nameKey={nameKey} />
                    ) : undefined)) as ChartRadialBarProps["shape"]
            }
            label={paintLabel(label, paint.className)}
        />
    );
}

export type ChartGridProps = Omit<
    ComponentProps<typeof CartesianGrid>,
    "stroke" | "fill" | "horizontalFill" | "verticalFill"
>;

/** Grid lines at the ticks. `horizontal` and `vertical` choose the directions. */
export function ChartGrid({
    className,
    horizontal = true,
    vertical = true,
    ...props
}: ChartGridProps) {
    return (
        <CartesianGrid
            horizontal={horizontal}
            vertical={vertical}
            stroke="currentColor"
            className={cn("text-border/50", className)}
            {...props}
        />
    );
}

export type ChartPoint<TRow = unknown> = {
    dataKey: string | number | undefined;
    label: ReactNode;
    value: unknown;
    className: string | undefined;
    color: string | undefined;
    row: TRow | undefined;
    inactive: boolean;
    raw: unknown;
    /** @deprecated Use `raw`. */
    point: unknown;
};

type PayloadItem = {
    type?: string;
    name?: string | number;
    value?: unknown;
    dataKey?: unknown;
    payload?: unknown;
    inactive?: boolean;
};

type ChartPointsValue = {
    label?: unknown;
    points: ChartPoint[];
    onItemClick?: (
        data: unknown,
        index: number,
        event: MouseEvent<HTMLElement>,
    ) => void;
    onItemMouseEnter?: (
        data: unknown,
        index: number,
        event: MouseEvent<HTMLElement>,
    ) => void;
    onItemMouseLeave?: (
        data: unknown,
        index: number,
        event: MouseEvent<HTMLElement>,
    ) => void;
};

const ChartPointsContext = createContext<ChartPointsValue | null>(null);
const ChartPointContext = createContext<ChartPoint | null>(null);

/** The active tooltip or legend: its category label and one point per series. */
export function useChartPoints<TRow = unknown>() {
    const value = useContext(ChartPointsContext);
    if (!value) {
        throw new Error(
            "useChartPoints must be used within a chart tooltip or legend",
        );
    }
    return value as {
        label: unknown;
        points: ChartPoint<TRow>[];
    };
}

/** The series point currently being rendered inside a tooltip or legend item. */
export function useChartPoint<TRow = unknown>() {
    const point = useContext(ChartPointContext);
    if (!point) {
        throw new Error("useChartPoint must be used within a chart item");
    }
    return point as ChartPoint<TRow>;
}

function resolvePoint(item: PayloadItem, store: SeriesStore): ChartPoint {
    const paint = store.getPaint();
    const dataKey = asKey(item.dataKey);
    const name = asKey(item.name);
    const seriesMeta = dataKey != null ? store.getMeta(dataKey) : undefined;
    const sliceKey =
        seriesMeta?.nameKey != null
            ? rowName(item.payload, seriesMeta.nameKey)
            : undefined;
    const slice =
        sliceKey != null && paint[sliceKey] != null
            ? { key: sliceKey, paint: paint[sliceKey] }
            : undefined;
    const matched = slice ?? lookupSeries(paint, item.dataKey, item.name);
    const meta = matched ? store.getMeta(matched.key) : undefined;
    const row =
        item.payload != null && typeof item.payload === "object"
            ? item.payload
            : undefined;

    let label: ReactNode = meta?.label;
    if (label == null) {
        label = name ?? dataKey;
    }

    return {
        dataKey: matched?.key ?? dataKey ?? name,
        label,
        value: item.value,
        className: matched
            ? cn(seriesColor(matched.paint.index), matched.paint.className)
            : undefined,
        color: matched?.paint.color,
        row,
        inactive: Boolean(item.inactive),
        raw: item,
        point: item,
    };
}

function ChartTooltipContent({
    active,
    payload,
    label,
    className,
    children,
    itemSorter,
}: {
    active?: boolean;
    payload?: readonly PayloadItem[];
    label?: unknown;
    className?: string;
    children?: ReactNode;
    itemSorter?: TooltipItemSorter;
}) {
    const store = useSeriesStore();

    if (!active || !payload?.length) {
        return null;
    }

    const sorter: ChartItemSorter<PayloadItem> | undefined =
        itemSorter === "dataKey" ||
        itemSorter === "value" ||
        itemSorter === "name" ||
        typeof itemSorter === "function"
            ? (itemSorter as ChartItemSorter<PayloadItem>)
            : null;
    const points = sortChartItems(
        payload.filter((item) => item.type !== "none"),
        sorter,
    ).map((item) => resolvePoint(item, store));

    if (!points.length) {
        return null;
    }

    return (
        <ChartPointsContext.Provider value={{ label, points }}>
            <div
                className={cn(
                    "grid min-w-32 items-start gap-1.5 rounded-lg border border-border bg-popover px-2.5 py-1.5 text-xs text-popover-foreground shadow-xl",
                    className,
                )}
            >
                {children ?? (
                    <>
                        <ChartTooltipTitle />
                        <ChartTooltipItem />
                    </>
                )}
            </div>
        </ChartPointsContext.Provider>
    );
}

export type ChartTooltipProps = Omit<
    TooltipProps,
    "content" | "formatter" | "labelFormatter"
> & {
    content?: TooltipProps["content"];
    className?: string;
    children?: ReactNode;
};

/** Hover details for the active point. Compose title, items, and swatches as children. */
export function ChartTooltip({
    content,
    className,
    children,
    itemSorter,
    ...props
}: ChartTooltipProps) {
    return (
        <Tooltip
            {...props}
            itemSorter={itemSorter ?? (() => 0)}
            content={
                content ?? (
                    <ChartTooltipContent className={className}>
                        {children}
                    </ChartTooltipContent>
                )
            }
        />
    );
}

export type ChartTooltipTitleProps = Omit<ComponentProps<"div">, "children"> & {
    children?:
        ReactNode | ((label: unknown, points: ChartPoint[]) => ReactNode);
};

/** Active category, or a custom title. Pass children to replace the label. */
export function ChartTooltipTitle({
    className,
    children,
    ...props
}: ChartTooltipTitleProps) {
    const { label, points } = useChartPoints();

    let node: ReactNode = null;
    if (typeof children === "function") {
        node = children(label, points);
    } else if (children != null) {
        node = children;
    } else if (typeof label === "string" || typeof label === "number") {
        node = label;
    }

    if (node == null || node === "") {
        return null;
    }

    return (
        <div className={cn("font-medium", className)} {...props}>
            {node}
        </div>
    );
}

type ItemChildren = ReactNode | ((point: ChartPoint) => ReactNode);

/** One row per series in the tooltip. Repeats its children for each point. */
export function ChartTooltipItem({
    className,
    children,
    ...props
}: Omit<ComponentProps<"div">, "children"> & { children?: ItemChildren }) {
    const { points } = useChartPoints();

    return points.map((point, index) => (
        <ChartPointContext.Provider
            key={`${point.dataKey ?? "point"}-${index}`}
            value={point}
        >
            <div
                className={cn(
                    "flex w-full items-center gap-2 text-muted-foreground",
                    className,
                )}
                {...props}
            >
                {typeof children === "function"
                    ? children(point)
                    : (children ?? (
                          <>
                              <ChartSwatch />
                              <ChartName />
                              <ChartValue />
                          </>
                      ))}
            </div>
        </ChartPointContext.Provider>
    ));
}

/** Color chip for the current series. Size and shape are `className`. */
export function ChartSwatch({
    className,
    style,
    ...props
}: ComponentProps<"div">) {
    const point = useChartPoint();

    return (
        <div
            className={cn(
                "size-2.5 shrink-0 rounded-xs bg-current",
                point.className,
                className,
            )}
            style={colorStyle(point.color, style)}
            {...props}
        />
    );
}

export type ChartNameProps = Omit<ComponentProps<"span">, "children"> & {
    children?: ReactNode | ((label: ReactNode, point: ChartPoint) => ReactNode);
};

/** Series label for the current point. Pass children to replace it. */
export function ChartName({ className, children, ...props }: ChartNameProps) {
    const point = useChartPoint();

    let node: ReactNode;
    if (typeof children === "function") {
        node = children(point.label, point);
    } else if (children != null) {
        node = children;
    } else {
        node = point.label;
    }

    return (
        <span className={cn("flex items-center gap-1.5", className)} {...props}>
            {node}
        </span>
    );
}

export type ChartValueProps = Omit<ComponentProps<"span">, "children"> & {
    children?: ReactNode | ((value: unknown, point: ChartPoint) => ReactNode);
};

/** Formatted value for the current point, pinned to the right of the row. */
export function ChartValue({ className, children, ...props }: ChartValueProps) {
    const point = useChartPoint();
    const series = useChartSeries(point.dataKey);

    let node: ReactNode;
    if (typeof children === "function") {
        node = children(point.value, point);
    } else if (children != null) {
        node = children;
    } else {
        node = formatChartValue(point.value, series?.format);
        if (node == null) {
            return null;
        }
    }

    return (
        <span
            className={cn(
                "ml-auto font-mono font-medium text-foreground tabular-nums",
                className,
            )}
            {...props}
        >
            {node}
        </span>
    );
}

type LegendPayloadItem = PayloadItem & { value?: string };

function ChartLegendContent({
    payload,
    verticalAlign = "bottom",
    layout = "horizontal",
    align = "center",
    className,
    children,
    onClick,
    onMouseEnter,
    onMouseLeave,
}: {
    payload?: readonly LegendPayloadItem[];
    verticalAlign?: "top" | "bottom" | "middle";
    layout?: "horizontal" | "vertical";
    align?: "left" | "center" | "right";
    className?: string;
    children?: ReactNode;
    onClick?: ChartPointsValue["onItemClick"];
    onMouseEnter?: ChartPointsValue["onItemMouseEnter"];
    onMouseLeave?: ChartPointsValue["onItemMouseLeave"];
}) {
    const store = useSeriesStore();

    if (!payload?.length) {
        return null;
    }

    const points = payload
        .filter((entry) => entry.type !== "none")
        .map((entry) =>
            resolvePoint({ ...entry, name: entry.name ?? entry.value }, store),
        );

    if (!points.length) {
        return null;
    }

    return (
        <ChartPointsContext.Provider
            value={{
                points,
                onItemClick: onClick,
                onItemMouseEnter: onMouseEnter,
                onItemMouseLeave: onMouseLeave,
            }}
        >
            <div
                className={cn(
                    "flex gap-4",
                    layout === "vertical"
                        ? "flex-col items-start"
                        : "flex-row items-center",
                    align === "left"
                        ? "justify-start"
                        : align === "right"
                          ? "justify-end"
                          : "justify-center",
                    verticalAlign === "top" ? "pb-3" : undefined,
                    verticalAlign === "bottom" ? "pt-3" : undefined,
                    className,
                )}
            >
                {children ?? <ChartLegendItem />}
            </div>
        </ChartPointsContext.Provider>
    );
}

export type ChartLegendProps = Omit<LegendProps, "content"> & {
    content?: LegendProps["content"];
    className?: string;
    children?: ReactNode;
};

/** Series key. Compose items and swatches as children. `layout` and `align` are honored. */
export function ChartLegend({
    content,
    className,
    children,
    itemSorter = null,
    ...props
}: ChartLegendProps) {
    return (
        <Legend
            {...props}
            itemSorter={itemSorter}
            content={
                content ?? (
                    <ChartLegendContent className={className}>
                        {children}
                    </ChartLegendContent>
                )
            }
        />
    );
}

/** One legend entry per series. Repeats its children for each point. */
export function ChartLegendItem({
    className,
    children,
    ...props
}: Omit<ComponentProps<"div">, "children"> & { children?: ItemChildren }) {
    const { points, onItemClick, onItemMouseEnter, onItemMouseLeave } =
        useContext(ChartPointsContext) ?? { points: [] };

    return points.map((point, index) => (
        <ChartPointContext.Provider
            key={`${point.dataKey ?? "point"}-${index}`}
            value={point}
        >
            <div
                className={cn(
                    "flex items-center gap-1.5 data-[inactive=true]:opacity-40 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground",
                    onItemClick && "cursor-pointer",
                    className,
                )}
                data-inactive={point.inactive ? "true" : undefined}
                onClick={
                    onItemClick
                        ? (event) => onItemClick(point.raw, index, event)
                        : undefined
                }
                onMouseEnter={
                    onItemMouseEnter
                        ? (event) => onItemMouseEnter(point.raw, index, event)
                        : undefined
                }
                onMouseLeave={
                    onItemMouseLeave
                        ? (event) => onItemMouseLeave(point.raw, index, event)
                        : undefined
                }
                {...props}
            >
                {typeof children === "function"
                    ? children(point)
                    : (children ?? (
                          <>
                              <ChartSwatch />
                              <ChartName />
                          </>
                      ))}
            </div>
        </ChartPointContext.Provider>
    ));
}

/** Arbitrary JSX centered in a donut hole or radial gauge. */
export function ChartCenter({
    children,
    className,
    ...props
}: ComponentProps<"div">) {
    return (
        <Label
            content={(labelProps) => {
                const box = valueBox(labelProps.viewBox);
                if (!box) {
                    return <g />;
                }

                return (
                    <foreignObject
                        x={box.cx - box.size / 2}
                        y={box.cy - box.size / 2}
                        width={box.size}
                        height={box.size}
                        pointerEvents="none"
                    >
                        <div
                            className={cn(
                                "flex size-full flex-col items-center justify-center overflow-hidden text-center",
                                className,
                            )}
                            {...props}
                            {...{ xmlns: "http://www.w3.org/1999/xhtml" }}
                        >
                            {children}
                        </div>
                    </foreignObject>
                );
            }}
        />
    );
}

export type ChartTickInfo = {
    index: number;
    formatted: string;
    count: number;
};

export type ChartTickProps = {
    children: (value: unknown, info: ChartTickInfo) => ReactNode;
    x?: number | string;
    y?: number | string;
    payload?: { value?: unknown };
    index?: number;
    orientation?: TickOrientation;
    mirror?: boolean;
    visibleTicksCount?: number;
    tickFormatter?: (value: unknown, index: number) => string;
    className?: string;
    /** Box size for the tick. Named so an axis `width` or `height` cannot overwrite them. */
    tickWidth?: number;
    tickHeight?: number;
    placement?: "axis" | "center";
};

/** JSX tick for an axis. Used when `ChartXAxis` or `ChartYAxis` receives a render function. */
export function ChartTick({
    children,
    x = 0,
    y = 0,
    payload,
    index = 0,
    orientation = "bottom",
    mirror = false,
    visibleTicksCount,
    tickFormatter,
    className,
    tickWidth,
    tickHeight,
    placement = "axis",
}: ChartTickProps) {
    const chartWidth = useChartWidth();
    const chartHeight = useChartHeight();
    const horizontal = orientation === "top" || orientation === "bottom";
    const width = tickWidth ?? (horizontal ? 48 : 40);
    const height = tickHeight ?? (horizontal ? 24 : 20);
    const box = tickBox({
        orientation,
        mirror,
        placement,
        x: Number(x),
        y: Number(y),
        tickWidth: width,
        tickHeight: height,
        limitX: chartWidth,
        limitY: chartHeight,
    });
    const value = payload?.value;
    const formatted =
        typeof tickFormatter === "function"
            ? String(tickFormatter(value, index) ?? "")
            : value == null
              ? ""
              : String(value);

    return (
        <foreignObject
            x={box.x}
            y={box.y}
            width={width}
            height={height}
            className={className}
            pointerEvents="none"
        >
            <div
                className={cn(
                    "flex size-full overflow-hidden text-xs",
                    box.className,
                )}
                {...{ xmlns: "http://www.w3.org/1999/xhtml" }}
            >
                {children(value, {
                    index,
                    formatted,
                    count: visibleTicksCount ?? 0,
                })}
            </div>
        </foreignObject>
    );
}

type AxisTickRender = (value: unknown, info: ChartTickInfo) => ReactNode;

type AxisTickProps = {
    children?: AxisTickRender;
    tickWidth?: number;
    tickHeight?: number;
    format?: AxisFormat;
};

function axisTickElement(
    children: AxisTickRender,
    orientation: TickOrientation,
    mirror: boolean,
    tickWidth: number | undefined,
    tickHeight: number | undefined,
    placement: "axis" | "center",
) {
    return (
        <ChartTick
            orientation={orientation}
            mirror={mirror}
            tickWidth={tickWidth}
            tickHeight={tickHeight}
            placement={placement}
        >
            {children}
        </ChartTick>
    );
}

export type ChartXAxisProps = Omit<
    ComponentProps<typeof XAxis>,
    "children" | "stroke" | "format"
> &
    AxisTickProps;

/** Category or number X axis. A render function draws each tick as JSX. */
export function ChartXAxis({
    children,
    tick,
    tickWidth,
    tickHeight,
    tickLine = false,
    axisLine = false,
    tickMargin = 8,
    interval,
    className,
    format,
    tickFormatter,
    mirror = false,
    orientation = "bottom",
    ...props
}: ChartXAxisProps) {
    const jsx = typeof children === "function";
    const formatter = tickFormatterFromFormat(format, tickFormatter);

    return (
        <XAxis
            tickLine={tickLine}
            axisLine={axisLine}
            tickMargin={tickMargin}
            mirror={mirror}
            orientation={orientation}
            interval={interval ?? (jsx ? 0 : undefined)}
            tickFormatter={formatter}
            tick={
                tick !== undefined
                    ? tick
                    : jsx
                      ? axisTickElement(
                            children,
                            orientation,
                            mirror,
                            tickWidth,
                            tickHeight,
                            "axis",
                        )
                      : true
            }
            {...props}
            className={cn("text-muted-foreground", className)}
        />
    );
}

export type ChartYAxisProps = Omit<
    ComponentProps<typeof YAxis>,
    "children" | "stroke" | "format"
> &
    AxisTickProps;

/** Category or number Y axis. Text ticks size themselves with `width="auto"`. */
export function ChartYAxis({
    children,
    tick,
    tickWidth,
    tickHeight,
    tickLine = false,
    axisLine = false,
    tickMargin = 8,
    interval,
    className,
    format,
    tickFormatter,
    mirror = false,
    orientation = "left",
    width,
    ...props
}: ChartYAxisProps) {
    const jsx = typeof children === "function";
    const formatter = tickFormatterFromFormat(format, tickFormatter);

    return (
        <YAxis
            width={width ?? (jsx ? undefined : "auto")}
            tickLine={tickLine}
            axisLine={axisLine}
            tickMargin={tickMargin}
            mirror={mirror}
            orientation={orientation}
            interval={interval ?? (jsx ? 0 : undefined)}
            tickFormatter={formatter}
            tick={
                tick !== undefined
                    ? tick
                    : jsx
                      ? axisTickElement(
                            children,
                            orientation,
                            mirror,
                            tickWidth,
                            tickHeight,
                            "axis",
                        )
                      : true
            }
            {...props}
            className={cn("text-muted-foreground", className)}
        />
    );
}

export type ChartPolarGridProps = Omit<
    ComponentProps<typeof PolarGrid>,
    "stroke"
> & { stroke?: string };

/** Concentric grid for radar and radial charts. */
export function ChartPolarGrid({
    className,
    stroke,
    ...props
}: ChartPolarGridProps) {
    return (
        <PolarGrid
            stroke={stroke ?? "currentColor"}
            className={cn("text-border/50", className)}
            {...props}
        />
    );
}

export type ChartPolarAngleAxisProps = Omit<
    ComponentProps<typeof PolarAngleAxis>,
    "children" | "stroke" | "format"
> &
    AxisTickProps;

/** Category labels around a radar chart. A render function draws each tick as JSX. */
export function ChartPolarAngleAxis({
    children,
    tick,
    tickWidth,
    tickHeight,
    className,
    format,
    tickFormatter,
    ...props
}: ChartPolarAngleAxisProps) {
    const jsx = typeof children === "function";
    const formatter = tickFormatterFromFormat(format, tickFormatter);

    return (
        <PolarAngleAxis
            tickFormatter={formatter}
            tick={
                tick !== undefined
                    ? tick
                    : jsx
                      ? axisTickElement(
                            children,
                            "bottom",
                            false,
                            tickWidth,
                            tickHeight,
                            "center",
                        )
                      : true
            }
            {...props}
            className={cn("text-muted-foreground", className)}
        />
    );
}

/** Radius axis for radar and radial charts. Place `ChartCenter` inside a gauge. */
export function ChartPolarRadiusAxis({
    className,
    ...props
}: ComponentProps<typeof PolarRadiusAxis>) {
    return (
        <PolarRadiusAxis
            {...props}
            className={cn("text-muted-foreground", className)}
        />
    );
}

function useBorrowedPaint(series: string | undefined, className?: string) {
    const entry = useChartSeries(series);
    return {
        className: cn(
            series ? seriesColor(entry?.index ?? 0) : "text-muted-foreground",
            entry?.className,
            className,
        ),
        color: entry?.color,
    };
}

function referenceLabel(label: ReactNode, className: string) {
    if (label == null || label === false) {
        return undefined;
    }
    if (typeof label === "string" || typeof label === "number") {
        return { value: label, fill: "currentColor", className };
    }
    if (isValidElement(label)) {
        return label as ReactElement<SVGElement>;
    }
    return undefined;
}

export type ChartReferenceLineProps = Omit<
    ComponentProps<typeof ReferenceLine>,
    "label" | "stroke"
> & {
    stroke?: string;
    /** Borrow a series color. */
    series?: string;
    label?: ReactNode;
};

/** A marker line across the plot. Color comes from `series` or `className`. */
export function ChartReferenceLine({
    className,
    series,
    label,
    stroke,
    style,
    children,
    ...props
}: ChartReferenceLineProps) {
    const paint = useBorrowedPaint(series, className);

    return (
        <ReferenceLine
            {...props}
            stroke={stroke ?? "currentColor"}
            className={paint.className}
            style={colorStyle(paint.color, style)}
            label={referenceLabel(label, paint.className)}
        >
            {children}
        </ReferenceLine>
    );
}

export type ChartReferenceAreaProps = Omit<
    ComponentProps<typeof ReferenceArea>,
    "label" | "stroke" | "fill"
> & {
    stroke?: string;
    fill?: string;
    series?: string;
    label?: ReactNode;
};

/** A shaded band. Color comes from `series` or `className`. */
export function ChartReferenceArea({
    className,
    series,
    label,
    stroke,
    fill,
    fillOpacity = 0.12,
    style,
    children,
    ...props
}: ChartReferenceAreaProps) {
    const paint = useBorrowedPaint(series, className);

    return (
        <ReferenceArea
            {...props}
            fill={fill ?? "currentColor"}
            stroke={stroke ?? "currentColor"}
            fillOpacity={fillOpacity}
            className={paint.className}
            style={colorStyle(paint.color, style)}
            label={referenceLabel(label, paint.className)}
        >
            {children}
        </ReferenceArea>
    );
}

export type ChartReferenceDotProps = Omit<
    ComponentProps<typeof ReferenceDot>,
    "label" | "stroke" | "fill"
> & {
    stroke?: string;
    fill?: string;
    series?: string;
    label?: ReactNode;
};

/** A marker dot at a data coordinate. Color comes from `series` or `className`. */
export function ChartReferenceDot({
    className,
    series,
    label,
    stroke,
    fill,
    style,
    children,
    ...props
}: ChartReferenceDotProps) {
    const paint = useBorrowedPaint(series, className);

    return (
        <ReferenceDot
            {...props}
            fill={fill ?? "currentColor"}
            stroke={stroke ?? "var(--background)"}
            className={paint.className}
            style={colorStyle(paint.color, style)}
            label={referenceLabel(label, paint.className)}
        >
            {children}
        </ReferenceDot>
    );
}

export type ChartLabelListProps = Omit<
    ComponentProps<typeof LabelList>,
    "formatter"
> & {
    series?: string;
    format?: ChartFormat;
    formatter?: ComponentProps<typeof LabelList>["formatter"];
};

/** A label on every point of a series. `format` renders the text. `content` is custom JSX. */
export function ChartLabelList({
    className,
    series,
    format,
    formatter,
    fill,
    ...props
}: ChartLabelListProps) {
    const paint = useBorrowedPaint(series, className);
    const formatLabel =
        formatter ??
        (format
            ? (value: unknown) => {
                  const formatted = formatChartValue(value, format);
                  if (
                      typeof formatted === "string" ||
                      typeof formatted === "number"
                  ) {
                      return formatted;
                  }
                  return value == null ? "" : String(value);
              }
            : undefined);

    return (
        <LabelList
            {...props}
            fill={fill ?? "currentColor"}
            className={paint.className}
            formatter={formatLabel}
        />
    );
}

/** A brush for panning a long series. */
export function ChartBrush({
    className,
    fill = "var(--muted)",
    stroke = "var(--border)",
    ...props
}: ComponentProps<typeof Brush>) {
    return (
        <Brush
            fill={fill}
            stroke={stroke}
            {...props}
            className={cn("text-muted-foreground", className)}
        />
    );
}
