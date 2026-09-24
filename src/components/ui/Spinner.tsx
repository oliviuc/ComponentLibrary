import type { ComponentProps } from "react";

import { ShadcnSpinner } from "@/components/shadcn/ShadcnSpinner";

/** A spinning indicator. Set the size and color with className. */
export function Spinner(props: ComponentProps<typeof ShadcnSpinner>) {
    return <ShadcnSpinner {...props} />;
}
