import type { ComponentProps } from "react";
import { Popover as PopoverPrimitive } from "radix-ui";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/Popover";

/** Pick one item from a list. */
export function Select(props: ComponentProps<typeof Popover>) {
    return <Popover {...props} />;
}

export function SelectTrigger({
    className,
    children,
    placeholder,
    ...props
}: ComponentProps<"button"> & { placeholder?: string }) {
    const isEmpty = children == null || children === "";

    return (
        <PopoverTrigger asChild aria-haspopup="listbox">
            <button
                type="button"
                data-slot="select-trigger"
                className={cn(
                    "flex h-9 w-full min-w-0 items-center justify-between gap-1.5 rounded-md border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none",
                    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "aria-expanded:bg-muted",
                    "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
                    "dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
                    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
                    className,
                )}
                {...props}
            >
                <span
                    data-slot="select-value"
                    className={cn(
                        "flex-1 truncate text-left",
                        isEmpty && "text-muted-foreground",
                    )}
                >
                    {isEmpty ? placeholder : children}
                </span>
                <ChevronDownIcon className="size-4 text-muted-foreground" />
            </button>
        </PopoverTrigger>
    );
}

export function SelectContent({
    className,
    align = "start",
    side = "bottom",
    children,
    ...props
}: ComponentProps<typeof PopoverContent>) {
    return (
        <PopoverContent
            align={align}
            side={side}
            role="presentation"
            className={cn(
                "h-fit max-h-[min(300px,var(--radix-popover-content-available-height))] w-(--radix-popover-trigger-width) min-w-(--radix-popover-trigger-width) max-w-(--radix-popover-trigger-width) gap-0 overflow-x-hidden overflow-y-auto p-1",
                className,
            )}
            {...props}
        >
            <ul
                data-slot="select-content"
                className="flex w-full list-none flex-col p-0"
            >
                {children}
            </ul>
        </PopoverContent>
    );
}

export function SelectOption({
    className,
    children,
    selected,
    disabled,
    ...props
}: ComponentProps<"button"> & { selected?: boolean }) {
    return (
        <li data-slot="select-option" className="w-full">
            <PopoverPrimitive.Close asChild>
                <button
                    type="button"
                    disabled={disabled}
                    data-selected={selected || undefined}
                    className={cn(
                        "relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none",
                        "hover:bg-accent hover:text-accent-foreground",
                        "focus-visible:bg-accent focus-visible:text-accent-foreground",
                        "disabled:pointer-events-none disabled:opacity-50",
                        "data-selected:bg-accent data-selected:text-accent-foreground",
                        className,
                    )}
                    {...props}
                >
                    <span className="truncate">{children}</span>
                    {selected ? (
                        <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
                            <CheckIcon className="size-4" />
                        </span>
                    ) : null}
                </button>
            </PopoverPrimitive.Close>
        </li>
    );
}
