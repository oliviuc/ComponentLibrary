"use client";

import type { ComponentProps } from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { ShadcnButton } from "@/components/shadcn/ShadcnButton";

const shadcnAttachmentVariants = cva(
    "group/shadcn-attachment relative flex w-fit max-w-full min-w-0 shrink-0 flex-wrap rounded-xl border bg-card text-card-foreground transition-colors focus-within:ring-1 focus-within:ring-ring/50 has-[>a,>button]:hover:bg-muted/50 data-[state=error]:border-destructive-border data-[state=idle]:border-dashed",
    {
        variants: {
            size: {
                default:
                    "gap-2 text-sm has-data-[slot=shadcn-attachment-content]:px-2.5 has-data-[slot=shadcn-attachment-content]:py-2 has-data-[slot=shadcn-attachment-media]:p-2",
                sm: "gap-2.5 text-xs has-data-[slot=shadcn-attachment-content]:px-2 has-data-[slot=shadcn-attachment-content]:py-1.5 has-data-[slot=shadcn-attachment-media]:p-1.5",
                xs: "gap-1.5 rounded-lg text-xs has-data-[slot=shadcn-attachment-content]:px-1.5 has-data-[slot=shadcn-attachment-content]:py-1 has-data-[slot=shadcn-attachment-media]:p-1",
            },
            orientation: {
                horizontal: "min-w-40 items-center",
                vertical:
                    "w-24 flex-col has-data-[slot=shadcn-attachment-content]:w-30",
            },
        },
    },
);

function ShadcnAttachment({
    className,
    state = "done",
    size = "default",
    orientation = "horizontal",
    ...props
}: ComponentProps<"div"> &
    VariantProps<typeof shadcnAttachmentVariants> & {
        state?: "idle" | "uploading" | "processing" | "error" | "done";
    }) {
    const busy = state === "uploading" || state === "processing";

    return (
        <div
            data-slot="shadcn-attachment"
            data-state={state}
            data-size={size}
            data-orientation={orientation}
            className={cn(
                shadcnAttachmentVariants({ size, orientation }),
                className,
            )}
            {...props}
            aria-busy={busy || undefined}
        />
    );
}

const shadcnAttachmentMediaVariants = cva(
    "relative flex aspect-square w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted text-foreground group-data-[orientation=vertical]/shadcn-attachment:w-full group-data-[size=sm]/shadcn-attachment:w-8 group-data-[size=xs]/shadcn-attachment:w-7 group-data-[size=xs]/shadcn-attachment:rounded-md group-data-[state=error]/shadcn-attachment:bg-destructive-soft group-data-[state=error]/shadcn-attachment:text-destructive group-data-[orientation=vertical]/shadcn-attachment:*:data-[slot=shadcn-spinner]:size-6! [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 group-data-[orientation=vertical]/shadcn-attachment:[&_svg:not([class*='size-'])]:size-6 group-data-[size=xs]/shadcn-attachment:[&_svg:not([class*='size-'])]:size-3.5",
    {
        variants: {
            variant: {
                icon: "",
                image: "opacity-60 group-data-[state=done]/shadcn-attachment:opacity-100 group-data-[state=idle]/shadcn-attachment:opacity-100 *:[img]:aspect-square *:[img]:w-full *:[img]:object-cover",
            },
        },
        defaultVariants: {
            variant: "icon",
        },
    },
);

function ShadcnAttachmentMedia({
    className,
    variant = "icon",
    ...props
}: ComponentProps<"div"> & VariantProps<typeof shadcnAttachmentMediaVariants>) {
    return (
        <div
            data-slot="shadcn-attachment-media"
            data-variant={variant}
            className={cn(
                shadcnAttachmentMediaVariants({ variant }),
                className,
            )}
            {...props}
        />
    );
}

function ShadcnAttachmentContent({
    className,
    ...props
}: ComponentProps<"div">) {
    return (
        <div
            data-slot="shadcn-attachment-content"
            className={cn(
                "max-w-full min-w-0 flex-1 leading-tight group-data-[orientation=vertical]/shadcn-attachment:px-1",
                className,
            )}
            {...props}
        />
    );
}

function ShadcnAttachmentTitle({
    className,
    ...props
}: ComponentProps<"span">) {
    return (
        <span
            data-slot="shadcn-attachment-title"
            className={cn(
                "block max-w-full min-w-0 truncate font-medium group-data-[state=processing]/shadcn-attachment:shimmer group-data-[state=uploading]/shadcn-attachment:shimmer",
                className,
            )}
            {...props}
        />
    );
}

function ShadcnAttachmentDescription({
    className,
    ...props
}: ComponentProps<"span">) {
    return (
        <span
            data-slot="shadcn-attachment-description"
            className={cn(
                "mt-0.5 block max-w-full min-w-0 truncate text-xs text-muted-foreground group-data-[state=error]/shadcn-attachment:text-destructive",
                className,
            )}
            {...props}
        />
    );
}

function ShadcnAttachmentActions({
    className,
    ...props
}: ComponentProps<"div">) {
    return (
        <div
            data-slot="shadcn-attachment-actions"
            className={cn(
                "relative z-20 flex shrink-0 items-center group-data-[orientation=vertical]/shadcn-attachment:absolute group-data-[orientation=vertical]/shadcn-attachment:top-3 group-data-[orientation=vertical]/shadcn-attachment:right-3 group-data-[orientation=vertical]/shadcn-attachment:gap-1",
                className,
            )}
            {...props}
        />
    );
}

function ShadcnAttachmentAction({
    className,
    variant,
    size = "icon-xs",
    ...props
}: ComponentProps<typeof ShadcnButton>) {
    return (
        <ShadcnButton
            data-slot="shadcn-attachment-action"
            variant={variant ?? "ghost"}
            size={size}
            className={cn(className)}
            {...props}
        />
    );
}

function ShadcnAttachmentTrigger({
    className,
    render,
    type,
    ...props
}: useRender.ComponentProps<"button">) {
    return useRender({
        defaultTagName: "button",
        props: mergeProps<"button">(
            {
                type: render ? type : (type ?? "button"),
                className: cn("absolute inset-0 z-10 outline-none", className),
            },
            props,
        ),
        render,
        state: {
            slot: "shadcn-attachment-trigger",
        },
    });
}

function ShadcnAttachmentGroup({ className, ...props }: ComponentProps<"div">) {
    return (
        <div
            data-slot="shadcn-attachment-group"
            className={cn(
                "flex min-w-0 scroll-fade-x snap-x snap-mandatory scroll-px-1 gap-3 overflow-x-auto overscroll-x-contain py-1 no-scrollbar *:data-[slot=shadcn-attachment]:flex-none *:data-[slot=shadcn-attachment]:snap-start",
                className,
            )}
            {...props}
        />
    );
}

export {
    ShadcnAttachment,
    ShadcnAttachmentGroup,
    ShadcnAttachmentMedia,
    ShadcnAttachmentContent,
    ShadcnAttachmentTitle,
    ShadcnAttachmentDescription,
    ShadcnAttachmentActions,
    ShadcnAttachmentAction,
    ShadcnAttachmentTrigger,
};
