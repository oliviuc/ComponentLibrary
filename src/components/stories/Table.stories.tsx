import type { Meta, StoryObj } from "@storybook/react-vite";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/Table";

const meta = {
    title: "Components/Table",
    component: Table,
    parameters: {
        docs: {
            description: {
                component: "Rows of related data in columns.",
            },
        },
    },
    argTypes: {
        children: { table: { disable: true } },
    },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => (
        <Table {...args}>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-25">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">INV002</TableCell>
                    <TableCell>Pending</TableCell>
                    <TableCell>PayPal</TableCell>
                    <TableCell className="text-right">$150.00</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">INV003</TableCell>
                    <TableCell>Unpaid</TableCell>
                    <TableCell>Bank Transfer</TableCell>
                    <TableCell className="text-right">$350.00</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    ),
    parameters: {
        docs: {
            source: {
                code: `<Table>
    <TableCaption>A list of your recent invoices.</TableCaption>
    <TableHeader>
        <TableRow>
            <TableHead className="w-25">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
            <TableCell className="font-medium">INV002</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell>PayPal</TableCell>
            <TableCell className="text-right">$150.00</TableCell>
        </TableRow>
        <TableRow>
            <TableCell className="font-medium">INV003</TableCell>
            <TableCell>Unpaid</TableCell>
            <TableCell>Bank Transfer</TableCell>
            <TableCell className="text-right">$350.00</TableCell>
        </TableRow>
    </TableBody>
</Table>`,
            },
        },
    },
};

export const WithFooter: Story = {
    render: (args) => (
        <Table {...args}>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-25">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">INV002</TableCell>
                    <TableCell>Pending</TableCell>
                    <TableCell>PayPal</TableCell>
                    <TableCell className="text-right">$150.00</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">INV003</TableCell>
                    <TableCell>Unpaid</TableCell>
                    <TableCell>Bank Transfer</TableCell>
                    <TableCell className="text-right">$350.00</TableCell>
                </TableRow>
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$750.00</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    ),
    parameters: {
        docs: {
            description: {
                story: "A footer can show a total or summary.",
            },
            source: {
                code: `<Table>
    <TableCaption>A list of your recent invoices.</TableCaption>
    <TableHeader>
        <TableRow>
            <TableHead className="w-25">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
            <TableCell className="font-medium">INV002</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell>PayPal</TableCell>
            <TableCell className="text-right">$150.00</TableCell>
        </TableRow>
        <TableRow>
            <TableCell className="font-medium">INV003</TableCell>
            <TableCell>Unpaid</TableCell>
            <TableCell>Bank Transfer</TableCell>
            <TableCell className="text-right">$350.00</TableCell>
        </TableRow>
    </TableBody>
    <TableFooter>
        <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$750.00</TableCell>
        </TableRow>
    </TableFooter>
</Table>`,
            },
        },
    },
};

export const WithStickyColumns: Story = {
    render: (args) => (
        <div className="w-80">
            <Table {...args}>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="sticky left-0 z-10 bg-background">
                            Invoice
                        </TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="sticky right-0 z-10 bg-background text-right">
                            Amount
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="sticky left-0 z-10 bg-background font-medium">
                            INV001
                        </TableCell>
                        <TableCell>Alex Rivera</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell>Mar 4</TableCell>
                        <TableCell className="sticky right-0 z-10 bg-background text-right">
                            $250.00
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="sticky left-0 z-10 bg-background font-medium">
                            INV002
                        </TableCell>
                        <TableCell>Jordan Lee</TableCell>
                        <TableCell>Pending</TableCell>
                        <TableCell>PayPal</TableCell>
                        <TableCell>Mar 11</TableCell>
                        <TableCell className="sticky right-0 z-10 bg-background text-right">
                            $150.00
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="sticky left-0 z-10 bg-background font-medium">
                            INV003
                        </TableCell>
                        <TableCell>Sam Patel</TableCell>
                        <TableCell>Unpaid</TableCell>
                        <TableCell>Bank Transfer</TableCell>
                        <TableCell>Mar 18</TableCell>
                        <TableCell className="sticky right-0 z-10 bg-background text-right">
                            $350.00
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "The first and last columns stay put while you scroll.",
            },
            source: {
                code: `<div className="w-80">
    <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className="sticky left-0 z-10 bg-background">
                    Invoice
                </TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="sticky right-0 z-10 bg-background text-right">
                    Amount
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
                <TableCell className="sticky left-0 z-10 bg-background font-medium">
                    INV001
                </TableCell>
                <TableCell>Alex Rivera</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell>Mar 4</TableCell>
                <TableCell className="sticky right-0 z-10 bg-background text-right">
                    $250.00
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="sticky left-0 z-10 bg-background font-medium">
                    INV002
                </TableCell>
                <TableCell>Jordan Lee</TableCell>
                <TableCell>Pending</TableCell>
                <TableCell>PayPal</TableCell>
                <TableCell>Mar 11</TableCell>
                <TableCell className="sticky right-0 z-10 bg-background text-right">
                    $150.00
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="sticky left-0 z-10 bg-background font-medium">
                    INV003
                </TableCell>
                <TableCell>Sam Patel</TableCell>
                <TableCell>Unpaid</TableCell>
                <TableCell>Bank Transfer</TableCell>
                <TableCell>Mar 18</TableCell>
                <TableCell className="sticky right-0 z-10 bg-background text-right">
                    $350.00
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
</div>`,
            },
        },
    },
};
