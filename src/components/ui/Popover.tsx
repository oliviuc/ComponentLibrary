import {
    Children,
    createContext,
    isValidElement,
    useContext,
    useEffect,
    useId,
    useRef,
    useState,
    type ComponentProps,
    type ReactNode,
} from "react";

import {
    ShadcnPopover,
    ShadcnPopoverAnchor,
    ShadcnPopoverContent,
    ShadcnPopoverDescription,
    ShadcnPopoverHeader,
    ShadcnPopoverTitle,
    ShadcnPopoverTrigger,
} from "@/components/shadcn/ShadcnPopover";

const HOVER_CLOSE_DELAY = 100;

type PopoverHoverContextValue = {
    setEnabled: (enabled: boolean) => void;
    isEnabled: () => boolean;
    show: () => void;
    hide: () => void;
};

const PopoverHoverContext = createContext<PopoverHoverContextValue | null>(
    null,
);

type PopoverLabelContextValue = {
    titleId: string;
    descriptionId: string;
};

const PopoverLabelContext = createContext<PopoverLabelContextValue | null>(
    null,
);

/** The id a title or description will have, if that part is in the tree. */
function findPartId(
    nodes: ReactNode,
    type: unknown,
    fallback: string,
): string | undefined {
    let found: string | undefined;
    const walk = (node: ReactNode) => {
        Children.forEach(node, (child) => {
            if (found !== undefined || !isValidElement(child)) {
                return;
            }
            if (child.type === type) {
                const id = (child.props as { id?: string }).id;
                found = id ?? fallback;
                return;
            }
            const nested = (child.props as { children?: ReactNode }).children;
            if (nested != null) {
                walk(nested);
            }
        });
    };
    walk(nodes);
    return found;
}

/** A small panel anchored to a control. */
export function Popover({
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    children,
    ...props
}: ComponentProps<typeof ShadcnPopover>) {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const open = openProp ?? uncontrolledOpen;
    const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
        undefined,
    );
    const enabled = useRef(false);

    const setOpen = (next: boolean) => {
        if (next === open) return;
        if (openProp === undefined) setUncontrolledOpen(next);
        onOpenChange?.(next);
    };

    const setEnabled = (value: boolean) => {
        enabled.current = value;
    };

    const isEnabled = () => enabled.current;

    const show = () => {
        clearTimeout(closeTimer.current);
        setOpen(true);
    };

    const hide = () => {
        clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(
            () => setOpen(false),
            HOVER_CLOSE_DELAY,
        );
    };

    useEffect(() => {
        return () => clearTimeout(closeTimer.current);
    }, []);

    const titleId = useId();
    const descriptionId = useId();

    return (
        <PopoverHoverContext.Provider
            value={{ setEnabled, isEnabled, show, hide }}
        >
            <PopoverLabelContext.Provider value={{ titleId, descriptionId }}>
                <ShadcnPopover {...props} open={open} onOpenChange={setOpen}>
                    {children}
                </ShadcnPopover>
            </PopoverLabelContext.Provider>
        </PopoverHoverContext.Provider>
    );
}

type PopoverTriggerProps = ComponentProps<typeof ShadcnPopoverTrigger> & {
    /** Open while the pointer is over the trigger or the panel. */
    openOnHover?: boolean;
};

export function PopoverTrigger({
    openOnHover = false,
    onMouseEnter,
    onMouseLeave,
    ...props
}: PopoverTriggerProps) {
    const hover = useContext(PopoverHoverContext);

    return (
        <ShadcnPopoverTrigger
            {...props}
            onMouseEnter={(event) => {
                onMouseEnter?.(event);
                if (!openOnHover || !hover) return;
                hover.setEnabled(true);
                hover.show();
            }}
            onMouseLeave={(event) => {
                onMouseLeave?.(event);
                if (!openOnHover || !hover) return;
                hover.hide();
            }}
        />
    );
}

export function PopoverContent({
    onMouseEnter,
    onMouseLeave,
    children,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    ...props
}: ComponentProps<typeof ShadcnPopoverContent>) {
    const hover = useContext(PopoverHoverContext);
    const labels = useContext(PopoverLabelContext);
    const titleId =
        ariaLabelledBy ??
        (labels
            ? findPartId(children, PopoverTitle, labels.titleId)
            : undefined);
    const descriptionId =
        ariaDescribedBy ??
        (labels
            ? findPartId(children, PopoverDescription, labels.descriptionId)
            : undefined);

    return (
        <ShadcnPopoverContent
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            {...props}
            onMouseEnter={(event) => {
                onMouseEnter?.(event);
                if (hover?.isEnabled()) hover.show();
            }}
            onMouseLeave={(event) => {
                onMouseLeave?.(event);
                if (hover?.isEnabled()) hover.hide();
            }}
        >
            {children}
        </ShadcnPopoverContent>
    );
}

export function PopoverAnchor(
    props: ComponentProps<typeof ShadcnPopoverAnchor>,
) {
    return <ShadcnPopoverAnchor {...props} />;
}

export function PopoverHeader(
    props: ComponentProps<typeof ShadcnPopoverHeader>,
) {
    return <ShadcnPopoverHeader {...props} />;
}

export function PopoverTitle({
    id,
    ...props
}: ComponentProps<typeof ShadcnPopoverTitle>) {
    const labels = useContext(PopoverLabelContext);

    return <ShadcnPopoverTitle id={id ?? labels?.titleId} {...props} />;
}

export function PopoverDescription({
    id,
    ...props
}: ComponentProps<typeof ShadcnPopoverDescription>) {
    const labels = useContext(PopoverLabelContext);

    return (
        <ShadcnPopoverDescription id={id ?? labels?.descriptionId} {...props} />
    );
}
