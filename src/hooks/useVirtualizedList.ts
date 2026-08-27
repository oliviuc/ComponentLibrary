import { useRef, type CSSProperties, type RefObject } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

export type UseVirtualizedListOptions<T> = {
    items: readonly T[];
    itemHeight: number;
    overscan?: number;
    getItemKey?: (item: T, index: number) => string | number;
};

export type VirtualizedListItem<T> = {
    key: string | number | bigint;
    index: number;
    item: T;
    style: CSSProperties;
};

export type UseVirtualizedListResult<T> = {
    scrollRef: RefObject<HTMLDivElement | null>;
    innerStyle: CSSProperties;
    virtualItems: VirtualizedListItem<T>[];
    scrollToIndex: (
        index: number,
        options?: {
            align?: "start" | "center" | "end" | "auto";
            behavior?: "auto" | "smooth" | "instant";
        },
    ) => void;
};

/** Virtualizes a long list so only visible rows mount. */
export function useVirtualizedList<T>({
    items,
    itemHeight,
    overscan = 5,
    getItemKey,
}: UseVirtualizedListOptions<T>): UseVirtualizedListResult<T> {
    const scrollRef = useRef<HTMLDivElement>(null);

    // eslint-disable-next-line react-hooks/incompatible-library -- wrapping useVirtualizer
    const virtualizer = useVirtualizer({
        count: items.length,
        overscan,
        useFlushSync: false,
        getScrollElement: () => scrollRef.current,
        estimateSize: () => itemHeight,
        getItemKey: getItemKey
            ? (index) => getItemKey(items[index], index)
            : undefined,
    });

    const virtualItems = virtualizer.getVirtualItems().map((virtualItem) => ({
        key: virtualItem.key,
        index: virtualItem.index,
        item: items[virtualItem.index],
        style: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: itemHeight,
            transform: `translateY(${virtualItem.start}px)`,
        } satisfies CSSProperties,
    }));

    return {
        scrollRef,
        innerStyle: {
            position: "relative",
            width: "100%",
            height: virtualizer.getTotalSize(),
        },
        virtualItems,
        scrollToIndex: (index, options) =>
            virtualizer.scrollToIndex(index, options),
    };
}
