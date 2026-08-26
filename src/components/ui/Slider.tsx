import type { ComponentProps } from "react";

import { ShadcnSlider } from "@/components/shadcn/ShadcnSlider";

export function Slider(props: ComponentProps<typeof ShadcnSlider>) {
    return <ShadcnSlider {...props} />;
}
