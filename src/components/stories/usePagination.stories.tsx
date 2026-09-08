import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { usePagination } from "@/hooks/usePagination";

function DefaultDemo({
    total,
    limit: pageLimit,
    initialPage = 1,
}: {
    total: number;
    limit: number;
    initialPage?: number;
}) {
    const { page, limit, totalPages, setPage } = usePagination({
        page: initialPage,
        limit: pageLimit,
        total,
    });

    return (
        <div className="grid w-80 gap-4">
            <div className="flex flex-wrap gap-2">
                <Badge>page {page}</Badge>
                <Badge variant="secondary">limit {limit}</Badge>
                <Badge variant="secondary">totalPages {totalPages}</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => setPage(page - 1)}>
                    Previous
                </Button>
                <Button variant="outline" onClick={() => setPage(page + 1)}>
                    Next
                </Button>
                <Button variant="outline" onClick={() => setPage(0)}>
                    Page 0
                </Button>
                <Button variant="outline" onClick={() => setPage(99)}>
                    Page 99
                </Button>
            </div>
        </div>
    );
}

const defaultSource = `const { page, limit, totalPages, setPage } = usePagination({
    page: 1,
    limit: 8,
    total: 48,
});

<div className="grid w-80 gap-4">
    <div className="flex flex-wrap gap-2">
        <Badge>page {page}</Badge>
        <Badge variant="secondary">limit {limit}</Badge>
        <Badge variant="secondary">totalPages {totalPages}</Badge>
    </div>
    <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => setPage(page - 1)}>
            Previous
        </Button>
        <Button variant="outline" onClick={() => setPage(page + 1)}>
            Next
        </Button>
        <Button variant="outline" onClick={() => setPage(0)}>
            Page 0
        </Button>
        <Button variant="outline" onClick={() => setPage(99)}>
            Page 99
        </Button>
    </div>
</div>`;

const meta = {
    title: "Hooks/usePagination",
    component: DefaultDemo,
    parameters: {
        docs: {
            description: {
                component:
                    "Keeps page in range from total and limit. It does not load or slice a list. Pass a 1-based page (default 1), limit, and total. setPage stays on a page that has data. totalPages is the last in-range page.",
            },
        },
    },
    args: {
        total: 48,
        limit: 8,
    },
    argTypes: {
        total: {
            control: { type: "number", min: 0, max: 10000, step: 8 },
            description: "How many items exist in total",
        },
        limit: {
            control: { type: "number", min: 1, max: 50 },
            description: "Items per page",
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

        expect(canvas.getByText("page 1")).toBeTruthy();
        expect(canvas.getByText("limit 8")).toBeTruthy();
        expect(canvas.getByText("totalPages 6")).toBeTruthy();

        await userEvent.click(canvas.getByRole("button", { name: "Next" }));

        expect(canvas.getByText("page 2")).toBeTruthy();
        expect(canvas.queryByText("page 1")).toBeNull();

        await userEvent.click(canvas.getByRole("button", { name: "Page 99" }));

        expect(canvas.getByText("page 6")).toBeTruthy();
        expect(canvas.queryByText("page 2")).toBeNull();
    },
};

export const Clamped: Story = {
    args: {
        total: 20,
        limit: 8,
        initialPage: 99,
    },
    parameters: {
        docs: {
            description: {
                story: "A page past the last item snaps to the last page that has data. Below 1 snaps to 1. setPage stays in that range too.",
            },
            source: {
                code: `const { page, limit, totalPages, setPage } = usePagination({
    page: 99,
    limit: 8,
    total: 20,
});

<div className="grid w-80 gap-4">
    <div className="flex flex-wrap gap-2">
        <Badge>page {page}</Badge>
        <Badge variant="secondary">limit {limit}</Badge>
        <Badge variant="secondary">totalPages {totalPages}</Badge>
    </div>
    <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => setPage(page - 1)}>
            Previous
        </Button>
        <Button variant="outline" onClick={() => setPage(page + 1)}>
            Next
        </Button>
        <Button variant="outline" onClick={() => setPage(0)}>
            Page 0
        </Button>
        <Button variant="outline" onClick={() => setPage(99)}>
            Page 99
        </Button>
    </div>
</div>`,
            },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        expect(canvas.getByText("page 3")).toBeTruthy();
        expect(canvas.getByText("totalPages 3")).toBeTruthy();

        await userEvent.click(canvas.getByRole("button", { name: "Next" }));

        expect(canvas.getByText("page 3")).toBeTruthy();

        await userEvent.click(canvas.getByRole("button", { name: "Previous" }));

        expect(canvas.getByText("page 2")).toBeTruthy();
        expect(canvas.queryByText("page 3")).toBeNull();

        await userEvent.click(canvas.getByRole("button", { name: "Page 0" }));

        expect(canvas.getByText("page 1")).toBeTruthy();
        expect(canvas.queryByText("page 2")).toBeNull();
    },
};
