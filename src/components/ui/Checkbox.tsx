import type { ComponentProps } from "react";

import { ShadcnCheckbox } from "@/components/shadcn/ShadcnCheckbox";

export function Checkbox(props: ComponentProps<typeof ShadcnCheckbox>) {
    return <ShadcnCheckbox {...props} />;
}
