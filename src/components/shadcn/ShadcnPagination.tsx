import * as React from "react";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    MoreHorizontalIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ShadcnButton } from "@/components/shadcn/ShadcnButton";

function ShadcnPagination({
    className,
    ...props
}: React.ComponentProps<"nav">) {
    return (
        <nav
            role="navigation"
            aria-label="pagination"
            data-slot="shadcn-pagination"
            className={cn("mx-auto flex w-full justify-center", className)}
            {...props}
        />
    );
}

function ShadcnPaginationContent({
    className,
    ...props
}: React.ComponentProps<"ul">) {
    return (
        <ul
            data-slot="shadcn-pagination-content"
            className={cn("flex items-center gap-1", className)}
            {...props}
        />
    );
}

function ShadcnPaginationItem({ ...props }: React.ComponentProps<"li">) {
    return <li data-slot="shadcn-pagination-item" {...props} />;
}

type ShadcnPaginationLinkProps = {
    isActive?: boolean;
} & Pick<React.ComponentProps<typeof ShadcnButton>, "size"> &
    React.ComponentProps<"a">;

function ShadcnPaginationLink({
    className,
    isActive,
    size = "icon",
    ...props
}: ShadcnPaginationLinkProps) {
    return (
        <ShadcnButton
            asChild
            variant={isActive ? "outline" : "ghost"}
            size={size}
            className={cn(className)}
        >
            <a
                aria-current={isActive ? "page" : undefined}
                data-slot="shadcn-pagination-link"
                data-active={isActive}
                {...props}
            />
        </ShadcnButton>
    );
}

function ShadcnPaginationPrevious({
    className,
    text = "Previous",
    ...props
}: React.ComponentProps<typeof ShadcnPaginationLink> & { text?: string }) {
    return (
        <ShadcnPaginationLink
            aria-label="Go to previous page"
            size="default"
            className={cn("pl-2!", className)}
            {...props}
        >
            <ChevronLeftIcon data-icon="inline-start" />
            <span className="hidden sm:block">{text}</span>
        </ShadcnPaginationLink>
    );
}

function ShadcnPaginationNext({
    className,
    text = "Next",
    ...props
}: React.ComponentProps<typeof ShadcnPaginationLink> & { text?: string }) {
    return (
        <ShadcnPaginationLink
            aria-label="Go to next page"
            size="default"
            className={cn("pr-2!", className)}
            {...props}
        >
            <span className="hidden sm:block">{text}</span>
            <ChevronRightIcon data-icon="inline-end" />
        </ShadcnPaginationLink>
    );
}

function ShadcnPaginationEllipsis({
    className,
    ...props
}: React.ComponentProps<"span">) {
    return (
        <span
            aria-hidden
            data-slot="shadcn-pagination-ellipsis"
            className={cn(
                "flex size-9 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
                className,
            )}
            {...props}
        >
            <MoreHorizontalIcon />
            <span className="sr-only">More pages</span>
        </span>
    );
}

export {
    ShadcnPagination,
    ShadcnPaginationContent,
    ShadcnPaginationEllipsis,
    ShadcnPaginationItem,
    ShadcnPaginationLink,
    ShadcnPaginationNext,
    ShadcnPaginationPrevious,
};
