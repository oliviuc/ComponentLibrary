import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
    Select,
    SelectContent,
    SelectOption,
    SelectTrigger,
} from "@/components/custom/Select";
import { Label } from "@/components/ui/Label";

const fruits = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "blueberry", label: "Blueberry" },
    { value: "grapes", label: "Grapes" },
    { value: "pineapple", label: "Pineapple" },
];

const manyFruits = [
    ...fruits,
    { value: "mango", label: "Mango" },
    { value: "orange", label: "Orange" },
    { value: "peach", label: "Peach" },
    { value: "pear", label: "Pear" },
    { value: "plum", label: "Plum" },
    { value: "raspberry", label: "Raspberry" },
    { value: "strawberry", label: "Strawberry" },
    { value: "watermelon", label: "Watermelon" },
    { value: "cherry", label: "Cherry" },
    { value: "kiwi", label: "Kiwi" },
    { value: "lemon", label: "Lemon" },
    { value: "lime", label: "Lime" },
    { value: "papaya", label: "Papaya" },
];

function FruitSelect({
    options = fruits,
    defaultValue = null,
    disabled,
    invalid,
    id,
    clearable,
}: {
    options?: { value: string; label: string; disabled?: boolean }[];
    defaultValue?: string | null;
    disabled?: boolean;
    invalid?: boolean;
    id?: string;
    clearable?: boolean;
}) {
    const [value, setValue] = useState<string | null>(defaultValue);
    const fieldId = id ?? "fruit";

    const field = (
        <Select value={value} onValueChange={setValue}>
            <SelectTrigger
                id={fieldId}
                placeholder="Select a fruit"
                disabled={disabled}
                aria-invalid={invalid || undefined}
                clearable={clearable}
                onClear={() => setValue(null)}
            />
            <SelectContent>
                {options.map((option) => (
                    <SelectOption
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                    >
                        {option.label}
                    </SelectOption>
                ))}
            </SelectContent>
        </Select>
    );

    if (id) {
        return field;
    }

    return (
        <div className="grid gap-2">
            <Label htmlFor={fieldId}>Fruit</Label>
            {field}
        </div>
    );
}

const usage = `const [value, setValue] = useState<string | null>(null);

<div className="grid gap-2">
    <Label htmlFor="fruit">Fruit</Label>
    <Select value={value} onValueChange={setValue}>
        <SelectTrigger id="fruit" placeholder="Select a fruit" />
        <SelectContent>
            {fruits.map((fruit) => (
                <SelectOption key={fruit.value} value={fruit.value}>
                    {fruit.label}
                </SelectOption>
            ))}
        </SelectContent>
    </Select>
</div>`;

const meta = {
    title: "Components/Select",
    component: Select,
    parameters: {
        docs: {
            canvas: { sourceState: "shown" },
            description: {
                component: "Pick one item from a list.",
            },
            source: {
                excludeDecorators: true,
                language: "tsx",
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
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <FruitSelect />,
    parameters: {
        docs: {
            source: { code: usage },
        },
    },
};

export const Selected: Story = {
    render: () => <FruitSelect defaultValue="banana" />,
    parameters: {
        docs: {
            description: {
                story: "An item can start selected.",
            },
            source: {
                code: usage.replace(
                    "useState<string | null>(null)",
                    'useState<string | null>("banana")',
                ),
            },
        },
    },
};

export const Clearable: Story = {
    render: function Clearable() {
        const [value, setValue] = useState<string | null>("banana");

        return (
            <div className="grid gap-2">
                <Label htmlFor="fruit">Fruit</Label>
                <Select value={value} onValueChange={setValue}>
                    <SelectTrigger
                        id="fruit"
                        placeholder="Select a fruit"
                        clearable
                        onClear={() => setValue(null)}
                    />
                    <SelectContent>
                        {fruits.map((fruit) => (
                            <SelectOption key={fruit.value} value={fruit.value}>
                                {fruit.label}
                            </SelectOption>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Show a clear button when an item is selected.",
            },
            source: {
                code: `const [value, setValue] = useState<string | null>("banana");

<div className="grid gap-2">
    <Label htmlFor="fruit">Fruit</Label>
    <Select value={value} onValueChange={setValue}>
        <SelectTrigger
            id="fruit"
            placeholder="Select a fruit"
            clearable
            onClear={() => setValue(null)}
        />
    <SelectContent>
        {fruits.map((fruit) => (
            <SelectOption key={fruit.value} value={fruit.value}>
                {fruit.label}
            </SelectOption>
        ))}
        </SelectContent>
    </Select>
</div>`,
            },
        },
    },
};

export const ManyOptions: Story = {
    render: () => <FruitSelect options={manyFruits} />,
    parameters: {
        docs: {
            description: {
                story: "Long lists scroll inside a 300px menu.",
            },
            source: {
                code: usage.replaceAll("fruits", "manyFruits"),
            },
        },
    },
};

export const DisabledOption: Story = {
    render: () => (
        <FruitSelect
            options={[
                { value: "apple", label: "Apple" },
                { value: "banana", label: "Banana", disabled: true },
                { value: "blueberry", label: "Blueberry" },
            ]}
        />
    ),
    parameters: {
        docs: {
            description: {
                story: "A single option can be unavailable.",
            },
            source: {
                code: `const [value, setValue] = useState<string | null>(null);

<div className="grid gap-2">
    <Label htmlFor="fruit">Fruit</Label>
    <Select value={value} onValueChange={setValue}>
        <SelectTrigger id="fruit" placeholder="Select a fruit" />
        <SelectContent>
            <SelectOption value="apple">Apple</SelectOption>
            <SelectOption value="banana" disabled>
                Banana
            </SelectOption>
            <SelectOption value="blueberry">Blueberry</SelectOption>
        </SelectContent>
    </Select>
</div>`,
            },
        },
    },
};

export const Disabled: Story = {
    render: () => <FruitSelect defaultValue="apple" disabled />,
    parameters: {
        docs: {
            source: {
                code: `const [value, setValue] = useState<string | null>("apple");

<div className="grid gap-2">
    <Label htmlFor="fruit">Fruit</Label>
    <Select value={value} onValueChange={setValue}>
        <SelectTrigger id="fruit" placeholder="Select a fruit" disabled />
        <SelectContent>
            {fruits.map((fruit) => (
                <SelectOption key={fruit.value} value={fruit.value}>
                    {fruit.label}
                </SelectOption>
            ))}
        </SelectContent>
    </Select>
</div>`,
            },
        },
    },
};

export const Invalid: Story = {
    render: () => <FruitSelect invalid />,
    parameters: {
        docs: {
            source: {
                code: usage.replace(
                    `placeholder="Select a fruit"`,
                    `placeholder="Select a fruit" aria-invalid`,
                ),
            },
        },
    },
};

export const WithLabel: Story = {
    render: () => (
        <div className="grid w-72 gap-2">
            <Label htmlFor="select-fruit">Fruit</Label>
            <FruitSelect id="select-fruit" />
        </div>
    ),
    parameters: {
        docs: {
            source: {
                code: `const [value, setValue] = useState<string | null>(null);

<div className="grid w-72 gap-2">
    <Label htmlFor="select-fruit">Fruit</Label>
    <Select value={value} onValueChange={setValue}>
        <SelectTrigger id="select-fruit" placeholder="Select a fruit" />
        <SelectContent>
            {fruits.map((fruit) => (
                <SelectOption key={fruit.value} value={fruit.value}>
                    {fruit.label}
                </SelectOption>
            ))}
        </SelectContent>
    </Select>
</div>`,
            },
        },
    },
};
