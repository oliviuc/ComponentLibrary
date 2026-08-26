import type { ComponentProps } from "react";

import { ShadcnInput } from "@/components/shadcn/ShadcnInput";

export function Input(props: ComponentProps<typeof ShadcnInput>) {
    return <ShadcnInput {...props} />;
}
