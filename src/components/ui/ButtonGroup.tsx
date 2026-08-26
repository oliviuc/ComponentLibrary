import type { ComponentProps } from "react";

import {
    ShadcnButtonGroup,
    ShadcnButtonGroupSeparator,
    ShadcnButtonGroupText,
} from "@/components/shadcn/ShadcnButtonGroup";

/** Join related buttons into one control. */
export function ButtonGroup(props: ComponentProps<typeof ShadcnButtonGroup>) {
    return <ShadcnButtonGroup {...props} />;
}

/** A divider between buttons in a group. */
export function ButtonGroupSeparator(
    props: ComponentProps<typeof ShadcnButtonGroupSeparator>,
) {
    return <ShadcnButtonGroupSeparator {...props} />;
}

/** Static text inside a button group. */
export function ButtonGroupText(
    props: ComponentProps<typeof ShadcnButtonGroupText>,
) {
    return <ShadcnButtonGroupText {...props} />;
}
