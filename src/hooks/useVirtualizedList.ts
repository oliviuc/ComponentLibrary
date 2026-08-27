import { useEffect, useRef, type CSSProperties, type RefObject } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import {
    getLazyLoadRanges,
    loadLazyRanges,
    type IndexRange,
} from "@/utils/virtualizedList";

export type UseVirtualizedListOptions<T> = {
    items: readonly T[];
    itemHeight: number;
    overscan?: number;
    itemKey?: (item: NonNullable<T>) => string | number;
    lazy?: (first: number, last: number) => void | Promise<void>;
    /** Fetch size. A hole at 10–11 with lazyBatch 10 becomes 10–19. Default 50. */
    lazyBatch?: number;
    /** Wait this many ms after scrolling stops before fetching, so fast scrolling does not spam the API. Default 150. */
    debounce?: number;
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
    itemKey,
    lazy,
    lazyBatch = 50,
    debounce = 150,
}: UseVirtualizedListOptions<T>): UseVirtualizedListResult<T> {
    const scrollRef = useRef<HTMLDivElement>(null);
    const lazyRef = useRef(lazy);
    const inFlightRef = useRef<IndexRange[]>([]);

    lazyRef.current = lazy;

    // eslint-disable-next-line react-hooks/incompatible-library -- wrapping useVirtualizer
    const virtualizer = useVirtualizer({
        count: items.length,
        overscan,
        useFlushSync: false,
        getScrollElement: () => scrollRef.current,
        estimateSize: () => itemHeight,
        getItemKey: (index) => {
            const item = items[index];
            if (itemKey && item !== undefined) {
                return itemKey(item as NonNullable<T>);
            }
            return index;
        },
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

    const rangeStart = virtualItems[0]?.index;
    const rangeEnd = virtualItems[virtualItems.length - 1]?.index;
    const batch = lazyBatch > 0 ? lazyBatch : 50;
    const delay = debounce > 0 ? debounce : 0;

    useEffect(() => {
        const load = lazyRef.current;
        if (
            !load ||
            items.length === 0 ||
            rangeStart === undefined ||
            rangeEnd === undefined
        ) {
            return;
        }

        const run = () => {
            const ranges = getLazyLoadRanges(
                items,
                rangeStart,
                rangeEnd,
                batch,
                inFlightRef.current,
            );
            loadLazyRanges(ranges, inFlightRef.current, load);
        };

        if (delay <= 0) {
            run();
            return;
        }

        const timeoutId = setTimeout(run, delay);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [items, rangeStart, rangeEnd, batch, delay]);

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
