import type { ComponentProps } from "react";

import {
    ShadcnResizableGrip,
    ShadcnResizableHandle,
    ShadcnResizablePanel,
    ShadcnResizablePanelGroup,
} from "@/components/shadcn/ShadcnResizable";

/** A row or column of panels that share space. */
export function ResizablePanelGroup(
    props: ComponentProps<typeof ShadcnResizablePanelGroup>,
) {
    return <ShadcnResizablePanelGroup {...props} />;
}

/** One pane inside a resizable group. */
export function ResizablePanel(
    props: ComponentProps<typeof ShadcnResizablePanel>,
) {
    return <ShadcnResizablePanel {...props} />;
}

/** The drag target between panels. Give it an aria-label. */
export function ResizableHandle(
    props: Omit<ComponentProps<typeof ShadcnResizableHandle>, "withHandle">,
) {
    return <ShadcnResizableHandle {...props} />;
}

/** A visible grip inside a resizable handle. Color it with className. */
export function ResizableGrip(
    props: ComponentProps<typeof ShadcnResizableGrip>,
) {
    return <ShadcnResizableGrip {...props} />;
}
