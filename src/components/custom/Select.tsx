import {
    Children,
    isValidElement,
    type ComponentProps,
    type ReactNode,
} from "react";

import { ClearButton } from "@/components/custom/ClearButton";
import {
    ShadcnSelect,
    ShadcnSelectContent,
    ShadcnSelectItem,
    ShadcnSelectTrigger,
    ShadcnSelectValue,
} from "@/components/shadcn/ShadcnSelect";
import { cn } from "@/lib/utils";
import type { Select as SelectPrimitive } from "@base-ui/react/select";

/** Labels for the closed trigger, taken from each option's children. */
function collectOptionLabels(
    nodes: ReactNode,
    into: Record<string, ReactNode>,
) {
    Children.forEach(nodes, (child) => {
        if (!isValidElement(child)) {
            return;
        }
        const props = child.props as { value?: unknown; children?: ReactNode };
        if (child.type === SelectOption && props.value != null) {
            into[String(props.value)] = props.children;
            return;
        }
        if (props.children != null) {
            collectOptionLabels(props.children, into);
        }
    });
}

/** Pick one item from a list. */
export function Select<Value>({
    items,
    children,
    ...props
}: SelectPrimitive.Root.Props<Value>) {
    const collected: Record<string, ReactNode> = {};
    if (items == null) {
        collectOptionLabels(children, collected);
    }

    return (
        <ShadcnSelect items={items ?? collected} {...props}>
            {children}
        </ShadcnSelect>
    );
}

export function SelectTrigger({
    className,
    children,
    placeholder,
    clearable,
    onClear,
    disabled,
    ...props
}: ComponentProps<typeof ShadcnSelectTrigger> & {
    placeholder?: string;
    clearable?: boolean;
    onClear?: () => void;
}) {
    const trigger = (
        <ShadcnSelectTrigger
            disabled={disabled}
            className={cn(
                "peer w-full",
                clearable && "not-data-placeholder:pr-16",
                className,
            )}
            {...props}
        >
            {children ?? <ShadcnSelectValue placeholder={placeholder} />}
        </ShadcnSelectTrigger>
    );

    if (!clearable) {
        return trigger;
    }

    return (
        <div data-slot="select-field" className="relative w-full">
            {trigger}
            {disabled ? null : (
                <ClearButton
                    className="absolute top-1/2 right-8 z-10 -translate-y-1/2 peer-data-placeholder:hidden"
                    onClick={onClear}
                />
            )}
        </div>
    );
}

export function SelectContent(
    props: ComponentProps<typeof ShadcnSelectContent>,
) {
    return <ShadcnSelectContent {...props} />;
}

export function SelectOption(props: ComponentProps<typeof ShadcnSelectItem>) {
    return <ShadcnSelectItem {...props} />;
}
