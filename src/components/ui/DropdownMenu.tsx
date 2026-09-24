import type { ComponentProps } from "react";

import {
    ShadcnDropdownMenu,
    ShadcnDropdownMenuCheckboxItem,
    ShadcnDropdownMenuContent,
    ShadcnDropdownMenuGroup,
    ShadcnDropdownMenuItem,
    ShadcnDropdownMenuLabel,
    ShadcnDropdownMenuPortal,
    ShadcnDropdownMenuRadioGroup,
    ShadcnDropdownMenuRadioItem,
    ShadcnDropdownMenuSeparator,
    ShadcnDropdownMenuShortcut,
    ShadcnDropdownMenuSub,
    ShadcnDropdownMenuSubContent,
    ShadcnDropdownMenuSubTrigger,
    ShadcnDropdownMenuTrigger,
} from "@/components/shadcn/ShadcnDropdownMenu";

/** A menu of actions opened from a button. */
export function DropdownMenu(props: ComponentProps<typeof ShadcnDropdownMenu>) {
    return <ShadcnDropdownMenu {...props} />;
}

export function DropdownMenuPortal(
    props: ComponentProps<typeof ShadcnDropdownMenuPortal>,
) {
    return <ShadcnDropdownMenuPortal {...props} />;
}

/** The button that opens the menu. Pass the button with `render`. */
export function DropdownMenuTrigger(
    props: ComponentProps<typeof ShadcnDropdownMenuTrigger>,
) {
    return <ShadcnDropdownMenuTrigger {...props} />;
}

/** The menu surface. */
export function DropdownMenuContent(
    props: ComponentProps<typeof ShadcnDropdownMenuContent>,
) {
    return <ShadcnDropdownMenuContent {...props} />;
}

/** A labeled section of menu items. */
export function DropdownMenuGroup(
    props: ComponentProps<typeof ShadcnDropdownMenuGroup>,
) {
    return <ShadcnDropdownMenuGroup {...props} />;
}

/** A section title. Place it inside a DropdownMenuGroup. */
export function DropdownMenuLabel(
    props: ComponentProps<typeof ShadcnDropdownMenuLabel>,
) {
    return <ShadcnDropdownMenuLabel {...props} />;
}

/** One action in the menu. */
export function DropdownMenuItem(
    props: ComponentProps<typeof ShadcnDropdownMenuItem>,
) {
    return <ShadcnDropdownMenuItem {...props} />;
}

/** A menu action that toggles. */
export function DropdownMenuCheckboxItem(
    props: ComponentProps<typeof ShadcnDropdownMenuCheckboxItem>,
) {
    return <ShadcnDropdownMenuCheckboxItem {...props} />;
}

/** A set of mutually exclusive menu actions. */
export function DropdownMenuRadioGroup(
    props: ComponentProps<typeof ShadcnDropdownMenuRadioGroup>,
) {
    return <ShadcnDropdownMenuRadioGroup {...props} />;
}

/** One choice inside a menu radio group. */
export function DropdownMenuRadioItem(
    props: ComponentProps<typeof ShadcnDropdownMenuRadioItem>,
) {
    return <ShadcnDropdownMenuRadioItem {...props} />;
}

/** A line between menu sections. */
export function DropdownMenuSeparator(
    props: ComponentProps<typeof ShadcnDropdownMenuSeparator>,
) {
    return <ShadcnDropdownMenuSeparator {...props} />;
}

/** A hint for a keyboard shortcut, shown at the end of an item. */
export function DropdownMenuShortcut(
    props: ComponentProps<typeof ShadcnDropdownMenuShortcut>,
) {
    return <ShadcnDropdownMenuShortcut {...props} />;
}

/** A nested menu. */
export function DropdownMenuSub(
    props: ComponentProps<typeof ShadcnDropdownMenuSub>,
) {
    return <ShadcnDropdownMenuSub {...props} />;
}

/** The item that opens a nested menu. */
export function DropdownMenuSubTrigger(
    props: ComponentProps<typeof ShadcnDropdownMenuSubTrigger>,
) {
    return <ShadcnDropdownMenuSubTrigger {...props} />;
}

/** The surface of a nested menu. */
export function DropdownMenuSubContent(
    props: ComponentProps<typeof ShadcnDropdownMenuSubContent>,
) {
    return <ShadcnDropdownMenuSubContent {...props} />;
}
