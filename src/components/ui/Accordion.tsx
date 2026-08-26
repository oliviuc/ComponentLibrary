import type { ComponentProps } from "react";

import {
    ShadcnAccordion,
    ShadcnAccordionContent,
    ShadcnAccordionItem,
    ShadcnAccordionTrigger,
} from "@/components/shadcn/ShadcnAccordion";
import { cn } from "@/lib/utils";

/** Expandable sections, one or more at a time. */
export function Accordion(props: ComponentProps<typeof ShadcnAccordion>) {
    return <ShadcnAccordion {...props} />;
}

export function AccordionItem(
    props: ComponentProps<typeof ShadcnAccordionItem>,
) {
    return <ShadcnAccordionItem {...props} />;
}

export function AccordionTrigger({
    className,
    ...props
}: ComponentProps<typeof ShadcnAccordionTrigger>) {
    return (
        <ShadcnAccordionTrigger className={cn("py-2", className)} {...props} />
    );
}

export function AccordionContent(
    props: ComponentProps<typeof ShadcnAccordionContent>,
) {
    return <ShadcnAccordionContent {...props} />;
}
