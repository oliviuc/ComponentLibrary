import { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useVirtualizedList } from "@/hooks/useVirtualizedList";

const roles = ["Admin", "Member", "Viewer"] as const;

const firstNames = [
    "Alex",
    "Sam",
    "Jordan",
    "Riley",
    "Casey",
    "Quinn",
    "Avery",
    "Jamie",
    "Morgan",
    "Taylor",
];

const lastNames = [
    "Lee",
    "Patel",
    "Garcia",
    "Nguyen",
    "Kim",
    "Okafor",
    "Silva",
    "Cohen",
    "Wright",
    "Nakamura",
];

function makePerson(index: number) {
    const first = firstNames[index % firstNames.length];
    const last =
        lastNames[Math.floor(index / firstNames.length) % lastNames.length];

    return {
        id: index,
        name: `${first} ${last}`,
        email: `${first.toLowerCase()}.${last.toLowerCase()}${index}@example.com`,
        initials: `${first[0]}${last[0]}`,
    };
}

function DefaultDemo({
    count,
    itemHeight,
    overscan,
}: {
    count: number;
    itemHeight: number;
    overscan: number;
}) {
    const items = useMemo(
        () => Array.from({ length: count }, (_, index) => makePerson(index)),
        [count],
    );
    const { scrollRef, innerStyle, virtualItems } = useVirtualizedList({
        items,
        itemHeight,
        overscan,
    });

    return (
        <div className="grid w-96 gap-2">
            <p className="text-sm text-muted-foreground">
                {count.toLocaleString()} people
            </p>
            <div
                ref={scrollRef}
                className="h-80 overflow-auto rounded-xl border"
            >
                <div style={innerStyle}>
                    {virtualItems.map((row) => (
                        <div
                            key={row.key}
                            className="flex items-center gap-3 px-3 hover:bg-muted/50"
                            style={row.style}
                        >
                            <Avatar size="sm">
                                <AvatarFallback>
                                    {row.item.initials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium">
                                    {row.item.name}
                                </p>
                                <p className="truncate text-xs text-muted-foreground">
                                    {row.item.email}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const defaultSource = `const items = Array.from({ length: 10000 }, (_, index) => ({
    id: index,
    name: \`Person \${index + 1}\`,
    email: \`person\${index + 1}@example.com\`,
    initials: "P",
}));

const { scrollRef, innerStyle, virtualItems } = useVirtualizedList({
    items,
    itemHeight: 56,
});

<div className="grid w-96 gap-2">
    <p className="text-sm text-muted-foreground">10,000 people</p>
    <div ref={scrollRef} className="h-80 overflow-auto rounded-xl border">
        <div style={innerStyle}>
            {virtualItems.map((row) => (
                <div
                    key={row.key}
                    className="flex items-center gap-3 px-3 hover:bg-muted/50"
                    style={row.style}
                >
                    <Avatar size="sm">
                        <AvatarFallback>{row.item.initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{row.item.name}</p>
                        <p className="truncate text-xs text-muted-foreground">
                            {row.item.email}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    </div>
</div>`;

const meta = {
    title: "Hooks/useVirtualizedList",
    component: DefaultDemo,
    parameters: {
        docs: {
            description: {
                component:
                    "Virtualizes a long list so only visible rows mount. Pass items and a fixed itemHeight, then put scrollRef on the scroller, innerStyle on the spacer, and row.style on each row.",
            },
        },
    },
    args: {
        count: 10000,
        itemHeight: 56,
        overscan: 5,
    },
    argTypes: {
        count: {
            control: { type: "number", min: 1, max: 100000, step: 100 },
            description: "How many rows to render",
        },
        itemHeight: {
            control: { type: "number", min: 32, max: 120, step: 4 },
            description: "Row height in pixels",
        },
        overscan: {
            control: { type: "number", min: 0, max: 20 },
            description: "Extra rows rendered outside the viewport",
        },
    },
} satisfies Meta<typeof DefaultDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: defaultSource,
            },
        },
    },
};

export const Table: Story = {
    render: function Table() {
        const items = useMemo(
            () =>
                Array.from({ length: 10000 }, (_, index) => ({
                    ...makePerson(index),
                    role: roles[index % roles.length],
                })),
            [],
        );
        const { scrollRef, innerStyle, virtualItems } = useVirtualizedList({
            items,
            itemHeight: 40,
        });

        return (
            <div
                ref={scrollRef}
                className="h-80 w-[36rem] overflow-auto rounded-xl border"
            >
                <table className="w-full text-sm">
                    <thead className="sticky top-0 z-10 block border-b bg-background">
                        <tr className="grid grid-cols-[3rem_1fr_minmax(0,1.4fr)_5.5rem] items-center">
                            <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                                #
                            </th>
                            <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                                Name
                            </th>
                            <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                                Email
                            </th>
                            <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                                Role
                            </th>
                        </tr>
                    </thead>
                    <tbody className="block" style={innerStyle}>
                        {virtualItems.map((row) => (
                            <tr
                                key={row.key}
                                className="grid grid-cols-[3rem_1fr_minmax(0,1.4fr)_5.5rem] items-center border-b hover:bg-muted/50"
                                style={row.style}
                            >
                                <td className="px-3 text-muted-foreground">
                                    {row.index + 1}
                                </td>
                                <td className="truncate px-3">
                                    {row.item.name}
                                </td>
                                <td className="truncate px-3 text-muted-foreground">
                                    {row.item.email}
                                </td>
                                <td className="px-3">
                                    <Badge variant="secondary">
                                        {row.item.role}
                                    </Badge>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Same hook, with a sticky header. Rows use display grid so absolute positioning still lines up with columns.",
            },
            source: {
                code: `const items = Array.from({ length: 10000 }, (_, index) => ({
    id: index,
    name: \`Person \${index + 1}\`,
    email: \`person\${index + 1}@example.com\`,
    role: roles[index % roles.length],
}));

const { scrollRef, innerStyle, virtualItems } = useVirtualizedList({
    items,
    itemHeight: 40,
});

<div ref={scrollRef} className="h-80 w-[36rem] overflow-auto rounded-xl border">
    <table className="w-full text-sm">
        <thead className="sticky top-0 z-10 block border-b bg-background">
            <tr className="grid grid-cols-[3rem_1fr_minmax(0,1.4fr)_5.5rem] items-center">
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                    #
                </th>
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                    Name
                </th>
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                    Email
                </th>
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                    Role
                </th>
            </tr>
        </thead>
        <tbody className="block" style={innerStyle}>
            {virtualItems.map((row) => (
                <tr
                    key={row.key}
                    className="grid grid-cols-[3rem_1fr_minmax(0,1.4fr)_5.5rem] items-center border-b hover:bg-muted/50"
                    style={row.style}
                >
                    <td className="px-3 text-muted-foreground">{row.index + 1}</td>
                    <td className="truncate px-3">{row.item.name}</td>
                    <td className="truncate px-3 text-muted-foreground">
                        {row.item.email}
                    </td>
                    <td className="px-3">
                        <Badge variant="secondary">{row.item.role}</Badge>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>`,
            },
        },
    },
};

export const ScrollToIndex: Story = {
    render: function ScrollToIndex() {
        const items = useMemo(
            () =>
                Array.from({ length: 10000 }, (_, index) => makePerson(index)),
            [],
        );
        const [index, setIndex] = useState("500");
        const { scrollRef, innerStyle, virtualItems, scrollToIndex } =
            useVirtualizedList({
                items,
                itemHeight: 56,
            });

        return (
            <div className="grid w-96 gap-3">
                <div className="grid gap-2">
                    <Label htmlFor="use-virtualized-list-index">
                        Jump to index
                    </Label>
                    <div className="flex gap-2">
                        <Input
                            id="use-virtualized-list-index"
                            inputMode="numeric"
                            value={index}
                            onChange={(event) => setIndex(event.target.value)}
                        />
                        <Button
                            onClick={() =>
                                scrollToIndex(Number(index) || 0, {
                                    align: "center",
                                    behavior: "smooth",
                                })
                            }
                        >
                            Jump
                        </Button>
                    </div>
                </div>
                <div
                    ref={scrollRef}
                    className="h-80 overflow-auto rounded-xl border"
                >
                    <div style={innerStyle}>
                        {virtualItems.map((row) => (
                            <div
                                key={row.key}
                                className="flex items-center px-3 text-sm hover:bg-muted/50"
                                style={row.style}
                            >
                                {row.index}. {row.item.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "scrollToIndex jumps to a row. align and behavior are optional.",
            },
            source: {
                code: `const items = Array.from({ length: 10000 }, (_, index) => ({
    id: index,
    name: \`Person \${index + 1}\`,
}));
const [index, setIndex] = useState("500");

const { scrollRef, innerStyle, virtualItems, scrollToIndex } =
    useVirtualizedList({
        items,
        itemHeight: 56,
    });

<div className="grid w-96 gap-3">
    <div className="flex gap-2">
        <Input
            id="use-virtualized-list-index"
            value={index}
            onChange={(event) => setIndex(event.target.value)}
        />
        <Button
            onClick={() =>
                scrollToIndex(Number(index) || 0, {
                    align: "center",
                    behavior: "smooth",
                })
            }
        >
            Jump
        </Button>
    </div>
    <div ref={scrollRef} className="h-80 overflow-auto rounded-xl border">
        <div style={innerStyle}>
            {virtualItems.map((row) => (
                <div
                    key={row.key}
                    className="flex items-center px-3 text-sm"
                    style={row.style}
                >
                    {row.index}. {row.item.name}
                </div>
            ))}
        </div>
    </div>
</div>`,
            },
        },
    },
};
