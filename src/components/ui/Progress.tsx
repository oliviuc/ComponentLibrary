import type { ComponentProps } from "react";

import { ShadcnProgress } from "@/components/shadcn/ShadcnProgress";

/** Shows how far a task has come. */
export function Progress(props: ComponentProps<typeof ShadcnProgress>) {
    return <ShadcnProgress {...props} />;
}
