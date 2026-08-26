import type { ComponentProps } from "react";

import {
    ShadcnRadioGroup,
    ShadcnRadioGroupItem,
} from "@/components/shadcn/ShadcnRadioGroup";

/** Pick one option from a set. */
export function RadioGroup(props: ComponentProps<typeof ShadcnRadioGroup>) {
    return <ShadcnRadioGroup {...props} />;
}

/** A single choice inside a radio group. */
export function RadioGroupItem(
    props: ComponentProps<typeof ShadcnRadioGroupItem>,
) {
    return <ShadcnRadioGroupItem {...props} />;
}
