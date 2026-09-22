import {
    Children,
    createContext,
    isValidElement,
    useContext,
    type ComponentProps,
    type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

const VIEW_W = 100;
const VIEW_H = 32;
const PAD_X = 1.5;
const PAD_Y = 3;

type Point = readonly [number, number];

export type SparklineCurve = "linear" | "smooth" | "step";

type Scale = {
    data: readonly (number | null)[];
    x: (index: number) => number;
    y: (value: number) => number;
};

const ScaleContext = createContext<Scale | null>(null);

function useScale() {
    const scale = useContext(ScaleContext);
    if (!scale) {
        throw new Error("Sparkline parts must be used within a <Sparkline>");
    }
    return scale;
}

function finite(data: readonly (number | null)[]) {
    return data.filter(
        (value): value is number => value != null && Number.isFinite(value),
    );
}

function makeScale(
    data: readonly (number | null)[],
    min: number | undefined,
    max: number | undefined,
): Scale {
    const values = finite(data);
    let lo = min ?? (values.length ? Math.min(...values) : 0);
    let hi = max ?? (values.length ? Math.max(...values) : 1);

    if (lo === hi) {
        const pad = Math.abs(lo) > 0 ? Math.abs(lo) * 0.5 : 1;
        lo -= pad;
        hi += pad;
    }

    const range = hi - lo || 1;
    const last = data.length - 1;
    const x = (index: number) =>
        last <= 0 ? VIEW_W / 2 : PAD_X + (index / last) * (VIEW_W - PAD_X * 2);
    const y = (value: number) =>
        VIEW_H - PAD_Y - ((value - lo) / range) * (VIEW_H - PAD_Y * 2);

    return { data, x, y };
}

function runs(scale: Scale): Point[][] {
    const segments: Point[][] = [];
    let current: Point[] = [];

    scale.data.forEach((value, index) => {
        if (value == null || !Number.isFinite(value)) {
            if (current.length) {
                segments.push(current);
            }
            current = [];
            return;
        }
        current.push([scale.x(index), scale.y(value)]);
    });

    if (current.length) {
        segments.push(current);
    }
    return segments;
}

function straightPath(pts: Point[]) {
    return pts
        .map(([px, py], index) => `${index === 0 ? "M" : "L"}${px} ${py}`)
        .join(" ");
}

function smoothPath(pts: Point[]) {
    if (pts.length < 2) {
        return straightPath(pts);
    }

    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i - 1] ?? pts[i];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[i + 2] ?? p2;
        const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
        const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
        const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
        const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
        d += ` C${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2[0]} ${p2[1]}`;
    }
    return d;
}

function stepPath(pts: Point[]) {
    if (!pts.length) {
        return "";
    }
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
        d += ` H${pts[i][0]} V${pts[i][1]}`;
    }
    return d;
}

function seriesPath(pts: Point[], curve: SparklineCurve) {
    if (curve === "smooth") {
        return smoothPath(pts);
    }
    if (curve === "step") {
        return stepPath(pts);
    }
    return straightPath(pts);
}

export type SparklineProps = Omit<ComponentProps<"div">, "children"> & {
    data: readonly (number | null)[];
    /** Lower bound of the scale. Defaults to the smallest value. */
    min?: number;
    /** Upper bound of the scale. Defaults to the largest value. */
    max?: number;
    children?: ReactNode;
};

/** A tiny trend. Compose a line, area, bars, and a baseline, or pass only `data`. */
export function Sparkline({
    data,
    min,
    max,
    className,
    children,
    "aria-label": ariaLabel,
    ...props
}: SparklineProps) {
    const scale = makeScale(data, min, max);
    const labeled = ariaLabel != null;
    const hasChild = Children.toArray(children).some((child) =>
        isValidElement(child),
    );

    return (
        <ScaleContext.Provider value={scale}>
            <div
                data-slot="sparkline"
                aria-hidden={labeled ? undefined : true}
                role={labeled ? "img" : undefined}
                aria-label={ariaLabel}
                className={cn(
                    "pointer-events-none relative h-10 w-full overflow-hidden text-chart-2",
                    className,
                )}
                {...props}
            >
                <svg
                    viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                    preserveAspectRatio="none"
                    fill="none"
                    className="absolute inset-0 size-full"
                    aria-hidden
                >
                    {hasChild ? children : <SparklineLine />}
                </svg>
            </div>
        </ScaleContext.Provider>
    );
}

export type SparklineLineProps = {
    curve?: SparklineCurve;
    strokeWidth?: number;
    className?: string;
};

/** The trend line. `curve` is `linear`, `smooth`, or `step`. */
export function SparklineLine({
    curve = "linear",
    strokeWidth = 1.5,
    className,
}: SparklineLineProps) {
    const scale = useScale();
    return runs(scale).map((pts, index) =>
        pts.length < 2 ? null : (
            <path
                key={index}
                d={seriesPath(pts, curve)}
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                className={className}
            />
        ),
    );
}

export type SparklineAreaProps = {
    curve?: SparklineCurve;
    strokeWidth?: number;
    className?: string;
};

/** A filled trend. The line on top uses `className`; the fill is softer. */
export function SparklineArea({
    curve = "linear",
    strokeWidth = 1.5,
    className,
}: SparklineAreaProps) {
    const scale = useScale();
    const zero = scale.y(0);

    return runs(scale).map((pts, index) => {
        if (pts.length < 2) {
            return null;
        }
        const last = pts[pts.length - 1];
        const first = pts[0];
        return (
            <g key={index} className={className}>
                <path
                    d={`${seriesPath(pts, curve)} L${last[0]} ${zero} L${first[0]} ${zero} Z`}
                    fill="currentColor"
                    fillOpacity={0.2}
                    stroke="none"
                />
                <path
                    d={seriesPath(pts, curve)}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    fill="none"
                />
            </g>
        );
    });
}

export type SparklineBarProps = {
    className?: string;
    /** Color for bars below zero. */
    negativeClassName?: string;
};

/** Columns from zero. A negative value grows downward. */
export function SparklineBar({
    className,
    negativeClassName,
}: SparklineBarProps) {
    const scale = useScale();
    const sharedZero = scale.y(0);
    const zeroInDomain = sharedZero >= PAD_Y && sharedZero <= VIEW_H - PAD_Y;
    const values = finite(scale.data);
    const dataMin = values.length ? Math.min(...values) : 0;
    const dataMax = values.length ? Math.max(...values) : 0;
    const lo = Math.min(dataMin, 0);
    const hi = Math.max(dataMax, 0);
    const range = hi - lo || 1;
    const y = zeroInDomain
        ? scale.y
        : (value: number) =>
              VIEW_H - PAD_Y - ((value - lo) / range) * (VIEW_H - PAD_Y * 2);
    const zero = y(0);
    const count = scale.data.length;
    const inner = VIEW_W - PAD_X * 2;
    const gap = count > 1 ? Math.min(1.2, inner / count / 4) : 0;
    const width =
        count > 0 ? (inner - gap * Math.max(count - 1, 0)) / count : 0;

    return scale.data.map((value, index) => {
        if (value == null || !Number.isFinite(value)) {
            return null;
        }
        const y1 = y(value);
        const top = Math.min(zero, y1);
        const height = Math.max(Math.abs(y1 - zero), value === 0 ? 0.6 : 0);
        return (
            <rect
                key={index}
                x={PAD_X + index * (width + gap)}
                y={top}
                width={Math.max(width, 0.6)}
                height={height}
                fill="currentColor"
                className={cn(className, value < 0 && negativeClassName)}
            />
        );
    });
}

export type SparklineBaselineProps = {
    /** Data value the line sits on. Defaults to zero. */
    value?: number;
    className?: string;
};

/** A dashed guide at a value. */
export function SparklineBaseline({
    value = 0,
    className,
}: SparklineBaselineProps) {
    const scale = useScale();
    const y = scale.y(value);
    return (
        <line
            x1={PAD_X}
            x2={VIEW_W - PAD_X}
            y1={y}
            y2={y}
            stroke="currentColor"
            strokeWidth={1}
            strokeDasharray="2 1.2"
            vectorEffect="non-scaling-stroke"
            className={className}
        />
    );
}
