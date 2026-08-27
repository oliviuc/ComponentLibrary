import type { ComponentProps } from "react";

import {
    ShadcnCalendar,
    ShadcnCalendarDayButton,
} from "@/components/shadcn/ShadcnCalendar";

/** A month grid for picking dates. */
export function Calendar(props: ComponentProps<typeof ShadcnCalendar>) {
    const { captionLayout = "dropdown" } = props;

    if (props.mode === "range") {
        return (
            <ShadcnCalendar
                captionLayout={captionLayout}
                resetOnSelect
                {...props}
            />
        );
    }

    if (props.mode === "multiple") {
        return <ShadcnCalendar captionLayout={captionLayout} {...props} />;
    }

    return (
        <ShadcnCalendar
            captionLayout={captionLayout}
            {...props}
            mode="single"
            required
            selected={"selected" in props ? props.selected : undefined}
        />
    );
}

export function CalendarDayButton(
    props: ComponentProps<typeof ShadcnCalendarDayButton>,
) {
    return <ShadcnCalendarDayButton {...props} />;
}

export type { DateRange } from "react-day-picker";
