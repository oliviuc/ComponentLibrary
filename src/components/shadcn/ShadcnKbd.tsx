import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

function ShadcnKbd({ className, ...props }: ComponentProps<"kbd">) {
    return (
        <kbd
            data-slot="shadcn-kbd"
            className={cn(
                "pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm bg-muted px-1 font-sans text-xs font-medium text-muted-foreground select-none in-data-[slot=shadcn-tooltip-content]:bg-kbd-in-tooltip in-data-[slot=shadcn-tooltip-content]:text-background [&_svg:not([class*='size-'])]:size-3",
                className,
            )}
            {...props}
        />
    );
}

function ShadcnKbdGroup({ className, ...props }: ComponentProps<"kbd">) {
    return (
        <kbd
            data-slot="shadcn-kbd-group"
            className={cn("inline-flex items-center gap-1", className)}
            {...props}
        />
    );
}

export { ShadcnKbd, ShadcnKbdGroup };
