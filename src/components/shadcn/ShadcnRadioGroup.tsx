"use client";

import * as React from "react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function ShadcnRadioGroup({
    className,
    ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
    return (
        <RadioGroupPrimitive.Root
            data-slot="shadcn-radio-group"
            className={cn(
                "group/shadcn-radio-group grid w-full gap-3",
                className,
            )}
            {...props}
        />
    );
}

function ShadcnRadioGroupItem({
    className,
    ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
    return (
        <RadioGroupPrimitive.Item
            data-slot="shadcn-radio-group-item"
            className={cn(
                "group/shadcn-radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-input bg-input-background outline-none group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-input after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive-border aria-invalid:ring-3 aria-invalid:ring-destructive-ring aria-invalid:aria-checked:border-primary group-aria-invalid/shadcn-radio-group:border-destructive-border group-aria-invalid/shadcn-radio-group:ring-3 group-aria-invalid/shadcn-radio-group:ring-destructive-ring group-aria-invalid/shadcn-radio-group:aria-checked:border-primary data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground group-has-[:focus-visible]/field-label:data-checked:border-primary",
                className,
            )}
            {...props}
        >
            <RadioGroupPrimitive.Indicator
                data-slot="shadcn-radio-group-indicator"
                className="flex size-4 items-center justify-center"
            >
                <span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground" />
            </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
    );
}

export { ShadcnRadioGroup, ShadcnRadioGroupItem };
