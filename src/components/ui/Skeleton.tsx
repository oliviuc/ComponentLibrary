import type { ComponentProps } from "react";

import { ShadcnSkeleton } from "@/components/shadcn/ShadcnSkeleton";

/** A placeholder shown while content loads. */
export function Skeleton(props: ComponentProps<typeof ShadcnSkeleton>) {
    return <ShadcnSkeleton {...props} />;
}
