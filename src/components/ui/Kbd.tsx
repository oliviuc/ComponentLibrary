import type { ComponentProps } from "react";

import { ShadcnKbd, ShadcnKbdGroup } from "@/components/shadcn/ShadcnKbd";

/** A keyboard key. */
export function Kbd(props: ComponentProps<typeof ShadcnKbd>) {
    return <ShadcnKbd {...props} />;
}

/** A row of keyboard keys. */
export function KbdGroup(props: ComponentProps<typeof ShadcnKbdGroup>) {
    return <ShadcnKbdGroup {...props} />;
}
