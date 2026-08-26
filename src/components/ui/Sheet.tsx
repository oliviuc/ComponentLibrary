import type { ComponentProps } from "react";

import {
    ShadcnSheet,
    ShadcnSheetClose,
    ShadcnSheetContent,
    ShadcnSheetDescription,
    ShadcnSheetFooter,
    ShadcnSheetHeader,
    ShadcnSheetOverlay,
    ShadcnSheetPortal,
    ShadcnSheetTitle,
    ShadcnSheetTrigger,
} from "@/components/shadcn/ShadcnSheet";

/** A panel that slides over the page. */
export function Sheet(props: ComponentProps<typeof ShadcnSheet>) {
    return <ShadcnSheet {...props} />;
}

export function SheetTrigger(props: ComponentProps<typeof ShadcnSheetTrigger>) {
    return <ShadcnSheetTrigger {...props} />;
}

export function SheetPortal(props: ComponentProps<typeof ShadcnSheetPortal>) {
    return <ShadcnSheetPortal {...props} />;
}

export function SheetClose(props: ComponentProps<typeof ShadcnSheetClose>) {
    return <ShadcnSheetClose {...props} />;
}

export function SheetOverlay(props: ComponentProps<typeof ShadcnSheetOverlay>) {
    return <ShadcnSheetOverlay {...props} />;
}

export function SheetContent(props: ComponentProps<typeof ShadcnSheetContent>) {
    return <ShadcnSheetContent {...props} />;
}

export function SheetHeader(props: ComponentProps<typeof ShadcnSheetHeader>) {
    return <ShadcnSheetHeader {...props} />;
}

export function SheetFooter(props: ComponentProps<typeof ShadcnSheetFooter>) {
    return <ShadcnSheetFooter {...props} />;
}

export function SheetTitle(props: ComponentProps<typeof ShadcnSheetTitle>) {
    return <ShadcnSheetTitle {...props} />;
}

export function SheetDescription(
    props: ComponentProps<typeof ShadcnSheetDescription>,
) {
    return <ShadcnSheetDescription {...props} />;
}
