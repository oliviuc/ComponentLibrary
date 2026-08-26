"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { ShadcnButton } from "@/components/shadcn/ShadcnButton";

function ShadcnDialog({
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
    return <DialogPrimitive.Root data-slot="shadcn-dialog" {...props} />;
}

function ShadcnDialogTrigger({
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
    return (
        <DialogPrimitive.Trigger data-slot="shadcn-dialog-trigger" {...props} />
    );
}

function ShadcnDialogPortal({
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
    return (
        <DialogPrimitive.Portal data-slot="shadcn-dialog-portal" {...props} />
    );
}

function ShadcnDialogClose({
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
    return <DialogPrimitive.Close data-slot="shadcn-dialog-close" {...props} />;
}

function ShadcnDialogOverlay({
    className,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
    return (
        <DialogPrimitive.Overlay
            data-slot="shadcn-dialog-overlay"
            className={cn(
                "fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
                className,
            )}
            {...props}
        />
    );
}

function ShadcnDialogContent({
    className,
    children,
    showCloseButton = true,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
    showCloseButton?: boolean;
}) {
    return (
        <ShadcnDialogPortal>
            <ShadcnDialogOverlay />
            <DialogPrimitive.Content
                data-slot="shadcn-dialog-content"
                className={cn(
                    "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-6 rounded-xl bg-popover p-6 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-md data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
                    className,
                )}
                {...props}
            >
                {children}
                {showCloseButton && (
                    <DialogPrimitive.Close
                        data-slot="shadcn-dialog-close"
                        asChild
                    >
                        <ShadcnButton
                            variant="ghost"
                            className="absolute top-4 right-4"
                            size="icon-sm"
                        >
                            <XIcon />
                            <span className="sr-only">Close</span>
                        </ShadcnButton>
                    </DialogPrimitive.Close>
                )}
            </DialogPrimitive.Content>
        </ShadcnDialogPortal>
    );
}

function ShadcnDialogHeader({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="shadcn-dialog-header"
            className={cn("flex flex-col gap-2", className)}
            {...props}
        />
    );
}

function ShadcnDialogFooter({
    className,
    showCloseButton = false,
    children,
    ...props
}: React.ComponentProps<"div"> & {
    showCloseButton?: boolean;
}) {
    return (
        <div
            data-slot="shadcn-dialog-footer"
            className={cn(
                "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
                className,
            )}
            {...props}
        >
            {children}
            {showCloseButton && (
                <DialogPrimitive.Close asChild>
                    <ShadcnButton variant="outline">Close</ShadcnButton>
                </DialogPrimitive.Close>
            )}
        </div>
    );
}

function ShadcnDialogTitle({
    className,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
    return (
        <DialogPrimitive.Title
            data-slot="shadcn-dialog-title"
            className={cn("leading-none font-medium", className)}
            {...props}
        />
    );
}

function ShadcnDialogDescription({
    className,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
    return (
        <DialogPrimitive.Description
            data-slot="shadcn-dialog-description"
            className={cn(
                "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
                className,
            )}
            {...props}
        />
    );
}

export {
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
};
