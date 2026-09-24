import { useLayoutEffect, useRef, useState, type ComponentProps } from "react";

import { ShadcnSlider } from "@/components/shadcn/ShadcnSlider";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/Tooltip";
import { cn } from "@/lib/utils";

type SliderProps = Omit<
    ComponentProps<typeof ShadcnSlider>,
    "onValueChange" | "onValueCommitted" | "value" | "defaultValue"
> & {
    value?: number[];
    defaultValue?: number[];
    onValueChange?: (value: number[]) => void;
    onValueCommitted?: (value: number[]) => void;
    /** Text shown above a thumb. Defaults to the number itself. */
    formatValue?: (value: number, index: number) => string;
};

function toValueList(value: number | readonly number[]) {
    return Array.isArray(value) ? [...value] : [value];
}

function formatSliderValue(value: number) {
    if (!Number.isFinite(value)) {
        return "";
    }
    if (Number.isInteger(value)) {
        return String(value);
    }
    return String(Math.round(value * 100) / 100);
}

/** Pick a value along a range. `value` is always a list, one number per thumb. The value shows above each thumb while you move it. */
export function Slider({
    "aria-label": ariaLabel,
    "aria-valuetext": ariaValueText,
    getAriaLabel,
    getAriaValueText,
    onValueChange,
    onValueCommitted,
    value,
    defaultValue,
    min = 0,
    max = 100,
    orientation = "horizontal",
    formatValue,
    className,
    ...props
}: SliderProps) {
    const [live, setLive] = useState<number[]>(() =>
        defaultValue ? [...defaultValue] : [min, max],
    );
    const shown = value ?? live;
    const [tipOpen, setTipOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const anchorRefs = useRef<(HTMLSpanElement | null)[]>([]);

    useLayoutEffect(() => {
        const root = rootRef.current;
        if (!root) {
            return;
        }
        const place = () => {
            const thumbs = root.querySelectorAll<HTMLElement>(
                "[data-slot=shadcn-slider-thumb]",
            );
            const rootBox = root.getBoundingClientRect();
            thumbs.forEach((thumb, index) => {
                const anchor = anchorRefs.current[index];
                if (!anchor) {
                    return;
                }
                const thumbBox = thumb.getBoundingClientRect();
                anchor.style.left = `${thumbBox.left - rootBox.left}px`;
                anchor.style.top = `${thumbBox.top - rootBox.top}px`;
                anchor.style.width = `${thumbBox.width}px`;
                anchor.style.height = `${thumbBox.height}px`;
            });
        };
        place();
        const frame = requestAnimationFrame(place);
        const thumbs = root.querySelectorAll("[data-slot=shadcn-slider-thumb]");
        const observer = new MutationObserver(place);
        thumbs.forEach((thumb) => {
            observer.observe(thumb, {
                attributes: true,
                attributeFilter: ["style"],
            });
        });
        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
        };
    }, [shown, tipOpen]);

    const hideTip = () => {
        const root = rootRef.current;
        const active = document.activeElement;
        if (root && active instanceof Node && root.contains(active)) {
            return;
        }
        setTipOpen(false);
    };

    return (
        <div
            ref={rootRef}
            className={cn("relative", className)}
            onPointerEnter={() => setTipOpen(true)}
            onPointerLeave={hideTip}
            onPointerDown={() => setTipOpen(true)}
            onFocus={() => setTipOpen(true)}
            onBlur={hideTip}
        >
            <ShadcnSlider
                {...props}
                min={min}
                max={max}
                orientation={orientation}
                value={value}
                defaultValue={defaultValue}
                className={cn("w-full", className)}
                getAriaLabel={
                    getAriaLabel ??
                    (ariaLabel != null ? () => ariaLabel : undefined)
                }
                getAriaValueText={
                    getAriaValueText ??
                    (ariaValueText != null ? () => ariaValueText : undefined)
                }
                onValueChange={(next) => {
                    const list = toValueList(next);
                    if (value === undefined) {
                        setLive(list);
                    }
                    setTipOpen(true);
                    onValueChange?.(list);
                }}
                onValueCommitted={
                    onValueCommitted
                        ? (next) => onValueCommitted(toValueList(next))
                        : undefined
                }
            />
            <TooltipProvider delayDuration={0}>
                {shown.map((thumbValue, index) => (
                    <Tooltip key={index} open={tipOpen}>
                        <TooltipTrigger asChild>
                            <span
                                ref={(node) => {
                                    anchorRefs.current[index] = node;
                                }}
                                aria-hidden
                                tabIndex={-1}
                                className="pointer-events-none absolute top-0 left-0"
                            />
                        </TooltipTrigger>
                        <TooltipContent
                            side={orientation === "vertical" ? "right" : "top"}
                            sideOffset={6}
                            className="px-2 py-1 tabular-nums"
                        >
                            {formatValue?.(thumbValue, index) ??
                                formatSliderValue(thumbValue)}
                        </TooltipContent>
                    </Tooltip>
                ))}
            </TooltipProvider>
        </div>
    );
}
