import type { ComponentProps } from "react";

import {
    ShadcnAccordion,
    ShadcnAccordionContent,
    ShadcnAccordionItem,
    ShadcnAccordionTrigger,
} from "@/components/shadcn/ShadcnAccordion";

/** Expandable sections, one or more at a time. */
export function Accordion(props: ComponentProps<typeof ShadcnAccordion>) {
    return <ShadcnAccordion {...props} />;
}

export function AccordionItem(
    props: ComponentProps<typeof ShadcnAccordionItem>,
) {
    return <ShadcnAccordionItem {...props} />;
}

export function AccordionTrigger(
    props: ComponentProps<typeof ShadcnAccordionTrigger>,
) {
    return <ShadcnAccordionTrigger {...props} />;
}

export function AccordionContent(
    props: ComponentProps<typeof ShadcnAccordionContent>,
) {
    return <ShadcnAccordionContent {...props} />;
}
