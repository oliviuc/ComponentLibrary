import type { ComponentProps } from "react";

import { ShadcnCheckbox } from "@/components/shadcn/ShadcnCheckbox";

/** Select one option on or off. */
export function Checkbox(props: ComponentProps<typeof ShadcnCheckbox>) {
    return <ShadcnCheckbox {...props} />;
}
