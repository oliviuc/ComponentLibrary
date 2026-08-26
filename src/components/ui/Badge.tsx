import type { ComponentProps } from "react";

import { ShadcnBadge } from "@/components/shadcn/ShadcnBadge";

/** A short label for status, counts, or categories. */
export function Badge(props: ComponentProps<typeof ShadcnBadge>) {
    return <ShadcnBadge {...props} />;
}
