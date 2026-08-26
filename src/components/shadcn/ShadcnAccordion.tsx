"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function ShadcnAccordion({
    className,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
    return (
        <AccordionPrimitive.Root
            data-slot="shadcn-accordion"
            className={cn("flex w-full flex-col", className)}
            {...props}
        />
    );
}

function ShadcnAccordionItem({
    className,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
    return (
        <AccordionPrimitive.Item
            data-slot="shadcn-accordion-item"
            className={cn("not-last:border-b", className)}
            {...props}
        />
    );
}

function ShadcnAccordionTrigger({
    className,
    children,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
    return (
        <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
                data-slot="shadcn-accordion-trigger"
                className={cn(
                    "group/shadcn-accordion-trigger relative flex flex-1 items-start justify-between rounded-md border border-transparent py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring disabled:pointer-events-none disabled:opacity-50 **:data-[slot=shadcn-accordion-trigger-icon]:ml-auto **:data-[slot=shadcn-accordion-trigger-icon]:size-4 **:data-[slot=shadcn-accordion-trigger-icon]:text-muted-foreground",
                    className,
                )}
                {...props}
            >
                {children}
                <ChevronDownIcon
                    data-slot="shadcn-accordion-trigger-icon"
                    className="pointer-events-none shrink-0 group-aria-expanded/shadcn-accordion-trigger:hidden"
                />
                <ChevronUpIcon
                    data-slot="shadcn-accordion-trigger-icon"
                    className="pointer-events-none hidden shrink-0 group-aria-expanded/shadcn-accordion-trigger:inline"
                />
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    );
}

function ShadcnAccordionContent({
    className,
    children,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
    return (
        <AccordionPrimitive.Content
            data-slot="shadcn-accordion-content"
            className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
            {...props}
        >
            <div
                className={cn(
                    "h-(--radix-accordion-content-height) pt-0 pb-4 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
                    className,
                )}
            >
                {children}
            </div>
        </AccordionPrimitive.Content>
    );
}

export {
    ShadcnAccordion,
    ShadcnAccordionItem,
    ShadcnAccordionTrigger,
    ShadcnAccordionContent,
};
