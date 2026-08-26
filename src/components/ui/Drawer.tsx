import type { ComponentProps } from "react";

import {
    ShadcnDrawer,
    ShadcnDrawerClose,
    ShadcnDrawerContent,
    ShadcnDrawerDescription,
    ShadcnDrawerFooter,
    ShadcnDrawerHeader,
    ShadcnDrawerOverlay,
    ShadcnDrawerPortal,
    ShadcnDrawerTitle,
    ShadcnDrawerTrigger,
} from "@/components/shadcn/ShadcnDrawer";

/** A panel that slides in from the edge. */
export function Drawer(props: ComponentProps<typeof ShadcnDrawer>) {
    return <ShadcnDrawer {...props} />;
}

export function DrawerTrigger(
    props: ComponentProps<typeof ShadcnDrawerTrigger>,
) {
    return <ShadcnDrawerTrigger {...props} />;
}

export function DrawerPortal(props: ComponentProps<typeof ShadcnDrawerPortal>) {
    return <ShadcnDrawerPortal {...props} />;
}

export function DrawerClose(props: ComponentProps<typeof ShadcnDrawerClose>) {
    return <ShadcnDrawerClose {...props} />;
}

export function DrawerOverlay(
    props: ComponentProps<typeof ShadcnDrawerOverlay>,
) {
    return <ShadcnDrawerOverlay {...props} />;
}

export function DrawerContent(
    props: ComponentProps<typeof ShadcnDrawerContent>,
) {
    return <ShadcnDrawerContent {...props} />;
}

export function DrawerHeader(props: ComponentProps<typeof ShadcnDrawerHeader>) {
    return <ShadcnDrawerHeader {...props} />;
}

export function DrawerFooter(props: ComponentProps<typeof ShadcnDrawerFooter>) {
    return <ShadcnDrawerFooter {...props} />;
}

export function DrawerTitle(props: ComponentProps<typeof ShadcnDrawerTitle>) {
    return <ShadcnDrawerTitle {...props} />;
}

export function DrawerDescription(
    props: ComponentProps<typeof ShadcnDrawerDescription>,
) {
    return <ShadcnDrawerDescription {...props} />;
}
