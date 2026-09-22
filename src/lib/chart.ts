import type { ReactNode } from "react";

export const SERIES_COLORS = [
    "text-chart-1",
    "text-chart-2",
    "text-chart-3",
    "text-chart-4",
    "text-chart-5",
] as const;

export function seriesColor(index: number) {
    return SERIES_COLORS[index % SERIES_COLORS.length];
}

/** Number format options, or a function that renders the value. */
export type ChartFormat =
    Intl.NumberFormatOptions | ((value: unknown) => ReactNode);

export type SeriesPaint = {
    index: number;
    className?: string;
    color?: string;
};

export type SeriesPatch = {
    label?: ReactNode;
    className?: string;
    color?: string;
    format?: ChartFormat;
    /** When set, tooltip rows resolve color from this field on the data row. */
    nameKey?: string;
};

type SeriesMeta = {
    label?: ReactNode;
    format?: ChartFormat;
    nameKey?: string;
    fromSeries: boolean;
    formatFromSeries: boolean;
};

export type SeriesStore = {
    subscribe: (listener: () => void) => () => void;
    getPaint: () => Readonly<Record<string, SeriesPaint>>;
    getMeta: (key: string) => SeriesMeta | undefined;
    register: (
        key: string,
        patch: SeriesPatch,
        source: "series" | "part",
    ) => void;
};

/**
 * Palette slots are assigned on first registration and never released, so
 * toggling a series does not recolor the ones that remain.
 * Labels and format live beside the paint snapshot: updating them must not
 * notify subscribers, or a new React element each render would loop.
 */
export function createSeriesStore(): SeriesStore {
    let paint: Record<string, SeriesPaint> = {};
    const meta = new Map<string, SeriesMeta>();
    let nextIndex = 0;
    const listeners = new Set<() => void>();

    return {
        subscribe(listener) {
            listeners.add(listener);
            return () => {
                listeners.delete(listener);
            };
        },
        getPaint: () => paint,
        getMeta: (key) => meta.get(key),
        register(key, patch, source) {
            const prevMeta = meta.get(key) ?? {
                fromSeries: false,
                formatFromSeries: false,
            };
            const fromSeries = source === "series" || prevMeta.fromSeries;
            const formatFromSeries =
                source === "series"
                    ? patch.format !== undefined || prevMeta.formatFromSeries
                    : prevMeta.formatFromSeries;

            let label = prevMeta.label;
            if (
                patch.label !== undefined &&
                !(source === "part" && prevMeta.fromSeries)
            ) {
                label = patch.label;
            }

            let format = prevMeta.format;
            if (
                patch.format !== undefined &&
                !(source === "part" && prevMeta.formatFromSeries)
            ) {
                format = patch.format;
            }

            meta.set(key, {
                label,
                format,
                nameKey: patch.nameKey ?? prevMeta.nameKey,
                fromSeries,
                formatFromSeries,
            });

            const prev = paint[key];
            const className =
                patch.className !== undefined
                    ? patch.className
                    : prev?.className;
            const color = patch.color !== undefined ? patch.color : prev?.color;
            const index = prev?.index ?? nextIndex;

            if (
                prev &&
                prev.index === index &&
                prev.className === className &&
                prev.color === color
            ) {
                return;
            }

            if (!prev) {
                nextIndex += 1;
            }

            paint = { ...paint, [key]: { index, className, color } };
            listeners.forEach((listener) => {
                listener();
            });
        },
    };
}

export function asKey(value: unknown): string | undefined {
    if (typeof value === "string" || typeof value === "number") {
        return String(value);
    }
    return undefined;
}

export function rowName(
    row: unknown,
    nameKey: string | undefined,
): string | undefined {
    if (nameKey == null || row == null || typeof row !== "object") {
        return undefined;
    }
    return asKey((row as Record<string, unknown>)[nameKey]);
}

export function lookupSeries(
    paint: Readonly<Record<string, SeriesPaint>>,
    dataKey: unknown,
    name: unknown,
): { key: string; paint: SeriesPaint } | undefined {
    const fromKey = asKey(dataKey);
    if (fromKey != null && paint[fromKey] != null) {
        return { key: fromKey, paint: paint[fromKey] };
    }

    const fromName = asKey(name);
    if (fromName != null && paint[fromName] != null) {
        return { key: fromName, paint: paint[fromName] };
    }

    return undefined;
}

function formatScalar(
    value: unknown,
    format?: Intl.NumberFormatOptions,
): string | null {
    if (typeof value === "number" && Number.isFinite(value)) {
        return format
            ? new Intl.NumberFormat(undefined, format).format(value)
            : value.toLocaleString();
    }
    if (value == null) {
        return null;
    }
    return String(value);
}

/** Locale number, a series format, or `low–high` for a two-value range. */
export function formatChartValue(
    value: unknown,
    format?: ChartFormat,
): ReactNode {
    if (typeof format === "function") {
        return format(value);
    }

    if (Array.isArray(value)) {
        const parts = value.map((item) => formatScalar(item, format));
        if (parts.every((part) => part == null)) {
            return null;
        }
        return parts.map((part) => part ?? "").join("–");
    }

    return formatScalar(value, format);
}

export type ChartItemSorter<T> =
    | "dataKey"
    | "value"
    | "name"
    | ((item: T) => number | string | undefined)
    | null;

function compareSort(a: unknown, b: unknown) {
    if (a == null && b == null) {
        return 0;
    }
    if (a == null) {
        return 1;
    }
    if (b == null) {
        return -1;
    }
    if (typeof a === "number" && typeof b === "number") {
        return a - b;
    }
    return String(a).localeCompare(String(b), undefined, { numeric: true });
}

/** `null` and `undefined` keep payload order. */
export function sortChartItems<T extends object>(
    items: readonly T[],
    sorter: ChartItemSorter<T> | undefined,
): T[] {
    const copy = [...items];
    if (sorter == null) {
        return copy;
    }

    if (typeof sorter === "function") {
        copy.sort((a, b) => compareSort(sorter(a), sorter(b)));
        return copy;
    }

    copy.sort((a, b) =>
        compareSort(
            (a as Record<string, unknown>)[sorter],
            (b as Record<string, unknown>)[sorter],
        ),
    );
    return copy;
}

export type AxisFormat =
    Intl.NumberFormatOptions | ((value: unknown) => string);

export function tickFormatterFromFormat(
    format: AxisFormat | undefined,
    tickFormatter: ((value: unknown, index: number) => string) | undefined,
) {
    if (tickFormatter) {
        return tickFormatter;
    }
    if (!format) {
        return undefined;
    }
    if (typeof format === "function") {
        return (value: unknown) => format(value);
    }

    const numberFormat = new Intl.NumberFormat(undefined, format);
    return (value: unknown) =>
        typeof value === "number" && Number.isFinite(value)
            ? numberFormat.format(value)
            : value == null
              ? ""
              : String(value);
}

export type TickOrientation = "top" | "bottom" | "left" | "right";

export function clampTick(
    anchor: number,
    size: number,
    limit: number | undefined,
): { start: number; align: "start" | "center" | "end" } {
    const start = anchor - size / 2;

    if (start < 0) {
        return { start: 0, align: "start" };
    }

    if (limit != null && start + size > limit) {
        return { start: Math.max(0, limit - size), align: "end" };
    }

    return { start, align: "center" };
}

function flipOrientation(orientation: TickOrientation): TickOrientation {
    switch (orientation) {
        case "top":
            return "bottom";
        case "bottom":
            return "top";
        case "left":
            return "right";
        default:
            return "left";
    }
}

export function tickBox({
    orientation,
    mirror = false,
    placement = "axis",
    x,
    y,
    tickWidth,
    tickHeight,
    limitX,
    limitY,
}: {
    orientation: TickOrientation;
    mirror?: boolean;
    placement?: "axis" | "center";
    x: number;
    y: number;
    tickWidth: number;
    tickHeight: number;
    limitX?: number;
    limitY?: number;
}): { x: number; y: number; className: string } {
    if (placement === "center") {
        const horizontal = clampTick(x, tickWidth, limitX);
        const vertical = clampTick(y, tickHeight, limitY);
        return {
            x: horizontal.start,
            y: vertical.start,
            className: "items-center justify-center",
        };
    }

    const side = mirror ? flipOrientation(orientation) : orientation;

    switch (side) {
        case "top": {
            const tick = clampTick(x, tickWidth, limitX);
            return {
                x: tick.start,
                y: y - tickHeight,
                className:
                    tick.align === "start"
                        ? "items-end justify-start"
                        : tick.align === "end"
                          ? "items-end justify-end"
                          : "items-end justify-center",
            };
        }
        case "left": {
            const tick = clampTick(y, tickHeight, limitY);
            return {
                x: x - tickWidth,
                y: tick.start,
                className:
                    tick.align === "start"
                        ? "items-start justify-end"
                        : tick.align === "end"
                          ? "items-end justify-end"
                          : "items-center justify-end",
            };
        }
        case "right": {
            const tick = clampTick(y, tickHeight, limitY);
            return {
                x,
                y: tick.start,
                className:
                    tick.align === "start"
                        ? "items-start justify-start"
                        : tick.align === "end"
                          ? "items-end justify-start"
                          : "items-center justify-start",
            };
        }
        default: {
            const tick = clampTick(x, tickWidth, limitX);
            return {
                x: tick.start,
                y,
                className:
                    tick.align === "start"
                        ? "items-start justify-start"
                        : tick.align === "end"
                          ? "items-start justify-end"
                          : "items-start justify-center",
            };
        }
    }
}

type PolarBox = {
    cx?: number;
    cy?: number;
    innerRadius?: number;
    outerRadius?: number;
};

type CartesianBox = {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
};

/** Center and diameter of a donut hole or radial gauge, in SVG units. */
export function valueBox(
    viewBox: unknown,
): { cx: number; cy: number; size: number } | null {
    if (viewBox == null || typeof viewBox !== "object") {
        return null;
    }

    const box = viewBox as PolarBox & CartesianBox;

    if (typeof box.cx === "number" && typeof box.cy === "number") {
        const radius =
            typeof box.innerRadius === "number" && box.innerRadius > 0
                ? box.innerRadius
                : typeof box.outerRadius === "number" && box.outerRadius > 0
                  ? box.outerRadius * 0.55
                  : 64;
        return { cx: box.cx, cy: box.cy, size: radius * 2 };
    }

    if (
        typeof box.x === "number" &&
        typeof box.y === "number" &&
        typeof box.width === "number" &&
        typeof box.height === "number"
    ) {
        return {
            cx: box.x + box.width / 2,
            cy: box.y + box.height / 2,
            size: Math.min(box.width, box.height),
        };
    }

    return null;
}
