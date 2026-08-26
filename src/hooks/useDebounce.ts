import { useEffect, useState } from "react";

/** Returns a value after it has stopped changing. */
export function useDebounce<T>(value: T, delay = 300): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    if (delay <= 0 && !Object.is(debouncedValue, value)) {
        setDebouncedValue(value);
    }

    useEffect(() => {
        if (delay <= 0) {
            return;
        }

        const timeoutId = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [value, delay]);

    return delay <= 0 ? value : debouncedValue;
}
