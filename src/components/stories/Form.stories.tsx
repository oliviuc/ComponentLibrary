import { useId, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { format } from "date-fns";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { z } from "zod";

import { FormField } from "@/components/custom/Form";
import {
    DatePicker,
    DatePickerContent,
    DatePickerTrigger,
} from "@/components/custom/DatePicker";
import {
    Select,
    SelectContent,
    SelectOption,
    SelectTrigger,
} from "@/components/custom/Select";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Slider } from "@/components/ui/Slider";
import { Switch } from "@/components/ui/Switch";
import { useForm } from "@/hooks/useForm";

const fruits = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "blueberry", label: "Blueberry" },
];

const defaultSchema = z.object({
    email: z.email("Enter a valid email"),
    fruit: z.string().min(1, "Pick a fruit"),
    subscribe: z.boolean(),
});

const nestedSchema = z.object({
    address: z.object({
        street: z.string().min(1, "Enter a street"),
        city: z.string().min(1, "Enter a city"),
    }),
    metric: z.object({
        target: z.string().min(1, "Enter a target"),
        amount: z.number(),
    }),
});

const arraysSchema = z.object({
    tags: z.array(z.string()).min(1, "Add a tag"),
    contacts: z
        .array(
            z.object({
                name: z.string().min(1, "Enter a name"),
                email: z.email("Enter a valid email"),
            }),
        )
        .min(1, "Add a contact"),
});

const invalidSchema = z.object({
    email: z.email("Enter a valid email"),
    name: z.string().min(1, "Enter a name"),
});

const submitOutsideSchema = z.object({
    email: z.email("Enter a valid email"),
});

const meta = {
    title: "Components/Form",
    component: FormField,
    parameters: {
        docs: {
            description: {
                component:
                    "Bind any control to a field with value, setValue, error, and isValid. FormField renders no DOM; wrap controls in FormItem. Each field re-renders on its own. A field validates on every change; all fields validate on submit. Use nested paths such as address.street so each control owns its error. Arrays of objects use FormFieldArray for stable row keys.",
            },
        },
    },
    args: {
        name: "",
        children: () => null,
    },
    argTypes: {
        name: { table: { disable: true } },
        children: { table: { disable: true } },
    },
    decorators: [
        (Story) => (
            <div className="w-80">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSource = `const schema = z.object({
    email: z.email("Enter a valid email"),
    fruit: z.string().min(1, "Pick a fruit"),
    subscribe: z.boolean(),
});

const {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormErrorMessage,
    isSubmitting,
} = useForm({
    schema,
    defaultValues: { email: "", fruit: "", subscribe: false },
    onSubmit: (data) => console.log(data),
});

<Form>
    <FormField name="email">
        {({ value, setValue, error }) => (
            <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input
                        type="email"
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                    />
                </FormControl>
                <FormErrorMessage>{error}</FormErrorMessage>
            </FormItem>
        )}
    </FormField>
    <FormField name="fruit">
        {({ value, setValue, error }) => (
            <FormItem>
                <FormLabel>Fruit</FormLabel>
                <Select>
                    <FormControl>
                        <SelectTrigger placeholder="Select a fruit">
                            {
                                fruits.find((fruit) => fruit.value === value)
                                    ?.label
                            }
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {fruits.map((fruit) => (
                            <SelectOption
                                key={fruit.value}
                                value={fruit.value}
                                selected={fruit.value === value}
                                onClick={() => setValue(fruit.value)}
                            >
                                {fruit.label}
                            </SelectOption>
                        ))}
                    </SelectContent>
                </Select>
                <FormErrorMessage>{error}</FormErrorMessage>
            </FormItem>
        )}
    </FormField>
    <FormField name="subscribe">
        {({ value, setValue }) => (
            <FormItem className="flex items-center gap-2">
                <FormControl>
                    <Checkbox
                        checked={value}
                        onCheckedChange={(checked) =>
                            setValue(checked === true)
                        }
                    />
                </FormControl>
                <FormLabel>Subscribe to updates</FormLabel>
            </FormItem>
        )}
    </FormField>
    <Button type="submit" disabled={isSubmitting}>
        Save
    </Button>
</Form>`;

export const Default: Story = {
    render: function Default() {
        const {
            Form,
            FormField,
            FormItem,
            FormLabel,
            FormControl,
            FormErrorMessage,
            isSubmitting,
        } = useForm({
            schema: defaultSchema,
            defaultValues: { email: "", fruit: "", subscribe: false },
            onSubmit: () => undefined,
        });

        return (
            <Form>
                <FormField name="email">
                    {({ value, setValue, error }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    value={value}
                                    onChange={(event) =>
                                        setValue(event.target.value)
                                    }
                                />
                            </FormControl>
                            <FormErrorMessage>{error}</FormErrorMessage>
                        </FormItem>
                    )}
                </FormField>
                <FormField name="fruit">
                    {({ value, setValue, error }) => (
                        <FormItem>
                            <FormLabel>Fruit</FormLabel>
                            <Select>
                                <FormControl>
                                    <SelectTrigger placeholder="Select a fruit">
                                        {
                                            fruits.find(
                                                (fruit) =>
                                                    fruit.value === value,
                                            )?.label
                                        }
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {fruits.map((fruit) => (
                                        <SelectOption
                                            key={fruit.value}
                                            value={fruit.value}
                                            selected={fruit.value === value}
                                            onClick={() =>
                                                setValue(fruit.value)
                                            }
                                        >
                                            {fruit.label}
                                        </SelectOption>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormErrorMessage>{error}</FormErrorMessage>
                        </FormItem>
                    )}
                </FormField>
                <FormField name="subscribe">
                    {({ value, setValue }) => (
                        <FormItem className="flex items-center gap-2">
                            <FormControl>
                                <Checkbox
                                    checked={value}
                                    onCheckedChange={(checked) =>
                                        setValue(checked === true)
                                    }
                                />
                            </FormControl>
                            <FormLabel>Subscribe to updates</FormLabel>
                        </FormItem>
                    )}
                </FormField>
                <Button type="submit" disabled={isSubmitting}>
                    Save
                </Button>
            </Form>
        );
    },
    parameters: {
        docs: {
            source: { code: defaultSource },
        },
    },
};

const nestedSource = `const schema = z.object({
    address: z.object({
        street: z.string().min(1, "Enter a street"),
        city: z.string().min(1, "Enter a city"),
    }),
    metric: z.object({
        target: z.string().min(1, "Enter a target"),
        amount: z.number(),
    }),
});

const { Form, FormField, FormItem, FormLabel, FormControl, FormErrorMessage } =
    useForm({
        schema,
        defaultValues: {
            address: { street: "", city: "" },
            metric: { target: "revenue", amount: 0 },
        },
        onSubmit: (data) => console.log(data),
    });

<Form>
    <FormField name="address.street">
        {({ value, setValue, error }) => (
            <FormItem>
                <FormLabel>Street</FormLabel>
                <FormControl>
                    <Input
                        placeholder="Street"
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                    />
                </FormControl>
                <FormErrorMessage>{error}</FormErrorMessage>
            </FormItem>
        )}
    </FormField>
    <FormField name="address.city">
        {({ value, setValue, error }) => (
            <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                    <Input
                        placeholder="City"
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                    />
                </FormControl>
                <FormErrorMessage>{error}</FormErrorMessage>
            </FormItem>
        )}
    </FormField>
    <FormField name="metric.target">
        {({ value, setValue, error }) => (
            <FormItem>
                <FormLabel>Target</FormLabel>
                <FormControl>
                    <Input
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                    />
                </FormControl>
                <FormErrorMessage>{error}</FormErrorMessage>
            </FormItem>
        )}
    </FormField>
    <FormField name="metric.amount">
        {({ value, setValue, error }) => (
            <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                    <Input
                        type="number"
                        value={value}
                        onChange={(event) =>
                            setValue(Number(event.target.value) || 0)
                        }
                    />
                </FormControl>
                <FormErrorMessage>{error}</FormErrorMessage>
            </FormItem>
        )}
    </FormField>
    <Button type="submit">Save</Button>
</Form>`;

export const NestedObject: Story = {
    render: function NestedObject() {
        const {
            Form,
            FormField,
            FormItem,
            FormLabel,
            FormControl,
            FormErrorMessage,
        } = useForm({
            schema: nestedSchema,
            defaultValues: {
                address: { street: "", city: "" },
                metric: { target: "revenue", amount: 0 },
            },
            onSubmit: () => undefined,
        });

        return (
            <Form>
                <FormField name="address.street">
                    {({ value, setValue, error }) => (
                        <FormItem>
                            <FormLabel>Street</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Street"
                                    value={value}
                                    onChange={(event) =>
                                        setValue(event.target.value)
                                    }
                                />
                            </FormControl>
                            <FormErrorMessage>{error}</FormErrorMessage>
                        </FormItem>
                    )}
                </FormField>
                <FormField name="address.city">
                    {({ value, setValue, error }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="City"
                                    value={value}
                                    onChange={(event) =>
                                        setValue(event.target.value)
                                    }
                                />
                            </FormControl>
                            <FormErrorMessage>{error}</FormErrorMessage>
                        </FormItem>
                    )}
                </FormField>
                <FormField name="metric.target">
                    {({ value, setValue, error }) => (
                        <FormItem>
                            <FormLabel>Target</FormLabel>
                            <FormControl>
                                <Input
                                    value={value}
                                    onChange={(event) =>
                                        setValue(event.target.value)
                                    }
                                />
                            </FormControl>
                            <FormErrorMessage>{error}</FormErrorMessage>
                        </FormItem>
                    )}
                </FormField>
                <FormField name="metric.amount">
                    {({ value, setValue, error }) => (
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    value={value}
                                    onChange={(event) =>
                                        setValue(
                                            Number(event.target.value) || 0,
                                        )
                                    }
                                />
                            </FormControl>
                            <FormErrorMessage>{error}</FormErrorMessage>
                        </FormItem>
                    )}
                </FormField>
                <Button type="submit">Save</Button>
            </Form>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Register nested paths so each control owns its value and error. Typing a street and submitting shows only the city error.",
            },
            source: { code: nestedSource },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const target = canvas.getByLabelText("Target");
        const amount = canvas.getByLabelText("Amount");

        expect((amount as HTMLInputElement).value).toBe("0");
        expect((target as HTMLInputElement).value).toBe("revenue");

        await userEvent.clear(target);
        await userEvent.type(target, "profit");

        expect((target as HTMLInputElement).value).toBe("profit");
        expect((amount as HTMLInputElement).value).toBe("0");

        const street = canvas.getByLabelText("Street");
        const save = canvas.getByRole("button", { name: "Save" });

        await userEvent.type(street, "1 Main");
        await userEvent.click(save);

        expect(canvas.queryByText("Enter a street")).toBeNull();
        expect(canvas.getByText("Enter a city")).toBeTruthy();
    },
};

const arraysSource = `const schema = z.object({
    tags: z.array(z.string()).min(1, "Add a tag"),
    contacts: z
        .array(
            z.object({
                name: z.string().min(1, "Enter a name"),
                email: z.email("Enter a valid email"),
            }),
        )
        .min(1, "Add a contact"),
});

const {
    Form,
    FormField,
    FormFieldArray,
    FormItem,
    FormLabel,
    FormControl,
    FormErrorMessage,
} = useForm({
    schema,
    defaultValues: {
        tags: ["alpha"],
        contacts: [{ name: "", email: "" }],
    },
    onSubmit: (data) => console.log(data),
});

<Form>
    <FormField name="tags">
        {({ value, setValue, error }) => (
            <FormItem>
                <FormLabel>Tags</FormLabel>
                <div className="flex flex-wrap gap-2">
                    {value.map((tag) => (
                        <Badge key={tag} variant="secondary">
                            {tag}
                        </Badge>
                    ))}
                </div>
                <FormControl>
                    <Input
                        placeholder="Add a tag"
                        onKeyDown={(event) => {
                            if (event.key !== "Enter") {
                                return;
                            }
                            event.preventDefault();
                            const next = event.currentTarget.value.trim();
                            if (!next) {
                                return;
                            }
                            setValue((tags) =>
                                tags.includes(next) ? tags : [...tags, next],
                            );
                            event.currentTarget.value = "";
                        }}
                    />
                </FormControl>
                <FormErrorMessage>{error}</FormErrorMessage>
            </FormItem>
        )}
    </FormField>
    <FormFieldArray name="contacts">
        {({ items, append, remove, error }) => (
            <div className="grid gap-3">
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        className="grid gap-2 rounded-md border p-3"
                    >
                        <FormField name={\`contacts.\${index}.name\`}>
                            {({ value, setValue, error }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            value={value}
                                            onChange={(event) =>
                                                setValue(event.target.value)
                                            }
                                        />
                                    </FormControl>
                                    <FormErrorMessage>{error}</FormErrorMessage>
                                </FormItem>
                            )}
                        </FormField>
                        <FormField name={\`contacts.\${index}.email\`}>
                            {({ value, setValue, error }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            value={value}
                                            onChange={(event) =>
                                                setValue(event.target.value)
                                            }
                                        />
                                    </FormControl>
                                    <FormErrorMessage>{error}</FormErrorMessage>
                                </FormItem>
                            )}
                        </FormField>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => remove(index)}
                        >
                            Remove
                        </Button>
                    </div>
                ))}
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => append({ name: "", email: "" })}
                >
                    Add contact
                </Button>
                <FormErrorMessage>{error}</FormErrorMessage>
            </div>
        )}
    </FormFieldArray>
    <Button type="submit">Save</Button>
</Form>`;

export const Arrays: Story = {
    render: function Arrays() {
        const {
            Form,
            FormField,
            FormFieldArray,
            FormItem,
            FormLabel,
            FormControl,
            FormErrorMessage,
        } = useForm({
            schema: arraysSchema,
            defaultValues: {
                tags: ["alpha"],
                contacts: [{ name: "", email: "" }],
            },
            onSubmit: () => undefined,
        });

        return (
            <Form>
                <FormField name="tags">
                    {({ value, setValue, error }) => (
                        <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <div className="flex flex-wrap gap-2">
                                {value.map((tag) => (
                                    <Badge key={tag} variant="secondary">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                            <FormControl>
                                <Input
                                    placeholder="Add a tag"
                                    onKeyDown={(event) => {
                                        if (event.key !== "Enter") {
                                            return;
                                        }
                                        event.preventDefault();
                                        const next =
                                            event.currentTarget.value.trim();
                                        if (!next) {
                                            return;
                                        }
                                        setValue((tags) =>
                                            tags.includes(next)
                                                ? tags
                                                : [...tags, next],
                                        );
                                        event.currentTarget.value = "";
                                    }}
                                />
                            </FormControl>
                            <FormErrorMessage>{error}</FormErrorMessage>
                        </FormItem>
                    )}
                </FormField>
                <FormFieldArray name="contacts">
                    {({ items, append, remove, error }) => (
                        <div className="grid gap-3">
                            {items.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="grid gap-2 rounded-md border p-3"
                                >
                                    <FormField name={`contacts.${index}.name`}>
                                        {({ value, setValue, error }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        value={value}
                                                        onChange={(event) =>
                                                            setValue(
                                                                event.target
                                                                    .value,
                                                            )
                                                        }
                                                    />
                                                </FormControl>
                                                <FormErrorMessage>
                                                    {error}
                                                </FormErrorMessage>
                                            </FormItem>
                                        )}
                                    </FormField>
                                    <FormField name={`contacts.${index}.email`}>
                                        {({ value, setValue, error }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        value={value}
                                                        onChange={(event) =>
                                                            setValue(
                                                                event.target
                                                                    .value,
                                                            )
                                                        }
                                                    />
                                                </FormControl>
                                                <FormErrorMessage>
                                                    {error}
                                                </FormErrorMessage>
                                            </FormItem>
                                        )}
                                    </FormField>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => remove(index)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => append({ name: "", email: "" })}
                            >
                                Add contact
                            </Button>
                            <FormErrorMessage>{error}</FormErrorMessage>
                        </div>
                    )}
                </FormFieldArray>
                <Button type="submit">Save</Button>
            </Form>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Arrays of strings or numbers use FormField. Arrays of objects use FormFieldArray for stable row keys, with FormField on each nested path for per-cell errors.",
            },
            source: { code: arraysSource },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        expect(canvas.getByText("alpha")).toBeTruthy();
        expect(canvas.getAllByLabelText("Name")).toHaveLength(1);

        await userEvent.type(
            canvas.getByPlaceholderText("Add a tag"),
            "beta{Enter}",
        );

        expect(canvas.getByText("beta")).toBeTruthy();

        await userEvent.click(
            canvas.getByRole("button", { name: "Add contact" }),
        );

        expect(canvas.getAllByLabelText("Name")).toHaveLength(2);
    },
};

const anyControlSource = `const [submitted, setSubmitted] = useState<string>();
const id = useId();

const { Form, FormField, FormItem, FormLabel, FormControl, FormErrorMessage } =
    useForm({
        defaultValues: {
            date: undefined as Date | undefined,
            volume: [48],
            plan: "comfortable",
            notifications: true,
            priority: "low",
        },
        onSubmit: (data) => setSubmitted(JSON.stringify(data)),
    });

<Form>
    <FormField name="date">
        {({ value, setValue, error }) => (
            <FormItem>
                <FormLabel>Date</FormLabel>
                <DatePicker>
                    <FormControl>
                        <DatePickerTrigger placeholder="Pick a date">
                            {value ? format(value, "PPP") : null}
                        </DatePickerTrigger>
                    </FormControl>
                    <DatePickerContent>
                        <Calendar
                            mode="single"
                            selected={value}
                            onSelect={setValue}
                        />
                    </DatePickerContent>
                </DatePicker>
                <FormErrorMessage>{error}</FormErrorMessage>
            </FormItem>
        )}
    </FormField>
    <FormField name="volume">
        {({ value, setValue, error }) => (
            <FormItem>
                <FormLabel>Volume</FormLabel>
                <FormControl>
                    <Slider
                        value={value}
                        onValueChange={setValue}
                        max={100}
                        step={1}
                    />
                </FormControl>
                <FormErrorMessage>{error}</FormErrorMessage>
            </FormItem>
        )}
    </FormField>
    <FormField name="plan">
        {({ value, setValue, error }) => (
            <FormItem>
                <FormLabel>Plan</FormLabel>
                <FormControl>
                    <RadioGroup value={value} onValueChange={setValue}>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem
                                value="default"
                                id={\`\${id}-default\`}
                            />
                            <Label htmlFor={\`\${id}-default\`}>Default</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem
                                value="comfortable"
                                id={\`\${id}-comfortable\`}
                            />
                            <Label htmlFor={\`\${id}-comfortable\`}>
                                Comfortable
                            </Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem
                                value="compact"
                                id={\`\${id}-compact\`}
                            />
                            <Label htmlFor={\`\${id}-compact\`}>Compact</Label>
                        </div>
                    </RadioGroup>
                </FormControl>
                <FormErrorMessage>{error}</FormErrorMessage>
            </FormItem>
        )}
    </FormField>
    <FormField name="notifications">
        {({ value, setValue, error }) => (
            <FormItem>
                <FormLabel>Notifications</FormLabel>
                <FormControl>
                    <Switch checked={value} onCheckedChange={setValue} />
                </FormControl>
                <FormErrorMessage>{error}</FormErrorMessage>
            </FormItem>
        )}
    </FormField>
    <FormField name="priority">
        {({ value, setValue }) => (
            <FormItem>
                <FormLabel>Priority</FormLabel>
                <Badge
                    variant={value === "high" ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => setValue(value === "high" ? "low" : "high")}
                >
                    {value}
                </Badge>
            </FormItem>
        )}
    </FormField>
    <Button type="submit">Save</Button>
</Form>`;

export const AnyControl: Story = {
    render: function AnyControl() {
        const [submitted, setSubmitted] = useState<string>();
        const id = useId();
        const {
            Form,
            FormField,
            FormItem,
            FormLabel,
            FormControl,
            FormErrorMessage,
        } = useForm({
            defaultValues: {
                date: undefined as Date | undefined,
                volume: [48],
                plan: "comfortable",
                notifications: true,
                priority: "low",
            },
            onSubmit: (data) => setSubmitted(JSON.stringify(data)),
        });

        return (
            <Form>
                <FormField name="date">
                    {({ value, setValue, error }) => (
                        <FormItem>
                            <FormLabel>Date</FormLabel>
                            <DatePicker>
                                <FormControl>
                                    <DatePickerTrigger placeholder="Pick a date">
                                        {value ? format(value, "PPP") : null}
                                    </DatePickerTrigger>
                                </FormControl>
                                <DatePickerContent>
                                    <Calendar
                                        mode="single"
                                        selected={value}
                                        onSelect={setValue}
                                    />
                                </DatePickerContent>
                            </DatePicker>
                            <FormErrorMessage>{error}</FormErrorMessage>
                        </FormItem>
                    )}
                </FormField>
                <FormField name="volume">
                    {({ value, setValue, error }) => (
                        <FormItem>
                            <FormLabel>Volume</FormLabel>
                            <FormControl>
                                <Slider
                                    value={value}
                                    onValueChange={setValue}
                                    max={100}
                                    step={1}
                                />
                            </FormControl>
                            <FormErrorMessage>{error}</FormErrorMessage>
                        </FormItem>
                    )}
                </FormField>
                <FormField name="plan">
                    {({ value, setValue, error }) => (
                        <FormItem>
                            <FormLabel>Plan</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    value={value}
                                    onValueChange={setValue}
                                >
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem
                                            value="default"
                                            id={`${id}-default`}
                                        />
                                        <Label htmlFor={`${id}-default`}>
                                            Default
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem
                                            value="comfortable"
                                            id={`${id}-comfortable`}
                                        />
                                        <Label htmlFor={`${id}-comfortable`}>
                                            Comfortable
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem
                                            value="compact"
                                            id={`${id}-compact`}
                                        />
                                        <Label htmlFor={`${id}-compact`}>
                                            Compact
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </FormControl>
                            <FormErrorMessage>{error}</FormErrorMessage>
                        </FormItem>
                    )}
                </FormField>
                <FormField name="notifications">
                    {({ value, setValue, error }) => (
                        <FormItem>
                            <FormLabel>Notifications</FormLabel>
                            <FormControl>
                                <Switch
                                    checked={value}
                                    onCheckedChange={setValue}
                                />
                            </FormControl>
                            <FormErrorMessage>{error}</FormErrorMessage>
                        </FormItem>
                    )}
                </FormField>
                <FormField name="priority">
                    {({ value, setValue }) => (
                        <FormItem>
                            <FormLabel>Priority</FormLabel>
                            <Badge
                                variant={
                                    value === "high" ? "default" : "secondary"
                                }
                                className="cursor-pointer"
                                onClick={() =>
                                    setValue(value === "high" ? "low" : "high")
                                }
                            >
                                {value}
                            </Badge>
                        </FormItem>
                    )}
                </FormField>
                <Button type="submit">Save</Button>
                {submitted ? (
                    <pre className="overflow-x-auto text-xs text-muted-foreground">
                        {submitted}
                    </pre>
                ) : null}
            </Form>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "DatePicker, Slider, RadioGroup, Switch, and a custom Badge use the same value and setValue API. Wrap a single control in FormControl so it receives id, ref, and invalid state.",
            },
            source: { code: anyControlSource },
        },
    },
};

const invalidSource = `const schema = z.object({
    email: z.email("Enter a valid email"),
    name: z.string().min(1, "Enter a name"),
});

const { Form, FormField, FormItem, FormLabel, FormControl, FormErrorMessage } =
    useForm({
        schema,
        defaultValues: { email: "", name: "" },
        onSubmit: () => undefined,
    });

<Form>
    <FormField name="email">
        {({ value, setValue, error }) => (
            <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input
                        type="email"
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                    />
                </FormControl>
                <FormErrorMessage>{error}</FormErrorMessage>
            </FormItem>
        )}
    </FormField>
    <FormField name="name">
        {({ value, setValue, error }) => (
            <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                    <Input
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                    />
                </FormControl>
                <FormErrorMessage>{error}</FormErrorMessage>
            </FormItem>
        )}
    </FormField>
    <Button type="submit">Save</Button>
</Form>`;

export const Invalid: Story = {
    render: function Invalid() {
        const {
            Form,
            FormField,
            FormItem,
            FormLabel,
            FormControl,
            FormErrorMessage,
        } = useForm({
            schema: invalidSchema,
            defaultValues: { email: "", name: "" },
            onSubmit: () => undefined,
        });

        return (
            <Form>
                <FormField name="email">
                    {({ value, setValue, error }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    value={value}
                                    onChange={(event) =>
                                        setValue(event.target.value)
                                    }
                                />
                            </FormControl>
                            <FormErrorMessage>{error}</FormErrorMessage>
                        </FormItem>
                    )}
                </FormField>
                <FormField name="name">
                    {({ value, setValue, error }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    value={value}
                                    onChange={(event) =>
                                        setValue(event.target.value)
                                    }
                                />
                            </FormControl>
                            <FormErrorMessage>{error}</FormErrorMessage>
                        </FormItem>
                    )}
                </FormField>
                <Button type="submit">Save</Button>
            </Form>
        );
    },
    parameters: {
        docs: {
            source: { code: invalidSource },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const email = canvas.getByLabelText("Email");
        const name = canvas.getByLabelText("Name");
        const save = canvas.getByRole("button", { name: "Save" });

        await userEvent.type(email, "a");

        expect(canvas.getByText("Enter a valid email")).toBeTruthy();
        expect(canvas.queryByText("Enter a name")).toBeNull();
        expect(email.getAttribute("aria-invalid")).toBe("true");
        expect(name.getAttribute("aria-invalid")).toBeNull();

        await userEvent.clear(email);
        await userEvent.type(email, "you@example.com");

        expect(canvas.queryByText("Enter a valid email")).toBeNull();
        expect(email.getAttribute("aria-invalid")).toBeNull();
        expect(canvas.queryByText("Enter a name")).toBeNull();

        await userEvent.clear(email);
        await userEvent.click(save);

        expect(canvas.getByText("Enter a valid email")).toBeTruthy();
        expect(canvas.getByText("Enter a name")).toBeTruthy();
        expect(email.getAttribute("aria-invalid")).toBe("true");
        expect(name.getAttribute("aria-invalid")).toBe("true");
    },
};

/* Count real re-renders. Memoizing this would hide sibling updates. */
function RenderCount({ testId }: { testId: string }) {
    "use no memo";
    const renders = useRef(0);
    // eslint-disable-next-line react-hooks/refs -- bump during render so the compiler cannot skip it
    renders.current += 1;
    return (
        <span className="text-xs text-muted-foreground" data-testid={testId}>
            {/* eslint-disable-next-line react-hooks/refs -- same render counter */}
            renders {renders.current}
        </span>
    );
}

const renderIsolationSource = `function RenderCount({ testId }: { testId: string }) {
    "use no memo";
    const renders = useRef(0);
    renders.current += 1;
    return <span data-testid={testId}>renders {renders.current}</span>;
}

const { Form, FormField, FormItem, FormLabel, FormControl } = useForm({
    defaultValues: { email: "", fruit: "" },
    onSubmit: () => undefined,
});

<>
    <RenderCount testId="root-renders" />
    <Form>
        <FormField name="email">
            {({ value, setValue }) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input
                            type="email"
                            value={value}
                            onChange={(event) => setValue(event.target.value)}
                        />
                    </FormControl>
                    <RenderCount testId="email-renders" />
                </FormItem>
            )}
        </FormField>
        <FormField name="fruit">
            {({ value, setValue }) => (
                <FormItem>
                    <FormLabel>Fruit</FormLabel>
                    <Select>
                        <FormControl>
                            <SelectTrigger placeholder="Select a fruit">
                                {
                                    fruits.find((fruit) => fruit.value === value)
                                        ?.label
                                }
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {fruits.map((fruit) => (
                                <SelectOption
                                    key={fruit.value}
                                    value={fruit.value}
                                    selected={fruit.value === value}
                                    onClick={() => setValue(fruit.value)}
                                >
                                    {fruit.label}
                                </SelectOption>
                            ))}
                        </SelectContent>
                    </Select>
                    <RenderCount testId="fruit-renders" />
                </FormItem>
            )}
        </FormField>
    </Form>
</>`;

export const RenderIsolation: Story = {
    render: function RenderIsolation() {
        const { Form, FormField, FormItem, FormLabel, FormControl } = useForm({
            defaultValues: { email: "", fruit: "" },
            onSubmit: () => undefined,
        });

        return (
            <>
                <RenderCount testId="root-renders" />
                <Form>
                    <FormField name="email">
                        {({ value, setValue }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        value={value}
                                        onChange={(event) =>
                                            setValue(event.target.value)
                                        }
                                    />
                                </FormControl>
                                <RenderCount testId="email-renders" />
                            </FormItem>
                        )}
                    </FormField>
                    <FormField name="fruit">
                        {({ value, setValue }) => (
                            <FormItem>
                                <FormLabel>Fruit</FormLabel>
                                <Select>
                                    <FormControl>
                                        <SelectTrigger placeholder="Select a fruit">
                                            {
                                                fruits.find(
                                                    (fruit) =>
                                                        fruit.value === value,
                                                )?.label
                                            }
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {fruits.map((fruit) => (
                                            <SelectOption
                                                key={fruit.value}
                                                value={fruit.value}
                                                selected={fruit.value === value}
                                                onClick={() =>
                                                    setValue(fruit.value)
                                                }
                                            >
                                                {fruit.label}
                                            </SelectOption>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <RenderCount testId="fruit-renders" />
                            </FormItem>
                        )}
                    </FormField>
                </Form>
            </>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Typing in one field must not re-render another field, or the component that called useForm.",
            },
            source: { code: renderIsolationSource },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const emailRenders = canvas.getByTestId("email-renders");
        const fruitRenders = canvas.getByTestId("fruit-renders");
        const rootRenders = canvas.getByTestId("root-renders");
        const emailCount = Number(
            emailRenders.textContent?.replace("renders ", ""),
        );
        const fruitCount = fruitRenders.textContent;
        const rootCount = rootRenders.textContent;

        await userEvent.type(canvas.getByLabelText("Email"), "a");

        expect(
            Number(emailRenders.textContent?.replace("renders ", "")),
        ).toBeGreaterThan(emailCount);
        expect(fruitRenders.textContent).toBe(fruitCount);
        expect(rootRenders.textContent).toBe(rootCount);
    },
};

const submitOutsideSource = `const schema = z.object({
    email: z.email("Enter a valid email"),
});

const {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormErrorMessage,
    submit,
    isSubmitting,
} = useForm({
    schema,
    defaultValues: { email: "you@example.com" },
    onSubmit: async (data) => {
        await save(data);
    },
});

<>
    <Form>
        <FormField name="email">
            {({ value, setValue, error }) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input
                            type="email"
                            value={value}
                            onChange={(event) => setValue(event.target.value)}
                        />
                    </FormControl>
                    <FormErrorMessage>{error}</FormErrorMessage>
                </FormItem>
            )}
        </FormField>
    </Form>
    <Button type="button" onClick={submit} disabled={isSubmitting}>
        Save
    </Button>
</>`;

export const SubmitOutsideForm: Story = {
    render: function SubmitOutsideForm() {
        const {
            Form,
            FormField,
            FormItem,
            FormLabel,
            FormControl,
            FormErrorMessage,
            submit,
            isSubmitting,
        } = useForm({
            schema: submitOutsideSchema,
            defaultValues: { email: "you@example.com" },
            onSubmit: async () => {
                await new Promise((resolve) => setTimeout(resolve, 400));
            },
        });

        return (
            <>
                <Form>
                    <FormField name="email">
                        {({ value, setValue, error }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        value={value}
                                        onChange={(event) =>
                                            setValue(event.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormErrorMessage>{error}</FormErrorMessage>
                            </FormItem>
                        )}
                    </FormField>
                </Form>
                <Button type="button" onClick={submit} disabled={isSubmitting}>
                    Save
                </Button>
            </>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "submit() and isSubmitting work outside Form, so a dialog footer can save without living inside the form element. isSubmitting stays true until an async onSubmit finishes.",
            },
            source: { code: submitOutsideSource },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const save = canvas.getByRole("button", { name: "Save" });

        expect(save.getAttribute("disabled")).toBeNull();

        const pending = userEvent.click(save);
        await waitFor(() => {
            expect(save.getAttribute("disabled")).toBe("");
        });
        await pending;
        await waitFor(() => {
            expect(save.getAttribute("disabled")).toBeNull();
        });
    },
};
