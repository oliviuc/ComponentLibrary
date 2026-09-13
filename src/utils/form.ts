const ERROR_SKIP_KEYS = new Set(["ref", "type", "types"]);

/** Unwraps a `useState`-style updater into the next value. */
export function resolveNextValue<TValue>(
    next: TValue | ((current: TValue) => TValue),
    current: TValue,
): TValue {
    return typeof next === "function"
        ? (next as (current: TValue) => TValue)(current)
        : next;
}

/** Flattens a react-hook-form field error into a single message. */
export function toErrorMessage(error: unknown): string | null {
    if (error == null || typeof error !== "object") {
        return null;
    }

    if (Array.isArray(error)) {
        for (const item of error) {
            const message = toErrorMessage(item);
            if (message) {
                return message;
            }
        }
        return null;
    }

    const record = error as Record<string, unknown>;

    if (typeof record.message === "string" && record.message !== "") {
        return record.message;
    }

    if ("root" in record) {
        const rootMessage = toErrorMessage(record.root);
        if (rootMessage) {
            return rootMessage;
        }
    }

    for (const [key, value] of Object.entries(record)) {
        if (ERROR_SKIP_KEYS.has(key) || key === "message" || key === "root") {
            continue;
        }
        const nested = toErrorMessage(value);
        if (nested) {
            return nested;
        }
    }

    return null;
}
