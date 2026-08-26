import type { ComponentProps } from "react";

import {
    ShadcnButtonGroup,
    ShadcnButtonGroupSeparator,
    ShadcnButtonGroupText,
} from "@/components/shadcn/ShadcnButtonGroup";

export function ButtonGroup(props: ComponentProps<typeof ShadcnButtonGroup>) {
    return <ShadcnButtonGroup {...props} />;
}

export function ButtonGroupSeparator(
    props: ComponentProps<typeof ShadcnButtonGroupSeparator>,
) {
    return <ShadcnButtonGroupSeparator {...props} />;
}

export function ButtonGroupText(
    props: ComponentProps<typeof ShadcnButtonGroupText>,
) {
    return <ShadcnButtonGroupText {...props} />;
}
