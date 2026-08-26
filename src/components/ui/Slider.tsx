import type { ComponentProps } from "react";

import { ShadcnSlider } from "@/components/shadcn/ShadcnSlider";

/** Pick a value along a range. */
export function Slider(props: ComponentProps<typeof ShadcnSlider>) {
    return <ShadcnSlider {...props} />;
}
