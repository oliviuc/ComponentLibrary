import { format, isValid } from "date-fns";

const DATE_PARAM = /^(\d{4})-(\d{2})-(\d{2})/;

/** Serializes a date for a query param as `yyyy-MM-dd`. */
export function formatDateParam(date: Date): string {
    return format(date, "yyyy-MM-dd");
}

/** Parses a `yyyy-MM-dd` query param as a local date. */
export function parseDateParam(value: string): Date | undefined {
    const match = DATE_PARAM.exec(value);
    if (!match) {
        return undefined;
    }

    const date = new Date(
        Number(match[1]),
        Number(match[2]) - 1,
        Number(match[3]),
    );

    return isValid(date) ? date : undefined;
}
