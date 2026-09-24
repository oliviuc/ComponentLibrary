import type { ComponentProps } from "react";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/** Clears the value of a field. */
export function ClearButton({
    className,
    children,
    onClick,
    onPointerDown,
    ...props
}: ComponentProps<"button">) {
    return (
        <button
            type="button"
            data-slot="clear-button"
            aria-label="Clear"
            className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-sm text-muted-foreground outline-none",
                "hover:bg-muted hover:text-foreground",
                "focus-visible:border-ring focus-visible:bg-muted focus-visible:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
                className,
            )}
            {...props}
            onPointerDown={(event) => {
                event.stopPropagation();
                onPointerDown?.(event);
            }}
            onClick={(event) => {
                event.stopPropagation();
                onClick?.(event);
            }}
        >
            {children ?? <XIcon className="size-3.5" />}
        </button>
    );
}
