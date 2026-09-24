import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
    CreditCardIcon,
    LogOutIcon,
    SettingsIcon,
    UserIcon,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

const meta = {
    title: "Components/DropdownMenu",
    component: DropdownMenu,
    parameters: {
        docs: {
            description: {
                component:
                    "A menu of actions opened from a button. Pass the button with render.",
            },
        },
    },
    argTypes: {
        children: { table: { disable: true } },
    },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>
                Open
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>My account</DropdownMenuLabel>
                    <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Billing
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ),
    parameters: {
        docs: {
            source: {
                code: `<DropdownMenu>
    <DropdownMenuTrigger render={<Button variant="outline" />}>
        Open
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
            <DropdownMenuLabel>My account</DropdownMenuLabel>
            <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
                Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
    </DropdownMenuContent>
</DropdownMenu>`,
            },
        },
    },
};

export const Checkboxes: Story = {
    render: function Checkboxes() {
        const [bookmarks, setBookmarks] = useState(true);
        const [urls, setUrls] = useState(false);

        return (
            <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="outline" />}>
                    View
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuGroup>
                        <DropdownMenuLabel>Show</DropdownMenuLabel>
                        <DropdownMenuCheckboxItem
                            checked={bookmarks}
                            onCheckedChange={setBookmarks}
                        >
                            Bookmarks
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={urls}
                            onCheckedChange={setUrls}
                        >
                            Full URLs
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [bookmarks, setBookmarks] = useState(true);
const [urls, setUrls] = useState(false);

<DropdownMenu>
    <DropdownMenuTrigger render={<Button variant="outline" />}>
        View
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
            <DropdownMenuLabel>Show</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
                checked={bookmarks}
                onCheckedChange={setBookmarks}
            >
                Bookmarks
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
                checked={urls}
                onCheckedChange={setUrls}
            >
                Full URLs
            </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
    </DropdownMenuContent>
</DropdownMenu>`,
            },
        },
    },
};

export const RadioGroup: Story = {
    render: function RadioGroupStory() {
        const [position, setPosition] = useState("bottom");

        return (
            <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="outline" />}>
                    Panel
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuGroup>
                        <DropdownMenuLabel>Panel position</DropdownMenuLabel>
                        <DropdownMenuRadioGroup
                            value={position}
                            onValueChange={(value) => setPosition(value)}
                        >
                            <DropdownMenuRadioItem value="top">
                                Top
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="bottom">
                                Bottom
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="right">
                                Right
                            </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [position, setPosition] = useState("bottom");

<DropdownMenu>
    <DropdownMenuTrigger render={<Button variant="outline" />}>
        Panel
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
            <DropdownMenuLabel>Panel position</DropdownMenuLabel>
            <DropdownMenuRadioGroup
                value={position}
                onValueChange={(value) => setPosition(value)}
            >
                <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom">
                    Bottom
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="right">
                    Right
                </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
    </DropdownMenuContent>
</DropdownMenu>`,
            },
        },
    },
};

export const Submenu: Story = {
    render: () => (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>
                Open
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem>New file</DropdownMenuItem>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem>Email</DropdownMenuItem>
                        <DropdownMenuItem>Message</DropdownMenuItem>
                        <DropdownMenuItem>Copy link</DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
            </DropdownMenuContent>
        </DropdownMenu>
    ),
    parameters: {
        docs: {
            source: {
                code: `<DropdownMenu>
    <DropdownMenuTrigger render={<Button variant="outline" />}>
        Open
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
        <DropdownMenuItem>New file</DropdownMenuItem>
        <DropdownMenuSub>
            <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuItem>Copy link</DropdownMenuItem>
            </DropdownMenuSubContent>
        </DropdownMenuSub>
    </DropdownMenuContent>
</DropdownMenu>`,
            },
        },
    },
};

export const WithIcons: Story = {
    render: () => (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>
                Account
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem>
                    <UserIcon />
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <CreditCardIcon />
                    Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <SettingsIcon />
                    Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                    <LogOutIcon />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ),
    parameters: {
        docs: {
            source: {
                code: `<DropdownMenu>
    <DropdownMenuTrigger render={<Button variant="outline" />}>
        Account
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
            <UserIcon />
            Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
            <CreditCardIcon />
            Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
            <SettingsIcon />
            Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
            <LogOutIcon />
            Log out
        </DropdownMenuItem>
    </DropdownMenuContent>
</DropdownMenu>`,
            },
        },
    },
};

export const Destructive: Story = {
    render: () => (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>
                Open
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem>Rename</DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ),
    parameters: {
        docs: {
            source: {
                code: `<DropdownMenu>
    <DropdownMenuTrigger render={<Button variant="outline" />}>
        Open
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
        <DropdownMenuItem>Rename</DropdownMenuItem>
        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
    </DropdownMenuContent>
</DropdownMenu>`,
            },
        },
    },
};

export const DisabledItem: Story = {
    render: () => (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>
                Open
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuItem disabled>Archive</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ),
    parameters: {
        docs: {
            source: {
                code: `<DropdownMenu>
    <DropdownMenuTrigger render={<Button variant="outline" />}>
        Open
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuItem disabled>Archive</DropdownMenuItem>
    </DropdownMenuContent>
</DropdownMenu>`,
            },
        },
    },
};

export const CustomColors: Story = {
    render: () => (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>
                Open
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem className="text-chart-2 focus:bg-chart-2/15 focus:text-chart-2">
                    Pin
                </DropdownMenuItem>
                <DropdownMenuItem>Leave as is</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ),
    parameters: {
        docs: {
            description: {
                story: "Recolor an item with classes.",
            },
            source: {
                code: `<DropdownMenu>
    <DropdownMenuTrigger render={<Button variant="outline" />}>
        Open
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
        <DropdownMenuItem className="text-chart-2 focus:bg-chart-2/15 focus:text-chart-2">
            Pin
        </DropdownMenuItem>
        <DropdownMenuItem>Leave as is</DropdownMenuItem>
    </DropdownMenuContent>
</DropdownMenu>`,
            },
        },
    },
};
