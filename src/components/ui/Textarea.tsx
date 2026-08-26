import type { ComponentProps } from "react";

import { ShadcnTextarea } from "@/components/shadcn/ShadcnTextarea";

export function Textarea(props: ComponentProps<typeof ShadcnTextarea>) {
    return <ShadcnTextarea {...props} />;
}
