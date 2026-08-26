import type { ComponentProps } from "react";

import {
    ShadcnDialog,
    ShadcnDialogClose,
    ShadcnDialogContent,
    ShadcnDialogDescription,
    ShadcnDialogFooter,
    ShadcnDialogHeader,
    ShadcnDialogOverlay,
    ShadcnDialogPortal,
    ShadcnDialogTitle,
    ShadcnDialogTrigger,
} from "@/components/shadcn/ShadcnDialog";

/** A modal for focused tasks. */
export function Dialog(props: ComponentProps<typeof ShadcnDialog>) {
    return <ShadcnDialog {...props} />;
}

export function DialogTrigger(
    props: ComponentProps<typeof ShadcnDialogTrigger>,
) {
    return <ShadcnDialogTrigger {...props} />;
}

export function DialogPortal(props: ComponentProps<typeof ShadcnDialogPortal>) {
    return <ShadcnDialogPortal {...props} />;
}

export function DialogClose(props: ComponentProps<typeof ShadcnDialogClose>) {
    return <ShadcnDialogClose {...props} />;
}

export function DialogOverlay(
    props: ComponentProps<typeof ShadcnDialogOverlay>,
) {
    return <ShadcnDialogOverlay {...props} />;
}

export function DialogContent(
    props: ComponentProps<typeof ShadcnDialogContent>,
) {
    return <ShadcnDialogContent {...props} />;
}

export function DialogHeader(props: ComponentProps<typeof ShadcnDialogHeader>) {
    return <ShadcnDialogHeader {...props} />;
}

export function DialogFooter(props: ComponentProps<typeof ShadcnDialogFooter>) {
    return <ShadcnDialogFooter {...props} />;
}

export function DialogTitle(props: ComponentProps<typeof ShadcnDialogTitle>) {
    return <ShadcnDialogTitle {...props} />;
}

export function DialogDescription(
    props: ComponentProps<typeof ShadcnDialogDescription>,
) {
    return <ShadcnDialogDescription {...props} />;
}
