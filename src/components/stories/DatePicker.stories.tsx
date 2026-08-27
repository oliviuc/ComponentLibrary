import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
    addDays,
    endOfWeek,
    format,
    isSameDay,
    startOfWeek,
    subWeeks,
} from "date-fns";

import { CalendarPreset, CalendarPresets } from "@/components/custom/Calendar";
import {
    DatePicker,
    DatePickerContent,
    DatePickerTrigger,
} from "@/components/custom/DatePicker";
import { Calendar, type DateRange } from "@/components/ui/Calendar";
import { Label } from "@/components/ui/Label";

const meta = {
    title: "Components/DatePicker",
    component: DatePicker,
    parameters: {
        docs: {
            description: {
                component: "Pick a date from a calendar.",
            },
        },
    },
    argTypes: {
        children: { table: { disable: true } },
    },
    decorators: [
        (Story) => (
            <div className="w-72">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const usage = `const [date, setDate] = useState<Date>();

<DatePicker>
    <DatePickerTrigger placeholder="Pick a date">
        {date ? format(date, "PPP") : null}
    </DatePickerTrigger>
    <DatePickerContent>
        <Calendar mode="single" selected={date} onSelect={setDate} />
    </DatePickerContent>
</DatePicker>`;

export const Default: Story = {
    render: function Default() {
        const [date, setDate] = useState<Date>();

        return (
            <DatePicker>
                <DatePickerTrigger placeholder="Pick a date">
                    {date ? format(date, "PPP") : null}
                </DatePickerTrigger>
                <DatePickerContent>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                    />
                </DatePickerContent>
            </DatePicker>
        );
    },
    parameters: {
        docs: {
            source: { code: usage },
        },
    },
};

export const Selected: Story = {
    render: function Selected() {
        const [date, setDate] = useState<Date | undefined>(
            new Date(2026, 7, 12),
        );

        return (
            <DatePicker>
                <DatePickerTrigger placeholder="Pick a date">
                    {date ? format(date, "PPP") : null}
                </DatePickerTrigger>
                <DatePickerContent>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                    />
                </DatePickerContent>
            </DatePicker>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "A date can start selected.",
            },
            source: {
                code: `const [date, setDate] = useState<Date | undefined>(
    new Date(2026, 7, 12),
);

<DatePicker>
    <DatePickerTrigger placeholder="Pick a date">
        {date ? format(date, "PPP") : null}
    </DatePickerTrigger>
    <DatePickerContent>
        <Calendar mode="single" selected={date} onSelect={setDate} />
    </DatePickerContent>
</DatePicker>`,
            },
        },
    },
};

export const Clearable: Story = {
    render: function Clearable() {
        const [date, setDate] = useState<Date | undefined>(
            new Date(2026, 7, 12),
        );

        return (
            <DatePicker>
                <DatePickerTrigger
                    placeholder="Pick a date"
                    clearable
                    onClear={() => setDate(undefined)}
                >
                    {date ? format(date, "PPP") : null}
                </DatePickerTrigger>
                <DatePickerContent>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                    />
                </DatePickerContent>
            </DatePicker>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Show a clear button when a date is selected.",
            },
            source: {
                code: `const [date, setDate] = useState<Date | undefined>(
    new Date(2026, 7, 12),
);

<DatePicker>
    <DatePickerTrigger
        placeholder="Pick a date"
        clearable
        onClear={() => setDate(undefined)}
    >
        {date ? format(date, "PPP") : null}
    </DatePickerTrigger>
    <DatePickerContent>
        <Calendar mode="single" selected={date} onSelect={setDate} />
    </DatePickerContent>
</DatePicker>`,
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
            <DatePicker>
                <DatePickerTrigger placeholder="Pick a date range">
                    {range?.from
                        ? range.to
                            ? `${format(range.from, "LLL dd, y")} - ${format(range.to, "LLL dd, y")}`
                            : format(range.from, "LLL dd, y")
                        : null}
                </DatePickerTrigger>
                <DatePickerContent>
                    <Calendar
                        mode="range"
                        selected={range}
                        onSelect={setRange}
                        numberOfMonths={2}
                    />
                </DatePickerContent>
            </DatePicker>
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

<DatePicker>
    <DatePickerTrigger placeholder="Pick a date range">
        {range?.from
            ? range.to
                ? \`\${format(range.from, "LLL dd, y")} - \${format(range.to, "LLL dd, y")}\`
                : format(range.from, "LLL dd, y")
            : null}
    </DatePickerTrigger>
    <DatePickerContent>
        <Calendar
            mode="range"
            selected={range}
            onSelect={setRange}
            numberOfMonths={2}
        />
    </DatePickerContent>
</DatePicker>`,
            },
        },
    },
};

export const Presets: Story = {
    render: function Presets() {
        const today = new Date();
        const tomorrow = addDays(today, 1);
        const lastWeek = subWeeks(today, 1);
        const [range, setRange] = useState<DateRange>();
        const [month, setMonth] = useState(today);

        return (
            <DatePicker>
                <DatePickerTrigger placeholder="Pick a date range">
                    {range?.from
                        ? range.to
                            ? `${format(range.from, "LLL dd, y")} - ${format(range.to, "LLL dd, y")}`
                            : format(range.from, "LLL dd, y")
                        : null}
                </DatePickerTrigger>
                <DatePickerContent className="flex-row">
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
                </DatePickerContent>
            </DatePicker>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Put any shortcuts beside the grid.",
            },
            source: {
                code: `const today = new Date();
const tomorrow = addDays(today, 1);
const lastWeek = subWeeks(today, 1);
const [range, setRange] = useState<DateRange>();
const [month, setMonth] = useState(today);

<DatePicker>
    <DatePickerTrigger placeholder="Pick a date range">
        {range?.from
            ? range.to
                ? \`\${format(range.from, "LLL dd, y")} - \${format(range.to, "LLL dd, y")}\`
                : format(range.from, "LLL dd, y")
            : null}
    </DatePickerTrigger>
    <DatePickerContent className="flex-row">
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
    </DatePickerContent>
</DatePicker>`,
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
            <DatePicker>
                <DatePickerTrigger placeholder="Pick a date" disabled>
                    {date ? format(date, "PPP") : null}
                </DatePickerTrigger>
                <DatePickerContent>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                    />
                </DatePickerContent>
            </DatePicker>
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [date, setDate] = useState<Date | undefined>(
    new Date(2026, 7, 12),
);

<DatePicker>
    <DatePickerTrigger placeholder="Pick a date" disabled>
        {date ? format(date, "PPP") : null}
    </DatePickerTrigger>
    <DatePickerContent>
        <Calendar mode="single" selected={date} onSelect={setDate} />
    </DatePickerContent>
</DatePicker>`,
            },
        },
    },
};

export const Invalid: Story = {
    render: function Invalid() {
        const [date, setDate] = useState<Date>();

        return (
            <DatePicker>
                <DatePickerTrigger placeholder="Pick a date" aria-invalid>
                    {date ? format(date, "PPP") : null}
                </DatePickerTrigger>
                <DatePickerContent>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                    />
                </DatePickerContent>
            </DatePicker>
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [date, setDate] = useState<Date>();

<DatePicker>
    <DatePickerTrigger placeholder="Pick a date" aria-invalid>
        {date ? format(date, "PPP") : null}
    </DatePickerTrigger>
    <DatePickerContent>
        <Calendar mode="single" selected={date} onSelect={setDate} />
    </DatePickerContent>
</DatePicker>`,
            },
        },
    },
};

export const WithLabel: Story = {
    render: function WithLabel() {
        const [date, setDate] = useState<Date>();

        return (
            <div className="grid w-72 gap-2">
                <Label htmlFor="date-picker">Date</Label>
                <DatePicker>
                    <DatePickerTrigger
                        id="date-picker"
                        placeholder="Pick a date"
                    >
                        {date ? format(date, "PPP") : null}
                    </DatePickerTrigger>
                    <DatePickerContent>
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                        />
                    </DatePickerContent>
                </DatePicker>
            </div>
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [date, setDate] = useState<Date>();

<div className="grid w-72 gap-2">
    <Label htmlFor="date-picker">Date</Label>
    <DatePicker>
        <DatePickerTrigger id="date-picker" placeholder="Pick a date">
            {date ? format(date, "PPP") : null}
        </DatePickerTrigger>
        <DatePickerContent>
            <Calendar mode="single" selected={date} onSelect={setDate} />
        </DatePickerContent>
    </DatePicker>
</div>`,
            },
        },
    },
};
