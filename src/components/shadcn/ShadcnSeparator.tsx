"use client";

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";

import { cn } from "@/lib/utils";

function ShadcnSeparator({
    className,
    orientation = "horizontal",
    ...props
}: SeparatorPrimitive.Props) {
    return (
        <SeparatorPrimitive
            data-slot="shadcn-separator"
            orientation={orientation}
            className={cn(
                "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
                className,
            )}
            {...props}
        />
    );
}

export { ShadcnSeparator };
