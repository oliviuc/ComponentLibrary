import type { ComponentProps } from "react";

import { ShadcnSeparator } from "@/components/shadcn/ShadcnSeparator";

/** A line that divides content. */
export function Separator(props: ComponentProps<typeof ShadcnSeparator>) {
    return <ShadcnSeparator {...props} />;
}
