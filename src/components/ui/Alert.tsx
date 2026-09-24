import type { ComponentProps } from "react";

import {
    ShadcnAlert,
    ShadcnAlertAction,
    ShadcnAlertDescription,
    ShadcnAlertTitle,
} from "@/components/shadcn/ShadcnAlert";

/** A callout for user attention. */
export function Alert(props: ComponentProps<typeof ShadcnAlert>) {
    return <ShadcnAlert {...props} />;
}

export function AlertTitle(props: ComponentProps<typeof ShadcnAlertTitle>) {
    return <ShadcnAlertTitle {...props} />;
}

export function AlertDescription(
    props: ComponentProps<typeof ShadcnAlertDescription>,
) {
    return <ShadcnAlertDescription {...props} />;
}

export function AlertAction(props: ComponentProps<typeof ShadcnAlertAction>) {
    return <ShadcnAlertAction {...props} />;
}
