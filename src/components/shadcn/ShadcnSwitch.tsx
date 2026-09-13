import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function ShadcnSwitch({
    className,
    size = "default",
    ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
    size?: "sm" | "default";
}) {
    return (
        <SwitchPrimitive.Root
            data-slot="shadcn-switch"
            data-size={size}
            className={cn(
                "peer group/shadcn-switch relative inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none group-has-[:focus-visible]/field-label:border-transparent group-has-[:focus-visible]/field-label:ring-0 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive-border aria-invalid:ring-3 aria-invalid:ring-destructive-ring data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] data-checked:bg-primary data-unchecked:bg-switch-unchecked data-disabled:cursor-not-allowed data-disabled:opacity-50",
                className,
            )}
            {...props}
        >
            <SwitchPrimitive.Thumb
                data-slot="shadcn-switch-thumb"
                className="pointer-events-none block rounded-full bg-switch-thumb-unchecked ring-0 transition-transform group-data-[size=default]/shadcn-switch:size-4 group-data-[size=sm]/shadcn-switch:size-3 group-data-[size=default]/shadcn-switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/shadcn-switch:data-checked:translate-x-[calc(100%-2px)] data-checked:bg-switch-thumb-checked group-data-[size=default]/shadcn-switch:data-unchecked:translate-x-0 group-data-[size=sm]/shadcn-switch:data-unchecked:translate-x-0"
            />
        </SwitchPrimitive.Root>
    );
}

export { ShadcnSwitch };
