import type { ComponentProps } from "react";

import {
    ShadcnInputGroup,
    ShadcnInputGroupAddon,
    ShadcnInputGroupButton,
    ShadcnInputGroupInput,
    ShadcnInputGroupText,
    ShadcnInputGroupTextarea,
} from "@/components/shadcn/ShadcnInputGroup";

/** An input with addons, like a prefix or button. */
export function InputGroup(props: ComponentProps<typeof ShadcnInputGroup>) {
    return <ShadcnInputGroup {...props} />;
}

/** Icon, text, or actions attached to an input group. */
export function InputGroupAddon(
    props: ComponentProps<typeof ShadcnInputGroupAddon>,
) {
    return <ShadcnInputGroupAddon {...props} />;
}

/** A button that sits inside an input group. */
export function InputGroupButton(
    props: ComponentProps<typeof ShadcnInputGroupButton>,
) {
    return <ShadcnInputGroupButton {...props} />;
}

/** Static text inside an input group addon. */
export function InputGroupText(
    props: ComponentProps<typeof ShadcnInputGroupText>,
) {
    return <ShadcnInputGroupText {...props} />;
}

/** The text field inside an input group. */
export function InputGroupInput(
    props: ComponentProps<typeof ShadcnInputGroupInput>,
) {
    return <ShadcnInputGroupInput {...props} />;
}

/** The textarea inside an input group. */
export function InputGroupTextarea(
    props: ComponentProps<typeof ShadcnInputGroupTextarea>,
) {
    return <ShadcnInputGroupTextarea {...props} />;
}
