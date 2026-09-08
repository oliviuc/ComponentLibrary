export type PageRange = {
    page: number;
    first: number;
    last: number;
};

/** 1-based page window. Page is always a page that has data, or 1 when empty. */
export function getPageRange(
    count: number,
    page = 1,
    limit: number,
): PageRange {
    const size = Number.isFinite(limit) && limit > 0 ? Math.trunc(limit) : 1;
    const requested = Number.isFinite(page) && page >= 1 ? Math.trunc(page) : 1;

    if (count <= 0) {
        return { page: 1, first: 0, last: -1 };
    }

    const pageCount = Math.ceil(count / size);
    const safePage = Math.min(requested, pageCount);
    const first = (safePage - 1) * size;
    const last = Math.min(count, first + size) - 1;

    return { page: safePage, first, last };
}
