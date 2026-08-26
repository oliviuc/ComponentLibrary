import * as React from "react";

import { cn } from "@/lib/utils";

function ShadcnCard({
    className,
    size = "default",
    ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
    return (
        <div
            data-slot="shadcn-card"
            data-size={size}
            className={cn(
                "group/shadcn-card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground shadow-xs ring-1 ring-foreground/10 [--card-spacing:--spacing(6)] has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(4)] *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
                className,
            )}
            {...props}
        />
    );
}

function ShadcnCardHeader({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="shadcn-card-header"
            className={cn(
                "group/shadcn-card-header @container/shadcn-card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=shadcn-card-action]:grid-cols-[1fr_auto] has-data-[slot=shadcn-card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
                className,
            )}
            {...props}
        />
    );
}

function ShadcnCardTitle({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="shadcn-card-title"
            className={cn(
                "text-base leading-normal font-medium group-data-[size=sm]/shadcn-card:text-sm",
                className,
            )}
            {...props}
        />
    );
}

function ShadcnCardDescription({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="shadcn-card-description"
            className={cn("text-sm text-muted-foreground", className)}
            {...props}
        />
    );
}

function ShadcnCardAction({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="shadcn-card-action"
            className={cn(
                "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
                className,
            )}
            {...props}
        />
    );
}

function ShadcnCardContent({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="shadcn-card-content"
            className={cn("flex flex-col gap-3 px-(--card-spacing)", className)}
            {...props}
        />
    );
}

function ShadcnCardFooter({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="shadcn-card-footer"
            className={cn(
                "flex items-center rounded-b-xl px-(--card-spacing) [.border-t]:pt-(--card-spacing)",
                className,
            )}
            {...props}
        />
    );
}

export {
    ShadcnCard,
    ShadcnCardHeader,
    ShadcnCardFooter,
    ShadcnCardTitle,
    ShadcnCardAction,
    ShadcnCardDescription,
    ShadcnCardContent,
};
