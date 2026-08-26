import type { ComponentProps } from "react";

import { ShadcnTextarea } from "@/components/shadcn/ShadcnTextarea";

/** A multi-line text field. */
export function Textarea(props: ComponentProps<typeof ShadcnTextarea>) {
    return <ShadcnTextarea {...props} />;
}
