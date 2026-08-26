import type { ComponentProps } from "react";

import {
    ShadcnPagination,
    ShadcnPaginationContent,
    ShadcnPaginationEllipsis,
    ShadcnPaginationItem,
    ShadcnPaginationLink,
    ShadcnPaginationNext,
    ShadcnPaginationPrevious,
} from "@/components/shadcn/ShadcnPagination";

/** Page controls for a long list. */
export function Pagination(props: ComponentProps<typeof ShadcnPagination>) {
    return <ShadcnPagination {...props} />;
}

export function PaginationContent(
    props: ComponentProps<typeof ShadcnPaginationContent>,
) {
    return <ShadcnPaginationContent {...props} />;
}

export function PaginationItem(
    props: ComponentProps<typeof ShadcnPaginationItem>,
) {
    return <ShadcnPaginationItem {...props} />;
}

export function PaginationLink(
    props: ComponentProps<typeof ShadcnPaginationLink>,
) {
    return <ShadcnPaginationLink {...props} />;
}

export function PaginationPrevious(
    props: ComponentProps<typeof ShadcnPaginationPrevious>,
) {
    return <ShadcnPaginationPrevious {...props} />;
}

export function PaginationNext(
    props: ComponentProps<typeof ShadcnPaginationNext>,
) {
    return <ShadcnPaginationNext {...props} />;
}

export function PaginationEllipsis(
    props: ComponentProps<typeof ShadcnPaginationEllipsis>,
) {
    return <ShadcnPaginationEllipsis {...props} />;
}
