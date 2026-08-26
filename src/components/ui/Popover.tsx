import type { ComponentProps } from "react";

import {
    ShadcnPopover,
    ShadcnPopoverAnchor,
    ShadcnPopoverContent,
    ShadcnPopoverDescription,
    ShadcnPopoverHeader,
    ShadcnPopoverTitle,
    ShadcnPopoverTrigger,
} from "@/components/shadcn/ShadcnPopover";

/** A small panel anchored to a control. */
export function Popover(props: ComponentProps<typeof ShadcnPopover>) {
    return <ShadcnPopover {...props} />;
}

export function PopoverTrigger(
    props: ComponentProps<typeof ShadcnPopoverTrigger>,
) {
    return <ShadcnPopoverTrigger {...props} />;
}

export function PopoverContent(
    props: ComponentProps<typeof ShadcnPopoverContent>,
) {
    return <ShadcnPopoverContent {...props} />;
}

export function PopoverAnchor(
    props: ComponentProps<typeof ShadcnPopoverAnchor>,
) {
    return <ShadcnPopoverAnchor {...props} />;
}

export function PopoverHeader(
    props: ComponentProps<typeof ShadcnPopoverHeader>,
) {
    return <ShadcnPopoverHeader {...props} />;
}

export function PopoverTitle(props: ComponentProps<typeof ShadcnPopoverTitle>) {
    return <ShadcnPopoverTitle {...props} />;
}

export function PopoverDescription(
    props: ComponentProps<typeof ShadcnPopoverDescription>,
) {
    return <ShadcnPopoverDescription {...props} />;
}
