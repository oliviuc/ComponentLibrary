import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/Pagination";
import { usePaginatedList } from "@/hooks/usePaginatedList";

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
    limit,
    initialPage = 1,
}: {
    count: number;
    limit: number;
    initialPage?: number;
}) {
    const people = Array.from({ length: count }, (_, index) =>
        makePerson(index),
    );
    const [page, setPage] = useState(initialPage);
    const { data, page: currentPage } = usePaginatedList({
        data: people,
        page,
        limit,
    });

    if (page !== currentPage) {
        setPage(currentPage);
    }

    const pageCount = Math.max(1, Math.ceil(count / limit));

    return (
        <div className="grid w-96 gap-3">
            <p className="text-sm text-muted-foreground">
                Page {currentPage} of {pageCount}
            </p>
            <div className="overflow-hidden rounded-xl border">
                {data.map((person) => (
                    <div
                        key={person.id}
                        className="flex items-center gap-3 border-b px-3 py-2 last:border-b-0"
                    >
                        <Avatar size="sm">
                            <AvatarFallback>{person.initials}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium">
                                {person.name}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                                {person.email}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#previous"
                            onClick={(event) => {
                                event.preventDefault();
                                setPage(currentPage - 1);
                            }}
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#current" isActive>
                            {currentPage}
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            href="#next"
                            onClick={(event) => {
                                event.preventDefault();
                                setPage(currentPage + 1);
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}

const defaultSource = `const [page, setPage] = useState(1);
const { data, page: currentPage } = usePaginatedList({
    data: people,
    page,
    limit: 8,
});

if (page !== currentPage) {
    setPage(currentPage);
}

<div className="grid w-96 gap-3">
    <p className="text-sm text-muted-foreground">Page {currentPage}</p>
    <div className="overflow-hidden rounded-xl border">
        {data.map((person) => (
            <div
                key={person.id}
                className="flex items-center gap-3 border-b px-3 py-2 last:border-b-0"
            >
                <Avatar size="sm">
                    <AvatarFallback>{person.initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{person.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                        {person.email}
                    </p>
                </div>
            </div>
        ))}
    </div>
    <Pagination>
        <PaginationContent>
            <PaginationItem>
                <PaginationPrevious
                    href="#previous"
                    onClick={(event) => {
                        event.preventDefault();
                        setPage(currentPage - 1);
                    }}
                />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#current" isActive>
                    {currentPage}
                </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationNext
                    href="#next"
                    onClick={(event) => {
                        event.preventDefault();
                        setPage(currentPage + 1);
                    }}
                />
            </PaginationItem>
        </PaginationContent>
    </Pagination>
</div>`;

const meta = {
    title: "Hooks/usePaginatedList",
    component: DefaultDemo,
    parameters: {
        docs: {
            description: {
                component:
                    "Returns one page of a list. Pass data, an optional 1-based page (default 1), and limit. Page is clamped to a page that has data.",
            },
        },
    },
    args: {
        count: 48,
        limit: 8,
    },
    argTypes: {
        count: {
            control: { type: "number", min: 1, max: 10000, step: 8 },
            description: "How many rows in the source list",
        },
        limit: {
            control: { type: "number", min: 1, max: 50 },
            description: "Rows per page",
        },
        initialPage: { table: { disable: true } },
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
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        expect(canvas.getByText("Alex Lee")).toBeTruthy();
        expect(canvas.queryByText("Morgan Lee")).toBeNull();

        await userEvent.click(
            canvas.getByRole("link", { name: "Go to next page" }),
        );

        expect(canvas.getByText("Morgan Lee")).toBeTruthy();
        expect(canvas.queryByText("Alex Lee")).toBeNull();
    },
};

export const Clamped: Story = {
    args: {
        count: 20,
        limit: 8,
        initialPage: 99,
    },
    parameters: {
        docs: {
            description: {
                story: "A page past the last row snaps to the last page that has data. Below 1 snaps to 1.",
            },
            source: {
                code: `const [page, setPage] = useState(99);
const { data, page: currentPage } = usePaginatedList({
    data: people,
    page,
    limit: 8,
});

if (page !== currentPage) {
    setPage(currentPage);
}

<p>Page {currentPage}</p>
{data.map((person) => (
    <p key={person.id}>{person.name}</p>
))}`,
            },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        expect(canvas.getByText("Page 3 of 3")).toBeTruthy();
        expect(canvas.getByText("Avery Patel")).toBeTruthy();
        expect(canvas.queryByText("Alex Lee")).toBeNull();

        await userEvent.click(
            canvas.getByRole("link", { name: "Go to previous page" }),
        );

        expect(canvas.getByText("Page 2 of 3")).toBeTruthy();
        expect(canvas.getByText("Morgan Lee")).toBeTruthy();
        expect(canvas.queryByText("Avery Patel")).toBeNull();
    },
};
