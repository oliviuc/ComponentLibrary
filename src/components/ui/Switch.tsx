import type { ComponentProps } from "react";

import { ShadcnSwitch } from "@/components/shadcn/ShadcnSwitch";

export function Switch(props: ComponentProps<typeof ShadcnSwitch>) {
    return <ShadcnSwitch {...props} />;
}
