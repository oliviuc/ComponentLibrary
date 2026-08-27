import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/** A list of date shortcuts beside a calendar. */
export function CalendarPresets({
    className,
    ...props
}: ComponentProps<"div">) {
    return (
        <div
            data-slot="calendar-presets"
            className={cn("flex w-40 flex-col gap-1 border-r p-2", className)}
            {...props}
        />
    );
}

/** One shortcut in the preset list. */
export function CalendarPreset({
    className,
    selected,
    ...props
}: ComponentProps<"button"> & { selected?: boolean }) {
    return (
        <button
            type="button"
            data-slot="calendar-preset"
            data-selected={selected || undefined}
            aria-pressed={selected}
            className={cn(
                "flex w-full items-center rounded-md border border-transparent px-2 py-1.5 text-left text-sm font-normal text-muted-foreground outline-none",
                "hover:bg-muted hover:text-foreground",
                "focus-visible:border-border focus-visible:bg-muted focus-visible:text-foreground",
                "data-selected:bg-muted data-selected:font-medium data-selected:text-foreground",
                className,
            )}
            {...props}
        />
    );
}
