import type { Meta, StoryObj } from "@storybook/react-vite";

import {
    ResizableGrip,
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/Resizable";

const meta = {
    title: "Components/Resizable",
    component: ResizablePanelGroup,
    parameters: {
        docs: {
            description: {
                component:
                    "Panels that share space. Name each handle so it can be resized from the keyboard.",
            },
        },
    },
    argTypes: {
        children: { table: { disable: true } },
        orientation: {
            control: "select",
            options: ["horizontal", "vertical"],
            description: "Direction the panels split",
        },
    },
} satisfies Meta<typeof ResizablePanelGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const panelClass =
    "flex items-center justify-center p-4 text-sm text-muted-foreground";

export const Default: Story = {
    render: () => (
        <ResizablePanelGroup
            orientation="horizontal"
            className="min-h-48 w-md rounded-lg border border-border"
        >
            <ResizablePanel defaultSize="50%" className={panelClass}>
                One
            </ResizablePanel>
            <ResizableHandle aria-label="Resize panels" />
            <ResizablePanel defaultSize="50%" className="h-full">
                <ResizablePanelGroup orientation="vertical">
                    <ResizablePanel className={panelClass}>Two</ResizablePanel>
                    <ResizableHandle aria-label="Resize rows" />
                    <ResizablePanel className={panelClass}>
                        Three
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>
        </ResizablePanelGroup>
    ),
    parameters: {
        docs: {
            source: {
                code: `<ResizablePanelGroup
    orientation="horizontal"
    className="min-h-48 w-md rounded-lg border border-border"
>
    <ResizablePanel defaultSize="50%" className="flex items-center justify-center p-4 text-sm text-muted-foreground">
        One
    </ResizablePanel>
    <ResizableHandle aria-label="Resize panels" />
    <ResizablePanel defaultSize="50%">
        <ResizablePanelGroup orientation="vertical">
            <ResizablePanel className="flex items-center justify-center p-4 text-sm text-muted-foreground">
                Two
            </ResizablePanel>
            <ResizableHandle aria-label="Resize rows" />
            <ResizablePanel className="flex items-center justify-center p-4 text-sm text-muted-foreground">
                Three
            </ResizablePanel>
        </ResizablePanelGroup>
    </ResizablePanel>
</ResizablePanelGroup>`,
            },
        },
    },
};

export const Vertical: Story = {
    render: () => (
        <ResizablePanelGroup
            orientation="vertical"
            className="min-h-48 w-md rounded-lg border border-border"
        >
            <ResizablePanel className={panelClass}>Header</ResizablePanel>
            <ResizableHandle aria-label="Resize header" />
            <ResizablePanel className={panelClass}>Content</ResizablePanel>
        </ResizablePanelGroup>
    ),
    parameters: {
        docs: {
            source: {
                code: `<ResizablePanelGroup
    orientation="vertical"
    className="min-h-48 w-md rounded-lg border border-border"
>
    <ResizablePanel className="flex items-center justify-center p-4 text-sm text-muted-foreground">
        Header
    </ResizablePanel>
    <ResizableHandle aria-label="Resize header" />
    <ResizablePanel className="flex items-center justify-center p-4 text-sm text-muted-foreground">
        Content
    </ResizablePanel>
</ResizablePanelGroup>`,
            },
        },
    },
};

export const WithGrip: Story = {
    render: () => (
        <ResizablePanelGroup
            orientation="horizontal"
            className="min-h-48 w-md rounded-lg border border-border"
        >
            <ResizablePanel className={panelClass}>Sidebar</ResizablePanel>
            <ResizableHandle aria-label="Resize sidebar">
                <ResizableGrip />
            </ResizableHandle>
            <ResizablePanel className={panelClass}>Content</ResizablePanel>
        </ResizablePanelGroup>
    ),
    parameters: {
        docs: {
            source: {
                code: `<ResizablePanelGroup
    orientation="horizontal"
    className="min-h-48 w-md rounded-lg border border-border"
>
    <ResizablePanel className="flex items-center justify-center p-4 text-sm text-muted-foreground">
        Sidebar
    </ResizablePanel>
    <ResizableHandle aria-label="Resize sidebar">
        <ResizableGrip />
    </ResizableHandle>
    <ResizablePanel className="flex items-center justify-center p-4 text-sm text-muted-foreground">
        Content
    </ResizablePanel>
</ResizablePanelGroup>`,
            },
        },
    },
};

export const Sidebar: Story = {
    render: () => (
        <ResizablePanelGroup
            orientation="horizontal"
            className="min-h-48 w-md rounded-lg border border-border"
        >
            <ResizablePanel
                defaultSize="30%"
                minSize="15%"
                maxSize="50%"
                collapsible
                collapsedSize="0%"
                className={panelClass}
            >
                Sidebar
            </ResizablePanel>
            <ResizableHandle aria-label="Resize sidebar">
                <ResizableGrip className="bg-primary" />
            </ResizableHandle>
            <ResizablePanel className={panelClass}>Content</ResizablePanel>
        </ResizablePanelGroup>
    ),
    parameters: {
        docs: {
            description: {
                story: "Drag the sidebar closed. The grip color comes from className.",
            },
            source: {
                code: `<ResizablePanelGroup
    orientation="horizontal"
    className="min-h-48 w-md rounded-lg border border-border"
>
    <ResizablePanel
        defaultSize="30%"
        minSize="15%"
        maxSize="50%"
        collapsible
        collapsedSize="0%"
        className="flex items-center justify-center p-4 text-sm text-muted-foreground"
    >
        Sidebar
    </ResizablePanel>
    <ResizableHandle aria-label="Resize sidebar">
        <ResizableGrip className="bg-primary" />
    </ResizableHandle>
    <ResizablePanel className="flex items-center justify-center p-4 text-sm text-muted-foreground">
        Content
    </ResizablePanel>
</ResizablePanelGroup>`,
            },
        },
    },
};
