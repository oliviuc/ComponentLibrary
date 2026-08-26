import type { ComponentProps } from "react";

import { ShadcnButton } from "@/components/shadcn/ShadcnButton";

export function Button(
    props: Omit<ComponentProps<typeof ShadcnButton>, "size">,
) {
    return <ShadcnButton {...props} size="default" />;
}
