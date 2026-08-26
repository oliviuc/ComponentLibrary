import type { ComponentProps } from "react";

import { ShadcnInput } from "@/components/shadcn/ShadcnInput";

/** A single-line text field. */
export function Input(props: ComponentProps<typeof ShadcnInput>) {
    return <ShadcnInput {...props} />;
}
