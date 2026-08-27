import type { ComponentProps } from "react";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { ClearButton } from "@/components/custom/ClearButton";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/Popover";

/** Pick a date from a calendar. */
export function DatePicker(props: ComponentProps<typeof Popover>) {
    return <Popover {...props} />;
}

export function DatePickerTrigger({
    className,
    children,
    placeholder,
    clearable,
    onClear,
    disabled,
    ...props
}: ComponentProps<"button"> & {
    placeholder?: string;
    clearable?: boolean;
    onClear?: () => void;
}) {
    const isEmpty = children == null || children === "";
    const showClear = Boolean(clearable && !isEmpty && !disabled);

    return (
        <PopoverTrigger asChild aria-haspopup="dialog">
            <button
                type="button"
                data-slot="date-picker-trigger"
                disabled={disabled}
                className={cn(
                    "flex h-9 w-full min-w-0 items-center justify-start gap-2 rounded-md border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none",
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
                <CalendarIcon className="size-4 text-muted-foreground" />
                <span
                    data-slot="date-picker-value"
                    className={cn(
                        "flex-1 truncate text-left",
                        isEmpty && "text-muted-foreground",
                    )}
                >
                    {isEmpty ? placeholder : children}
                </span>
                {showClear ? <ClearButton onClick={onClear} /> : null}
            </button>
        </PopoverTrigger>
    );
}

export function DatePickerContent({
    className,
    align = "start",
    ...props
}: ComponentProps<typeof PopoverContent>) {
    return (
        <PopoverContent
            align={align}
            className={cn("w-auto gap-0 p-0", className)}
            {...props}
        />
    );
}
