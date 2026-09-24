"use client";

import type { ComponentProps } from "react";
import { Group, Panel, Separator } from "react-resizable-panels";

import { cn } from "@/lib/utils";

function ShadcnResizablePanelGroup({
    className,
    ...props
}: ComponentProps<typeof Group>) {
    return (
        <Group
            data-slot="shadcn-resizable-panel-group"
            className={cn("flex h-full w-full", className)}
            {...props}
        />
    );
}

function ShadcnResizablePanel({ ...props }: ComponentProps<typeof Panel>) {
    return <Panel data-slot="shadcn-resizable-panel" {...props} />;
}

function ShadcnResizableGrip({ className, ...props }: ComponentProps<"div">) {
    return (
        <div
            data-slot="shadcn-resizable-grip"
            className={cn(
                "z-10 flex h-6 w-1 shrink-0 rounded-lg bg-border",
                className,
            )}
            {...props}
        />
    );
}

function ShadcnResizableHandle({
    withHandle,
    className,
    children,
    ...props
}: ComponentProps<typeof Separator> & {
    withHandle?: boolean;
}) {
    return (
        <Separator
            data-slot="shadcn-resizable-handle"
            className={cn(
                "relative flex w-px items-center justify-center bg-border ring-offset-background after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-hidden aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2 [&[aria-orientation=horizontal]>div]:rotate-90",
                className,
            )}
            {...props}
        >
            {children}
            {withHandle ? <ShadcnResizableGrip /> : null}
        </Separator>
    );
}

export {
    ShadcnResizableGrip,
    ShadcnResizableHandle,
    ShadcnResizablePanel,
    ShadcnResizablePanelGroup,
};
