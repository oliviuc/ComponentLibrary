import { useState, type SetStateAction } from "react";

import { getPageRange } from "@/utils/paginatedList";

export type UsePaginationOptions = {
    /** 1-based. Defaults to the first page. Always clamped to a page that has data. */
    page?: number;
    limit: number;
    total: number;
};

export type UsePaginationResult = {
    page: number;
    limit: number;
    totalPages: number;
    setPage: (page: SetStateAction<number>) => void;
};

/** Controls pagination without holding or fetching list data. Page is clamped so it is never out of range. */
export function usePagination({
    page: initialPage = 1,
    limit,
    total,
}: UsePaginationOptions): UsePaginationResult {
    const [page, setPageState] = useState(
        () => getPageRange(total, initialPage, limit).page,
    );

    const { page: currentPage, totalPages } = getPageRange(total, page, limit);

    if (page !== currentPage) {
        setPageState(currentPage);
    }

    return {
        page: currentPage,
        limit,
        totalPages,
        setPage: (next) => {
            setPageState((current) => {
                const requested =
                    typeof next === "function" ? next(current) : next;
                return getPageRange(total, requested, limit).page;
            });
        },
    };
}
