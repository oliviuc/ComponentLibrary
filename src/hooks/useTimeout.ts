import { useEffect, useEffectEvent } from "react";

/** Calls a function once after a delay. Always uses the latest callback. Pass `null` to cancel. */
export function useTimeout(callback: () => void, delay: number | null) {
    const onTick = useEffectEvent(callback);

    useEffect(() => {
        if (delay === null) {
            return;
        }

        const id = setTimeout(() => {
            onTick();
        }, delay);

        return () => {
            clearTimeout(id);
        };
    }, [delay]);
}
