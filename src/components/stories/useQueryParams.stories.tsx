import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { z } from "zod";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useQueryParams } from "@/hooks/useQueryParams";
import { formatDateParam } from "@/utils/date";

const querySchema = z.object({
    q: z.string().optional(),
    page: z.coerce.number().int().positive().optional(),
    tags: z.array(z.string()).optional(),
    after: z.date().optional(),
});

const tags = ["ui", "a11y", "hooks"] as const;

function QueryParamsDemo({
    search,
    setSearch,
}: {
    search: string;
    setSearch: (search: string) => void;
}) {
    const { params, stringParams, setParams, clearAllParams } = useQueryParams({
        schema: querySchema,
        searchParams: search,
        setSearchParams: setSearch,
    });

    return (
        <div className="grid w-96 gap-4">
            <div className="grid gap-2">
                <Label htmlFor="query-q">Search</Label>
                <Input
                    id="query-q"
                    value={params.q ?? ""}
                    onChange={(event) =>
                        setParams({ q: event.target.value || null })
                    }
                    placeholder="Name"
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="query-page">Page</Label>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        onClick={() =>
                            setParams({
                                page: Math.max(1, (params.page ?? 1) - 1),
                            })
                        }
                    >
                        Previous
                    </Button>
                    <Input
                        id="query-page"
                        className="w-16 text-center"
                        value={params.page == null ? "" : String(params.page)}
                        onChange={(event) => {
                            const page = Number(event.target.value);
                            setParams({
                                page:
                                    Number.isInteger(page) && page > 0
                                        ? page
                                        : null,
                            });
                        }}
                    />
                    <Button
                        variant="outline"
                        onClick={() =>
                            setParams({ page: (params.page ?? 0) + 1 })
                        }
                    >
                        Next
                    </Button>
                </div>
            </div>
            <div className="grid gap-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => {
                        const selected = params.tags?.includes(tag) ?? false;
                        return (
                            <Button
                                key={tag}
                                variant={selected ? "default" : "outline"}
                                onClick={() => {
                                    const nextTags = selected
                                        ? params.tags?.filter(
                                              (value) => value !== tag,
                                          )
                                        : [...(params.tags ?? []), tag];
                                    setParams({
                                        tags:
                                            nextTags && nextTags.length > 0
                                                ? nextTags
                                                : null,
                                    });
                                }}
                            >
                                {tag}
                            </Button>
                        );
                    })}
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="query-after">After</Label>
                <Input
                    id="query-after"
                    type="date"
                    value={params.after ? formatDateParam(params.after) : ""}
                    onChange={(event) =>
                        setParams({
                            after: event.target.value
                                ? new Date(`${event.target.value}T00:00:00`)
                                : null,
                        })
                    }
                />
            </div>
            <Button variant="secondary" onClick={clearAllParams}>
                Clear all
            </Button>
            <dl className="grid gap-1 font-mono text-sm">
                <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">stringParams</dt>
                    <dd className="text-right break-all">
                        {stringParams || "—"}
                    </dd>
                </div>
                <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">search</dt>
                    <dd className="text-right break-all">{search || "—"}</dd>
                </div>
            </dl>
        </div>
    );
}

function UseQueryParamsDemo({ initialSearch }: { initialSearch: string }) {
    const [search, setSearch] = useState(initialSearch);
    return <QueryParamsDemo search={search} setSearch={setSearch} />;
}

const source = `const schema = z.object({
    q: z.string().optional(),
    page: z.coerce.number().optional(),
    tags: z.array(z.string()).optional(),
    after: z.date().optional(),
});

const [search, setSearch] = useState("q=button&page=1&utm_source=docs");
const { params, stringParams, setParams, clearAllParams } = useQueryParams({
    schema,
    searchParams: search,
    setSearchParams: setSearch,
});

<Input
    value={params.q ?? ""}
    onChange={(event) => setParams({ q: event.target.value || null })}
/>
<Button onClick={clearAllParams}>Clear all</Button>
<p>{stringParams}</p>`;

const meta = {
    title: "Hooks/useQueryParams",
    component: UseQueryParamsDemo,
    parameters: {
        docs: {
            description: {
                component:
                    "Typed query params from a Zod schema. Pass `searchParams` and `setSearchParams` from your router. Next.js: `useSearchParams()`. TanStack: `location.search` and `navigate`. Plain React: `useState`.",
            },
        },
    },
    args: {
        initialSearch: "q=button&page=1&utm_source=docs",
    },
} satisfies Meta<typeof UseQueryParamsDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: source,
            },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        expect(canvas.getByText("q=button&page=1")).toBeTruthy();
        expect(
            canvas.getByText("q=button&page=1&utm_source=docs"),
        ).toBeTruthy();

        await userEvent.click(canvas.getByRole("button", { name: "hooks" }));
        expect(canvas.getByText("q=button&page=1&tags=hooks")).toBeTruthy();
        expect(
            canvas.getByText("q=button&page=1&utm_source=docs&tags=hooks"),
        ).toBeTruthy();

        await userEvent.click(
            canvas.getByRole("button", { name: "Clear all" }),
        );
        expect(canvas.getByText("utm_source=docs")).toBeTruthy();
        expect(canvas.getByText("—")).toBeTruthy();
    },
};

export const Empty: Story = {
    args: {
        initialSearch: "",
    },
    parameters: {
        docs: {
            description: {
                story: "Start with no query string. Unknown keys are not required.",
            },
            source: {
                code: `const [search, setSearch] = useState("");
const { params, setParams } = useQueryParams({
    schema,
    searchParams: search,
    setSearchParams: setSearch,
});

<Input
    value={params.q ?? ""}
    onChange={(event) => setParams({ q: event.target.value || null })}
/>`,
            },
        },
    },
};
