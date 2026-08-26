import type { ComponentProps } from "react";

import {
    ShadcnBreadcrumb,
    ShadcnBreadcrumbEllipsis,
    ShadcnBreadcrumbItem,
    ShadcnBreadcrumbLink,
    ShadcnBreadcrumbList,
    ShadcnBreadcrumbPage,
    ShadcnBreadcrumbSeparator,
} from "@/components/shadcn/ShadcnBreadcrumb";

/** Shows where you are in a hierarchy. */
export function Breadcrumb(props: ComponentProps<typeof ShadcnBreadcrumb>) {
    return <ShadcnBreadcrumb {...props} />;
}

export function BreadcrumbList(
    props: ComponentProps<typeof ShadcnBreadcrumbList>,
) {
    return <ShadcnBreadcrumbList {...props} />;
}

export function BreadcrumbItem(
    props: ComponentProps<typeof ShadcnBreadcrumbItem>,
) {
    return <ShadcnBreadcrumbItem {...props} />;
}

export function BreadcrumbLink(
    props: ComponentProps<typeof ShadcnBreadcrumbLink>,
) {
    return <ShadcnBreadcrumbLink {...props} />;
}

export function BreadcrumbPage(
    props: ComponentProps<typeof ShadcnBreadcrumbPage>,
) {
    return <ShadcnBreadcrumbPage {...props} />;
}

export function BreadcrumbSeparator(
    props: ComponentProps<typeof ShadcnBreadcrumbSeparator>,
) {
    return <ShadcnBreadcrumbSeparator {...props} />;
}

export function BreadcrumbEllipsis(
    props: ComponentProps<typeof ShadcnBreadcrumbEllipsis>,
) {
    return <ShadcnBreadcrumbEllipsis {...props} />;
}
