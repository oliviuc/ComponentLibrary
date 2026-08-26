import type { ComponentProps } from "react";

import { ShadcnBadge } from "@/components/shadcn/ShadcnBadge";

export function Badge(props: ComponentProps<typeof ShadcnBadge>) {
    return <ShadcnBadge {...props} />;
}
