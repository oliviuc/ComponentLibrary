import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { addDays, endOfWeek, isSameDay, startOfWeek, subWeeks } from "date-fns";

import { CalendarPreset, CalendarPresets } from "@/components/custom/Calendar";
import { Calendar, type DateRange } from "@/components/ui/Calendar";

const meta = {
    title: "Components/Calendar",
    component: Calendar,
    parameters: {
        docs: {
            description: {
                component: "A month grid for picking dates.",
            },
        },
    },
    argTypes: {
        mode: { table: { disable: true } },
        selected: { table: { disable: true } },
        onSelect: { table: { disable: true } },
        required: { table: { disable: true } },
        className: { table: { disable: true } },
    },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: function Default() {
        const [date, setDate] = useState<Date | undefined>(
            new Date(2026, 7, 12),
        );

        return (
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-lg border"
            />
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [date, setDate] = useState<Date | undefined>(
    new Date(2026, 7, 12),
);

<Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-lg border"
/>`,
            },
        },
    },
};

export const Range: Story = {
    render: function Range() {
        const [range, setRange] = useState<DateRange | undefined>({
            from: new Date(2026, 7, 12),
            to: new Date(2026, 7, 20),
        });

        return (
            <Calendar
                mode="range"
                selected={range}
                onSelect={setRange}
                numberOfMonths={2}
                className="rounded-lg border"
            />
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Pick a start and end date. A complete range starts over on the next click.",
            },
            source: {
                code: `const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2026, 7, 12),
    to: new Date(2026, 7, 20),
});

<Calendar
    mode="range"
    selected={range}
    onSelect={setRange}
    numberOfMonths={2}
    className="rounded-lg border"
/>`,
            },
        },
    },
};

const calendarPresetsUsage = `const today = new Date();
const tomorrow = addDays(today, 1);
const lastWeek = subWeeks(today, 1);
const [range, setRange] = useState<DateRange>();
const [month, setMonth] = useState(today);

<div className="flex rounded-lg border">
    <CalendarPresets>
        <CalendarPreset
            selected={Boolean(
                range?.from &&
                    range.to &&
                    isSameDay(range.from, today) &&
                    isSameDay(range.to, today),
            )}
            onClick={() => {
                setRange({ from: today, to: today });
                setMonth(today);
            }}
        >
            Today
        </CalendarPreset>
        <CalendarPreset
            selected={Boolean(
                range?.from &&
                    range.to &&
                    isSameDay(range.from, tomorrow) &&
                    isSameDay(range.to, tomorrow),
            )}
            onClick={() => {
                setRange({ from: tomorrow, to: tomorrow });
                setMonth(tomorrow);
            }}
        >
            Tomorrow
        </CalendarPreset>
        <CalendarPreset
            selected={Boolean(
                range?.from &&
                    range.to &&
                    isSameDay(range.from, startOfWeek(today)) &&
                    isSameDay(range.to, endOfWeek(today)),
            )}
            onClick={() => {
                setRange({
                    from: startOfWeek(today),
                    to: endOfWeek(today),
                });
                setMonth(today);
            }}
        >
            This week
        </CalendarPreset>
        <CalendarPreset
            selected={Boolean(
                range?.from &&
                    range.to &&
                    isSameDay(range.from, startOfWeek(lastWeek)) &&
                    isSameDay(range.to, endOfWeek(lastWeek)),
            )}
            onClick={() => {
                setRange({
                    from: startOfWeek(lastWeek),
                    to: endOfWeek(lastWeek),
                });
                setMonth(lastWeek);
            }}
        >
            Last week
        </CalendarPreset>
    </CalendarPresets>
    <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        month={month}
        onMonthChange={setMonth}
    />
</div>`;

export const Presets: Story = {
    render: function Presets() {
        const today = new Date();
        const tomorrow = addDays(today, 1);
        const lastWeek = subWeeks(today, 1);
        const [range, setRange] = useState<DateRange>();
        const [month, setMonth] = useState(today);

        return (
            <div className="flex rounded-lg border overflow-hidden">
                <CalendarPresets>
                    <CalendarPreset
                        selected={Boolean(
                            range?.from &&
                            range.to &&
                            isSameDay(range.from, today) &&
                            isSameDay(range.to, today),
                        )}
                        onClick={() => {
                            setRange({ from: today, to: today });
                            setMonth(today);
                        }}
                    >
                        Today
                    </CalendarPreset>
                    <CalendarPreset
                        selected={Boolean(
                            range?.from &&
                            range.to &&
                            isSameDay(range.from, tomorrow) &&
                            isSameDay(range.to, tomorrow),
                        )}
                        onClick={() => {
                            setRange({ from: tomorrow, to: tomorrow });
                            setMonth(tomorrow);
                        }}
                    >
                        Tomorrow
                    </CalendarPreset>
                    <CalendarPreset
                        selected={Boolean(
                            range?.from &&
                            range.to &&
                            isSameDay(range.from, startOfWeek(today)) &&
                            isSameDay(range.to, endOfWeek(today)),
                        )}
                        onClick={() => {
                            setRange({
                                from: startOfWeek(today),
                                to: endOfWeek(today),
                            });
                            setMonth(today);
                        }}
                    >
                        This week
                    </CalendarPreset>
                    <CalendarPreset
                        selected={Boolean(
                            range?.from &&
                            range.to &&
                            isSameDay(range.from, startOfWeek(lastWeek)) &&
                            isSameDay(range.to, endOfWeek(lastWeek)),
                        )}
                        onClick={() => {
                            setRange({
                                from: startOfWeek(lastWeek),
                                to: endOfWeek(lastWeek),
                            });
                            setMonth(lastWeek);
                        }}
                    >
                        Last week
                    </CalendarPreset>
                </CalendarPresets>
                <Calendar
                    mode="range"
                    selected={range}
                    onSelect={setRange}
                    month={month}
                    onMonthChange={setMonth}
                    className="border-none"
                />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Put any shortcuts beside the grid.",
            },
            source: {
                code: calendarPresetsUsage,
            },
        },
    },
};

export const Dropdown: Story = {
    render: function Dropdown() {
        const [date, setDate] = useState<Date | undefined>(
            new Date(1998, 5, 15),
        );

        return (
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                startMonth={new Date(1926, 0)}
                endMonth={new Date(2026, 11)}
                className="rounded-lg border"
            />
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Limit the years in the month and year dropdowns.",
            },
            source: {
                code: `const [date, setDate] = useState<Date | undefined>(
    new Date(1998, 5, 15),
);

<Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    startMonth={new Date(1926, 0)}
    endMonth={new Date(2026, 11)}
    className="rounded-lg border"
/>`,
            },
        },
    },
};

export const Disabled: Story = {
    render: function Disabled() {
        const [date, setDate] = useState<Date | undefined>(
            new Date(2026, 7, 12),
        );

        return (
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={{ dayOfWeek: [0, 6] }}
                className="rounded-lg border"
            />
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Weekends are unavailable.",
            },
            source: {
                code: `const [date, setDate] = useState<Date | undefined>(
    new Date(2026, 7, 12),
);

<Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    disabled={{ dayOfWeek: [0, 6] }}
    className="rounded-lg border"
/>`,
            },
        },
    },
};
