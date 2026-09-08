import { getPageRange } from "@/utils/paginatedList";

export type UsePaginatedListOptions<T> = {
    data: readonly T[];
    /** 1-based. Defaults to the first page. Always clamped to a page that has data. */
    page?: number;
    limit: number;
};

export type UsePaginatedListResult<T> = {
    data: T[];
    page: number;
    limit: number;
};

/** Returns one page of a list. Page is clamped so it is never out of range. */
export function usePaginatedList<T>({
    data,
    page = 1,
    limit,
}: UsePaginatedListOptions<T>): UsePaginatedListResult<T> {
    const {
        page: currentPage,
        first,
        last,
    } = getPageRange(data.length, page, limit);
    const pageData = last < first ? [] : data.slice(first, last + 1);

    return {
        data: pageData,
        page: currentPage,
        limit,
    };
}
