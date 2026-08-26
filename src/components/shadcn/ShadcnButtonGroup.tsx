import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";
import { ShadcnSeparator } from "@/components/shadcn/ShadcnSeparator";

const shadcnButtonGroupVariants = cva(
    "group/shadcn-button-group flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=shadcn-button-group]]:gap-2 [&>input]:flex-1",
    {
        variants: {
            orientation: {
                horizontal:
                    "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-md!",
                vertical:
                    "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-md!",
            },
        },
        defaultVariants: {
            orientation: "horizontal",
        },
    },
);

function ShadcnButtonGroup({
    className,
    orientation,
    ...props
}: React.ComponentProps<"div"> &
    VariantProps<typeof shadcnButtonGroupVariants>) {
    return (
        <div
            role="group"
            data-slot="shadcn-button-group"
            data-orientation={orientation}
            className={cn(
                shadcnButtonGroupVariants({ orientation }),
                className,
            )}
            {...props}
        />
    );
}

function ShadcnButtonGroupText({
    className,
    asChild = false,
    ...props
}: React.ComponentProps<"div"> & {
    asChild?: boolean;
}) {
    const Comp = asChild ? Slot.Root : "div";

    return (
        <Comp
            data-slot="shadcn-button-group-text"
            className={cn(
                "flex items-center gap-2 rounded-md border bg-muted px-2.5 text-sm font-medium shadow-xs [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
                className,
            )}
            {...props}
        />
    );
}

function ShadcnButtonGroupSeparator({
    className,
    orientation = "vertical",
    ...props
}: React.ComponentProps<typeof ShadcnSeparator>) {
    return (
        <ShadcnSeparator
            data-slot="shadcn-button-group-separator"
            orientation={orientation}
            className={cn(
                "relative self-stretch bg-input data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto",
                className,
            )}
            {...props}
        />
    );
}

export {
    ShadcnButtonGroup,
    ShadcnButtonGroupSeparator,
    ShadcnButtonGroupText,
    shadcnButtonGroupVariants,
};
