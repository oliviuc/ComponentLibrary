import type { ComponentProps } from "react";

import { ShadcnSwitch } from "@/components/shadcn/ShadcnSwitch";

/** Turn a setting on or off. */
export function Switch(props: ComponentProps<typeof ShadcnSwitch>) {
    return <ShadcnSwitch {...props} />;
}
