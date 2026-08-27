export type IndexRange = {
    first: number;
    last: number;
};

function covers(outer: IndexRange, inner: IndexRange) {
    return outer.first <= inner.first && inner.last <= outer.last;
}

function coversIndex(range: IndexRange, index: number) {
    return range.first <= index && index <= range.last;
}

function batchRange(index: number, batch: number, count: number): IndexRange {
    const first = Math.floor(index / batch) * batch;
    const last = Math.min(count - 1, first + batch - 1);

    return { first, last };
}

export function getLazyLoadRanges(
    items: readonly unknown[],
    rangeStart: number,
    rangeEnd: number,
    batch: number,
    pending: readonly IndexRange[],
): IndexRange[] {
    const batches = new Map<number, IndexRange>();

    for (let index = rangeStart; index <= rangeEnd; index++) {
        if (items[index] !== undefined) {
            continue;
        }
        if (pending.some((range) => coversIndex(range, index))) {
            continue;
        }
        const range = batchRange(index, batch, items.length);
        batches.set(range.first, range);
    }

    return [...batches.values()].filter(
        (range) => !pending.some((pendingRange) => covers(pendingRange, range)),
    );
}

export function loadLazyRanges(
    ranges: IndexRange[],
    inFlight: IndexRange[],
    load: (first: number, last: number) => void | Promise<void>,
) {
    for (const range of ranges) {
        if (inFlight.some((pendingRange) => covers(pendingRange, range))) {
            continue;
        }

        inFlight.push(range);

        void Promise.resolve(load(range.first, range.last)).finally(() => {
            const index = inFlight.indexOf(range);
            if (index !== -1) {
                inFlight.splice(index, 1);
            }
        });
    }
}
