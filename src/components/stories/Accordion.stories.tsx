import type { Meta, StoryObj } from "@storybook/react-vite";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/Accordion";

const meta = {
    title: "Components/Accordion",
    component: Accordion,
    parameters: {
        docs: {
            description: {
                component: "Expandable sections, one or more at a time.",
            },
        },
    },
    args: {
        className: "w-72",
    },
    argTypes: {
        type: {
            control: "select",
            options: ["single", "multiple"],
            description: "One or several sections open",
        },
        collapsible: {
            control: "boolean",
            description: "Allow closing the open section",
        },
        children: { table: { disable: true } },
        className: { table: { disable: true } },
    },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const accordionUsage = (
    extra = "",
) => `<Accordion type="single" collapsible${extra} className="w-72">
    <AccordionItem value="shipping">
        <AccordionTrigger>Shipping</AccordionTrigger>
        <AccordionContent>Arrives in 2–4 days.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="returns">
        <AccordionTrigger>Returns</AccordionTrigger>
        <AccordionContent>Free returns within 30 days.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="warranty">
        <AccordionTrigger>Warranty</AccordionTrigger>
        <AccordionContent>Covered for one year.</AccordionContent>
    </AccordionItem>
</Accordion>`;

export const Default: Story = {
    args: { type: "single", collapsible: true },
    render: (args) => (
        <Accordion {...args}>
            <AccordionItem value="shipping">
                <AccordionTrigger>Shipping</AccordionTrigger>
                <AccordionContent>Arrives in 2–4 days.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="returns">
                <AccordionTrigger>Returns</AccordionTrigger>
                <AccordionContent>
                    Free returns within 30 days.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="warranty">
                <AccordionTrigger>Warranty</AccordionTrigger>
                <AccordionContent>Covered for one year.</AccordionContent>
            </AccordionItem>
        </Accordion>
    ),
    parameters: {
        docs: { source: { code: accordionUsage() } },
    },
};

export const Open: Story = {
    args: { type: "single", collapsible: true, defaultValue: "shipping" },
    render: (args) => (
        <Accordion {...args}>
            <AccordionItem value="shipping">
                <AccordionTrigger>Shipping</AccordionTrigger>
                <AccordionContent>Arrives in 2–4 days.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="returns">
                <AccordionTrigger>Returns</AccordionTrigger>
                <AccordionContent>
                    Free returns within 30 days.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="warranty">
                <AccordionTrigger>Warranty</AccordionTrigger>
                <AccordionContent>Covered for one year.</AccordionContent>
            </AccordionItem>
        </Accordion>
    ),
    parameters: {
        docs: {
            description: {
                story: "One section can start open.",
            },
            source: {
                code: accordionUsage(' defaultValue="shipping"'),
            },
        },
    },
};

export const Multiple: Story = {
    args: { type: "multiple", defaultValue: ["shipping", "returns"] },
    render: (args) => (
        <Accordion {...args}>
            <AccordionItem value="shipping">
                <AccordionTrigger>Shipping</AccordionTrigger>
                <AccordionContent>Arrives in 2–4 days.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="returns">
                <AccordionTrigger>Returns</AccordionTrigger>
                <AccordionContent>
                    Free returns within 30 days.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="warranty">
                <AccordionTrigger>Warranty</AccordionTrigger>
                <AccordionContent>Covered for one year.</AccordionContent>
            </AccordionItem>
        </Accordion>
    ),
    parameters: {
        docs: {
            description: {
                story: "More than one section can be open.",
            },
            source: {
                code: `<Accordion type="multiple" defaultValue={["shipping", "returns"]} className="w-72">
    <AccordionItem value="shipping">
        <AccordionTrigger>Shipping</AccordionTrigger>
        <AccordionContent>Arrives in 2–4 days.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="returns">
        <AccordionTrigger>Returns</AccordionTrigger>
        <AccordionContent>Free returns within 30 days.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="warranty">
        <AccordionTrigger>Warranty</AccordionTrigger>
        <AccordionContent>Covered for one year.</AccordionContent>
    </AccordionItem>
</Accordion>`,
            },
        },
    },
};
