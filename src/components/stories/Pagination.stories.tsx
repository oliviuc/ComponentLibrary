import type { Meta, StoryObj } from "@storybook/react-vite";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/Pagination";

const meta = {
    title: "Components/Pagination",
    component: Pagination,
    parameters: {
        docs: {
            description: {
                component: "Page controls for a long list.",
            },
        },
    },
    argTypes: {
        children: { table: { disable: true } },
    },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => (
        <Pagination {...args}>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" isActive>
                        1
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    ),
    parameters: {
        docs: {
            source: {
                code: `<Pagination>
    <PaginationContent>
        <PaginationItem>
            <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
            <PaginationLink href="#" isActive>
                1
            </PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationNext href="#" />
        </PaginationItem>
    </PaginationContent>
</Pagination>`,
            },
        },
    },
};

export const WithEllipsis: Story = {
    render: (args) => (
        <Pagination {...args}>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" isActive>
                        4
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">5</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    ),
    parameters: {
        docs: {
            description: {
                story: "An ellipsis stands in for skipped pages.",
            },
            source: {
                code: `<Pagination>
    <PaginationContent>
        <PaginationItem>
            <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
            <PaginationLink href="#" isActive>
                4
            </PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink href="#">5</PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationNext href="#" />
        </PaginationItem>
    </PaginationContent>
</Pagination>`,
            },
        },
    },
};
