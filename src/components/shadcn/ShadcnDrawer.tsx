import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils";

function ShadcnDrawer({
    ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
    return <DrawerPrimitive.Root data-slot="shadcn-drawer" {...props} />;
}

function ShadcnDrawerTrigger({
    ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
    return (
        <DrawerPrimitive.Trigger data-slot="shadcn-drawer-trigger" {...props} />
    );
}

function ShadcnDrawerPortal({
    ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
    return (
        <DrawerPrimitive.Portal data-slot="shadcn-drawer-portal" {...props} />
    );
}

function ShadcnDrawerClose({
    ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
    return <DrawerPrimitive.Close data-slot="shadcn-drawer-close" {...props} />;
}

function ShadcnDrawerOverlay({
    className,
    ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
    return (
        <DrawerPrimitive.Overlay
            data-slot="shadcn-drawer-overlay"
            className={cn(
                "fixed inset-0 z-50 bg-black/10 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
                className,
            )}
            {...props}
        />
    );
}

function ShadcnDrawerContent({
    className,
    children,
    ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
    return (
        <ShadcnDrawerPortal data-slot="shadcn-drawer-portal">
            <ShadcnDrawerOverlay />
            <DrawerPrimitive.Content
                data-slot="shadcn-drawer-content"
                className={cn(
                    "group/shadcn-drawer-content fixed z-50 flex h-auto flex-col bg-popover text-sm text-popover-foreground data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-xl data-[vaul-drawer-direction=bottom]:border-t data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:rounded-r-xl data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:rounded-l-xl data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-xl data-[vaul-drawer-direction=top]:border-b data-[vaul-drawer-direction=left]:sm:max-w-sm data-[vaul-drawer-direction=right]:sm:max-w-sm",
                    className,
                )}
                {...props}
            >
                <div className="mx-auto mt-4 hidden h-1.5 w-[100px] shrink-0 rounded-full bg-muted group-data-[vaul-drawer-direction=bottom]/shadcn-drawer-content:block" />
                {children}
            </DrawerPrimitive.Content>
        </ShadcnDrawerPortal>
    );
}

function ShadcnDrawerHeader({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="shadcn-drawer-header"
            className={cn(
                "flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/shadcn-drawer-content:text-center group-data-[vaul-drawer-direction=top]/shadcn-drawer-content:text-center md:gap-1.5 md:text-left",
                className,
            )}
            {...props}
        />
    );
}

function ShadcnDrawerFooter({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="shadcn-drawer-footer"
            className={cn("mt-auto flex flex-col gap-2 p-4", className)}
            {...props}
        />
    );
}

function ShadcnDrawerTitle({
    className,
    ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
    return (
        <DrawerPrimitive.Title
            data-slot="shadcn-drawer-title"
            className={cn("font-medium text-foreground", className)}
            {...props}
        />
    );
}

function ShadcnDrawerDescription({
    className,
    ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
    return (
        <DrawerPrimitive.Description
            data-slot="shadcn-drawer-description"
            className={cn("text-sm text-muted-foreground", className)}
            {...props}
        />
    );
}

export {
    ShadcnDrawer,
    ShadcnDrawerPortal,
    ShadcnDrawerOverlay,
    ShadcnDrawerTrigger,
    ShadcnDrawerClose,
    ShadcnDrawerContent,
    ShadcnDrawerHeader,
    ShadcnDrawerFooter,
    ShadcnDrawerTitle,
    ShadcnDrawerDescription,
};
