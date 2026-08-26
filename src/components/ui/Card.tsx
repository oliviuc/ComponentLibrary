import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/** A grouped block of related content. */
export function Card({ className, ...props }: ComponentProps<"div">) {
    return (
        <div
            data-slot="card"
            className={cn(
                "rounded-xl border border-border bg-card p-6 text-sm text-card-foreground",
                className,
            )}
            {...props}
        />
    );
}
