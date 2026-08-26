import type { ComponentProps } from "react";

import { ShadcnSwitch } from "@/components/shadcn/ShadcnSwitch";

/** Turn a setting on or off. Size is always default. */
export function Switch(
    props: Omit<ComponentProps<typeof ShadcnSwitch>, "size">,
) {
    return <ShadcnSwitch {...props} size="default" />;
}
