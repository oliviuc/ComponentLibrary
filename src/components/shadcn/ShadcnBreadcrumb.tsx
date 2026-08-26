import * as React from "react";
import { Slot } from "radix-ui";
import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function ShadcnBreadcrumb({
    className,
    ...props
}: React.ComponentProps<"nav">) {
    return (
        <nav
            aria-label="breadcrumb"
            data-slot="shadcn-breadcrumb"
            className={cn(className)}
            {...props}
        />
    );
}

function ShadcnBreadcrumbList({
    className,
    ...props
}: React.ComponentProps<"ol">) {
    return (
        <ol
            data-slot="shadcn-breadcrumb-list"
            className={cn(
                "flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground sm:gap-2.5",
                className,
            )}
            {...props}
        />
    );
}

function ShadcnBreadcrumbItem({
    className,
    ...props
}: React.ComponentProps<"li">) {
    return (
        <li
            data-slot="shadcn-breadcrumb-item"
            className={cn("inline-flex items-center gap-1.5", className)}
            {...props}
        />
    );
}

function ShadcnBreadcrumbLink({
    asChild,
    className,
    ...props
}: React.ComponentProps<"a"> & {
    asChild?: boolean;
}) {
    const Comp = asChild ? Slot.Root : "a";

    return (
        <Comp
            data-slot="shadcn-breadcrumb-link"
            className={cn("transition-colors hover:text-foreground", className)}
            {...props}
        />
    );
}

function ShadcnBreadcrumbPage({
    className,
    ...props
}: React.ComponentProps<"span">) {
    return (
        <span
            data-slot="shadcn-breadcrumb-page"
            role="link"
            aria-disabled="true"
            aria-current="page"
            className={cn("font-normal text-foreground", className)}
            {...props}
        />
    );
}

function ShadcnBreadcrumbSeparator({
    children,
    className,
    ...props
}: React.ComponentProps<"li">) {
    return (
        <li
            data-slot="shadcn-breadcrumb-separator"
            role="presentation"
            aria-hidden="true"
            className={cn("[&>svg]:size-3.5", className)}
            {...props}
        >
            {children ?? <ChevronRightIcon />}
        </li>
    );
}

function ShadcnBreadcrumbEllipsis({
    className,
    ...props
}: React.ComponentProps<"span">) {
    return (
        <span
            data-slot="shadcn-breadcrumb-ellipsis"
            role="presentation"
            aria-hidden="true"
            className={cn(
                "flex size-5 items-center justify-center [&>svg]:size-4",
                className,
            )}
            {...props}
        >
            <MoreHorizontalIcon />
            <span className="sr-only">More</span>
        </span>
    );
}

export {
    ShadcnBreadcrumb,
    ShadcnBreadcrumbList,
    ShadcnBreadcrumbItem,
    ShadcnBreadcrumbLink,
    ShadcnBreadcrumbPage,
    ShadcnBreadcrumbSeparator,
    ShadcnBreadcrumbEllipsis,
};
