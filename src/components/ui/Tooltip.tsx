import type { ComponentProps } from "react";

import {
    ShadcnTooltip,
    ShadcnTooltipContent,
    ShadcnTooltipProvider,
    ShadcnTooltipTrigger,
} from "@/components/shadcn/ShadcnTooltip";

/** Short hint on hover or focus. Wrap the app with TooltipProvider. */
export function Tooltip(props: ComponentProps<typeof ShadcnTooltip>) {
    return <ShadcnTooltip {...props} />;
}

export function TooltipTrigger(
    props: ComponentProps<typeof ShadcnTooltipTrigger>,
) {
    return <ShadcnTooltipTrigger {...props} />;
}

export function TooltipContent(
    props: ComponentProps<typeof ShadcnTooltipContent>,
) {
    return <ShadcnTooltipContent {...props} />;
}

export function TooltipProvider(
    props: ComponentProps<typeof ShadcnTooltipProvider>,
) {
    return <ShadcnTooltipProvider {...props} />;
}
