import type { ComponentProps } from "react";

import { ShadcnLabel } from "@/components/shadcn/ShadcnLabel";

/** Names a field. Point htmlFor at the control id. */
export function Label(props: ComponentProps<typeof ShadcnLabel>) {
    return <ShadcnLabel {...props} />;
}
