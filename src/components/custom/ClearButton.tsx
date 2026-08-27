import type { ComponentProps } from "react";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/** Clears the value of a field. */
export function ClearButton({
    className,
    children,
    onClick,
    onPointerDown,
    onKeyDown,
    ...props
}: ComponentProps<"span">) {
    return (
        <span
            data-slot="clear-button"
            role="button"
            aria-label="Clear"
            className={cn(
                "flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-sm text-muted-foreground outline-none",
                "hover:bg-muted hover:text-foreground",
                "focus-visible:bg-muted focus-visible:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
                className,
            )}
            {...props}
            tabIndex={0}
            onPointerDown={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onPointerDown?.(event);
            }}
            onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onClick?.(event);
            }}
            onKeyDown={(event) => {
                event.stopPropagation();
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    event.currentTarget.click();
                }
                onKeyDown?.(event);
            }}
        >
            {children ?? <XIcon className="size-3.5" />}
        </span>
    );
}
