import type { ComponentProps } from "react";

import {
    ShadcnCard,
    ShadcnCardAction,
    ShadcnCardContent,
    ShadcnCardDescription,
    ShadcnCardFooter,
    ShadcnCardHeader,
    ShadcnCardTitle,
} from "@/components/shadcn/ShadcnCard";

/** A grouped block of related content. */
export function Card(props: ComponentProps<typeof ShadcnCard>) {
    return <ShadcnCard {...props} />;
}

export function CardHeader(props: ComponentProps<typeof ShadcnCardHeader>) {
    return <ShadcnCardHeader {...props} />;
}

export function CardTitle(props: ComponentProps<typeof ShadcnCardTitle>) {
    return <ShadcnCardTitle {...props} />;
}

export function CardDescription(
    props: ComponentProps<typeof ShadcnCardDescription>,
) {
    return <ShadcnCardDescription {...props} />;
}

export function CardAction(props: ComponentProps<typeof ShadcnCardAction>) {
    return <ShadcnCardAction {...props} />;
}

export function CardContent(props: ComponentProps<typeof ShadcnCardContent>) {
    return <ShadcnCardContent {...props} />;
}

export function CardFooter(props: ComponentProps<typeof ShadcnCardFooter>) {
    return <ShadcnCardFooter {...props} />;
}
