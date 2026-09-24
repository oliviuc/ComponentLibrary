import * as React from "react";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function ShadcnSelect<Value>({
    modal = false,
    ...props
}: SelectPrimitive.Root.Props<Value>) {
    return <SelectPrimitive.Root modal={modal} {...props} />;
}

function ShadcnSelectGroup({
    className,
    ...props
}: SelectPrimitive.Group.Props) {
    return (
        <SelectPrimitive.Group
            data-slot="shadcn-select-group"
            className={cn("scroll-my-1 p-1", className)}
            {...props}
        />
    );
}

function ShadcnSelectValue({
    className,
    ...props
}: SelectPrimitive.Value.Props) {
    return (
        <SelectPrimitive.Value
            data-slot="shadcn-select-value"
            className={cn("flex flex-1 truncate text-left", className)}
            {...props}
        />
    );
}

function ShadcnSelectTrigger({
    className,
    children,
    ...props
}: SelectPrimitive.Trigger.Props) {
    return (
        <SelectPrimitive.Trigger
            data-slot="shadcn-select-trigger"
            className={cn(
                "relative flex h-9 w-full min-w-0 items-center justify-between gap-1.5 rounded-md border border-input bg-input-background py-2 pr-8 pl-2.5 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none",
                "hover:bg-input-background-hover",
                "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "aria-expanded:bg-muted",
                "aria-invalid:border-destructive-border aria-invalid:ring-3 aria-invalid:ring-destructive-ring",
                "data-placeholder:text-muted-foreground",
                "*:data-[slot=shadcn-select-value]:line-clamp-1 *:data-[slot=shadcn-select-value]:flex *:data-[slot=shadcn-select-value]:items-center",
                className,
            )}
            {...props}
        >
            {children}
            <SelectPrimitive.Icon
                aria-hidden
                className="pointer-events-none absolute top-1/2 right-2 flex size-4 -translate-y-1/2 items-center justify-center text-muted-foreground"
            >
                <ChevronDownIcon className="size-4" />
            </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
    );
}

function ShadcnSelectContent({
    className,
    children,
    side = "bottom",
    sideOffset = 4,
    align = "start",
    alignOffset = 0,
    alignItemWithTrigger = false,
    ...props
}: SelectPrimitive.Popup.Props &
    Pick<
        SelectPrimitive.Positioner.Props,
        "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
    >) {
    return (
        <SelectPrimitive.Portal>
            <SelectPrimitive.Positioner
                side={side}
                sideOffset={sideOffset}
                align={align}
                alignOffset={alignOffset}
                alignItemWithTrigger={alignItemWithTrigger}
                className="isolate z-50"
            >
                <SelectPrimitive.Popup
                    data-slot="shadcn-select-content"
                    className={cn(
                        "relative isolate z-50 max-h-[min(300px,var(--available-height))] w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-md bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none",
                        "data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
                        className,
                    )}
                    {...props}
                >
                    <ShadcnSelectScrollUpButton />
                    <SelectPrimitive.List className="p-1">
                        {children}
                    </SelectPrimitive.List>
                    <ShadcnSelectScrollDownButton />
                </SelectPrimitive.Popup>
            </SelectPrimitive.Positioner>
        </SelectPrimitive.Portal>
    );
}

function ShadcnSelectLabel({
    className,
    ...props
}: SelectPrimitive.GroupLabel.Props) {
    return (
        <SelectPrimitive.GroupLabel
            data-slot="shadcn-select-label"
            className={cn(
                "px-2 py-1.5 text-xs text-muted-foreground",
                className,
            )}
            {...props}
        />
    );
}

function ShadcnSelectItem({
    className,
    children,
    ...props
}: SelectPrimitive.Item.Props) {
    return (
        <SelectPrimitive.Item
            data-slot="shadcn-select-item"
            className={cn(
                "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none",
                "data-highlighted:bg-accent data-highlighted:text-accent-foreground",
                "data-disabled:pointer-events-none data-disabled:opacity-50",
                className,
            )}
            {...props}
        >
            <SelectPrimitive.ItemText className="flex flex-1 shrink-0 truncate">
                {children}
            </SelectPrimitive.ItemText>
            <SelectPrimitive.ItemIndicator
                render={
                    <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
                }
            >
                <CheckIcon className="size-4" />
            </SelectPrimitive.ItemIndicator>
        </SelectPrimitive.Item>
    );
}

function ShadcnSelectSeparator({
    className,
    ...props
}: SelectPrimitive.Separator.Props) {
    return (
        <SelectPrimitive.Separator
            data-slot="shadcn-select-separator"
            className={cn(
                "pointer-events-none -mx-1 my-1 h-px bg-border",
                className,
            )}
            {...props}
        />
    );
}

function ShadcnSelectScrollUpButton({
    className,
    ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
    return (
        <SelectPrimitive.ScrollUpArrow
            data-slot="shadcn-select-scroll-up-button"
            className={cn(
                "sticky top-0 z-10 hidden w-full cursor-default items-center justify-center bg-popover py-1 data-visible:flex [&_svg:not([class*='size-'])]:size-4",
                className,
            )}
            {...props}
        >
            <ChevronUpIcon />
        </SelectPrimitive.ScrollUpArrow>
    );
}

function ShadcnSelectScrollDownButton({
    className,
    ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
    return (
        <SelectPrimitive.ScrollDownArrow
            data-slot="shadcn-select-scroll-down-button"
            className={cn(
                "sticky bottom-0 z-10 hidden w-full cursor-default items-center justify-center bg-popover py-1 data-visible:flex [&_svg:not([class*='size-'])]:size-4",
                className,
            )}
            {...props}
        >
            <ChevronDownIcon />
        </SelectPrimitive.ScrollDownArrow>
    );
}

export {
    ShadcnSelect,
    ShadcnSelectContent,
    ShadcnSelectGroup,
    ShadcnSelectItem,
    ShadcnSelectLabel,
    ShadcnSelectScrollDownButton,
    ShadcnSelectScrollUpButton,
    ShadcnSelectSeparator,
    ShadcnSelectTrigger,
    ShadcnSelectValue,
};
