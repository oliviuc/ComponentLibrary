import type { Meta, StoryObj } from "@storybook/react-vite";

import {
    Avatar,
    AvatarBadge,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
} from "@/components/ui/Avatar";

const meta = {
    title: "Components/Avatar",
    component: Avatar,
    parameters: {
        docs: {
            description: {
                component: "A photo or initials for a person.",
            },
        },
    },
    argTypes: {
        size: {
            control: "select",
            options: ["default", "sm", "lg"],
            description: "Avatar size",
        },
        children: { table: { disable: true } },
    },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => (
        <Avatar {...args}>
            <AvatarFallback>AL</AvatarFallback>
        </Avatar>
    ),
    parameters: {
        docs: {
            source: {
                code: `<Avatar>
    <AvatarFallback>AL</AvatarFallback>
</Avatar>`,
            },
        },
    },
};

export const Image: Story = {
    render: (args) => (
        <Avatar {...args}>
            <AvatarImage src="https://picsum.photos/id/64/128/128" alt="Alex" />
            <AvatarFallback>AL</AvatarFallback>
        </Avatar>
    ),
    parameters: {
        docs: {
            source: {
                code: `<Avatar>
    <AvatarImage src="https://picsum.photos/id/64/128/128" alt="Alex" />
    <AvatarFallback>AL</AvatarFallback>
</Avatar>`,
            },
        },
    },
};

export const Small: Story = {
    args: { size: "sm" },
    render: (args) => (
        <Avatar {...args}>
            <AvatarFallback>AL</AvatarFallback>
        </Avatar>
    ),
    parameters: {
        docs: {
            source: {
                code: `<Avatar size="sm">
    <AvatarFallback>AL</AvatarFallback>
</Avatar>`,
            },
        },
    },
};

export const Large: Story = {
    args: { size: "lg" },
    render: (args) => (
        <Avatar {...args}>
            <AvatarFallback>AL</AvatarFallback>
        </Avatar>
    ),
    parameters: {
        docs: {
            source: {
                code: `<Avatar size="lg">
    <AvatarFallback>AL</AvatarFallback>
</Avatar>`,
            },
        },
    },
};

export const WithBadge: Story = {
    render: (args) => (
        <Avatar {...args}>
            <AvatarFallback>AL</AvatarFallback>
            <AvatarBadge />
        </Avatar>
    ),
    parameters: {
        docs: {
            description: {
                story: "A badge can mark status on the avatar.",
            },
            source: {
                code: `<Avatar>
    <AvatarFallback>AL</AvatarFallback>
    <AvatarBadge />
</Avatar>`,
            },
        },
    },
};

export const Group: Story = {
    render: (args) => (
        <AvatarGroup>
            <Avatar {...args}>
                <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <Avatar {...args}>
                <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            <Avatar {...args}>
                <AvatarFallback>JO</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+3</AvatarGroupCount>
        </AvatarGroup>
    ),
    parameters: {
        docs: {
            description: {
                story: "Stack avatars and show how many more there are.",
            },
            source: {
                code: `<AvatarGroup>
    <Avatar>
        <AvatarFallback>AL</AvatarFallback>
    </Avatar>
    <Avatar>
        <AvatarFallback>SA</AvatarFallback>
    </Avatar>
    <Avatar>
        <AvatarFallback>JO</AvatarFallback>
    </Avatar>
    <AvatarGroupCount>+3</AvatarGroupCount>
</AvatarGroup>`,
            },
        },
    },
};
