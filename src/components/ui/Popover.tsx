import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    type ComponentProps,
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

    return (
        <PopoverHoverContext.Provider
            value={{ setEnabled, isEnabled, show, hide }}
        >
            <ShadcnPopover {...props} open={open} onOpenChange={setOpen}>
                {children}
            </ShadcnPopover>
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
    ...props
}: ComponentProps<typeof ShadcnPopoverContent>) {
    const hover = useContext(PopoverHoverContext);

    return (
        <ShadcnPopoverContent
            {...props}
            onMouseEnter={(event) => {
                onMouseEnter?.(event);
                if (hover?.isEnabled()) hover.show();
            }}
            onMouseLeave={(event) => {
                onMouseLeave?.(event);
                if (hover?.isEnabled()) hover.hide();
            }}
        />
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

export function PopoverTitle(props: ComponentProps<typeof ShadcnPopoverTitle>) {
    return <ShadcnPopoverTitle {...props} />;
}

export function PopoverDescription(
    props: ComponentProps<typeof ShadcnPopoverDescription>,
) {
    return <ShadcnPopoverDescription {...props} />;
}
