import { useState, type SetStateAction } from "react";

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
    setPage: (page: SetStateAction<number>) => void;
};

/** Returns one page of a list. Page is clamped so it is never out of range. */
export function usePaginatedList<T>({
    data,
    page: initialPage = 1,
    limit,
}: UsePaginatedListOptions<T>): UsePaginatedListResult<T> {
    const [page, setPageState] = useState(
        () => getPageRange(data.length, initialPage, limit).page,
    );

    const {
        page: currentPage,
        first,
        last,
    } = getPageRange(data.length, page, limit);

    if (page !== currentPage) {
        setPageState(currentPage);
    }

    const pageData = last < first ? [] : data.slice(first, last + 1);

    return {
        data: pageData,
        page: currentPage,
        limit,
        setPage: (next) => {
            setPageState((current) => {
                const requested =
                    typeof next === "function" ? next(current) : next;
                return getPageRange(data.length, requested, limit).page;
            });
        },
    };
}
