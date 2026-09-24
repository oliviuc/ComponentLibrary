import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileTextIcon, XIcon } from "lucide-react";

import {
    Attachment,
    AttachmentAction,
    AttachmentActions,
    AttachmentContent,
    AttachmentDescription,
    AttachmentGroup,
    AttachmentMedia,
    AttachmentTitle,
    AttachmentTrigger,
} from "@/components/ui/Attachment";
import { Progress } from "@/components/ui/Progress";
import { Spinner } from "@/components/ui/Spinner";

const meta = {
    title: "Components/Attachment",
    component: Attachment,
    parameters: {
        docs: {
            description: {
                component:
                    "A file or image chip. The title shimmers while it is uploading or processing.",
            },
        },
    },
    argTypes: {
        state: {
            control: "select",
            options: ["idle", "uploading", "processing", "error", "done"],
            description: "Upload state",
        },
        size: {
            control: "select",
            options: ["default", "sm", "xs"],
            description: "Size",
        },
        orientation: {
            control: "select",
            options: ["horizontal", "vertical"],
            description: "Layout",
        },
        children: { table: { disable: true } },
    },
} satisfies Meta<typeof Attachment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Attachment>
            <AttachmentMedia>
                <FileTextIcon />
            </AttachmentMedia>
            <AttachmentContent>
                <AttachmentTitle>report.pdf</AttachmentTitle>
                <AttachmentDescription>2.4 MB</AttachmentDescription>
            </AttachmentContent>
        </Attachment>
    ),
    parameters: {
        docs: {
            source: {
                code: `<Attachment>
    <AttachmentMedia>
        <FileTextIcon />
    </AttachmentMedia>
    <AttachmentContent>
        <AttachmentTitle>report.pdf</AttachmentTitle>
        <AttachmentDescription>2.4 MB</AttachmentDescription>
    </AttachmentContent>
</Attachment>`,
            },
        },
    },
};

export const Image: Story = {
    render: () => (
        <Attachment orientation="vertical">
            <AttachmentMedia variant="image">
                <img src="/favicon.svg" alt="Preview of report.pdf" />
            </AttachmentMedia>
            <AttachmentContent>
                <AttachmentTitle>report.pdf</AttachmentTitle>
                <AttachmentDescription>2 KB</AttachmentDescription>
            </AttachmentContent>
        </Attachment>
    ),
    parameters: {
        docs: {
            source: {
                code: `<Attachment orientation="vertical">
    <AttachmentMedia variant="image">
        <img src="/favicon.svg" alt="Preview of report.pdf" />
    </AttachmentMedia>
    <AttachmentContent>
        <AttachmentTitle>report.pdf</AttachmentTitle>
        <AttachmentDescription>2 KB</AttachmentDescription>
    </AttachmentContent>
</Attachment>`,
            },
        },
    },
};

export const States: Story = {
    render: () => (
        <div className="grid gap-3">
            <Attachment state="idle">
                <AttachmentMedia>
                    <FileTextIcon />
                </AttachmentMedia>
                <AttachmentContent>
                    <AttachmentTitle>notes.txt</AttachmentTitle>
                    <AttachmentDescription>
                        Drop to upload
                    </AttachmentDescription>
                </AttachmentContent>
            </Attachment>
            <Attachment state="uploading">
                <AttachmentMedia>
                    <Spinner aria-hidden />
                </AttachmentMedia>
                <AttachmentContent>
                    <AttachmentTitle>report.pdf</AttachmentTitle>
                    <Progress
                        value={62}
                        aria-label="Uploading report.pdf, 62 percent"
                        className="mt-2"
                    />
                </AttachmentContent>
            </Attachment>
            <Attachment state="processing">
                <AttachmentMedia>
                    <Spinner aria-hidden />
                </AttachmentMedia>
                <AttachmentContent>
                    <AttachmentTitle>report.pdf</AttachmentTitle>
                    <AttachmentDescription>Processing</AttachmentDescription>
                </AttachmentContent>
            </Attachment>
            <Attachment state="error">
                <AttachmentMedia>
                    <FileTextIcon />
                </AttachmentMedia>
                <AttachmentContent>
                    <AttachmentTitle>report.pdf</AttachmentTitle>
                    <AttachmentDescription>Upload failed</AttachmentDescription>
                </AttachmentContent>
            </Attachment>
            <Attachment state="done">
                <AttachmentMedia>
                    <FileTextIcon />
                </AttachmentMedia>
                <AttachmentContent>
                    <AttachmentTitle>report.pdf</AttachmentTitle>
                    <AttachmentDescription>2.4 MB</AttachmentDescription>
                </AttachmentContent>
            </Attachment>
        </div>
    ),
    parameters: {
        docs: {
            source: {
                code: `<div className="grid gap-3">
    <Attachment state="idle">
        <AttachmentMedia>
            <FileTextIcon />
        </AttachmentMedia>
        <AttachmentContent>
            <AttachmentTitle>notes.txt</AttachmentTitle>
            <AttachmentDescription>Drop to upload</AttachmentDescription>
        </AttachmentContent>
    </Attachment>
    <Attachment state="uploading">
        <AttachmentMedia>
            <Spinner aria-hidden />
        </AttachmentMedia>
        <AttachmentContent>
            <AttachmentTitle>report.pdf</AttachmentTitle>
            <Progress
                value={62}
                aria-label="Uploading report.pdf, 62 percent"
                className="mt-2"
            />
        </AttachmentContent>
    </Attachment>
    <Attachment state="processing">
        <AttachmentMedia>
            <Spinner aria-hidden />
        </AttachmentMedia>
        <AttachmentContent>
            <AttachmentTitle>report.pdf</AttachmentTitle>
            <AttachmentDescription>Processing</AttachmentDescription>
        </AttachmentContent>
    </Attachment>
    <Attachment state="error">
        <AttachmentMedia>
            <FileTextIcon />
        </AttachmentMedia>
        <AttachmentContent>
            <AttachmentTitle>report.pdf</AttachmentTitle>
            <AttachmentDescription>Upload failed</AttachmentDescription>
        </AttachmentContent>
    </Attachment>
    <Attachment state="done">
        <AttachmentMedia>
            <FileTextIcon />
        </AttachmentMedia>
        <AttachmentContent>
            <AttachmentTitle>report.pdf</AttachmentTitle>
            <AttachmentDescription>2.4 MB</AttachmentDescription>
        </AttachmentContent>
    </Attachment>
</div>`,
            },
        },
    },
};

export const Sizes: Story = {
    render: () => (
        <div className="flex items-center gap-3">
            <Attachment size="xs">
                <AttachmentMedia>
                    <FileTextIcon />
                </AttachmentMedia>
                <AttachmentContent>
                    <AttachmentTitle>report.pdf</AttachmentTitle>
                </AttachmentContent>
            </Attachment>
            <Attachment size="sm">
                <AttachmentMedia>
                    <FileTextIcon />
                </AttachmentMedia>
                <AttachmentContent>
                    <AttachmentTitle>report.pdf</AttachmentTitle>
                </AttachmentContent>
            </Attachment>
            <Attachment>
                <AttachmentMedia>
                    <FileTextIcon />
                </AttachmentMedia>
                <AttachmentContent>
                    <AttachmentTitle>report.pdf</AttachmentTitle>
                </AttachmentContent>
            </Attachment>
        </div>
    ),
    parameters: {
        docs: {
            source: {
                code: `<div className="flex items-center gap-3">
    <Attachment size="xs">
        <AttachmentMedia>
            <FileTextIcon />
        </AttachmentMedia>
        <AttachmentContent>
            <AttachmentTitle>report.pdf</AttachmentTitle>
        </AttachmentContent>
    </Attachment>
    <Attachment size="sm">
        <AttachmentMedia>
            <FileTextIcon />
        </AttachmentMedia>
        <AttachmentContent>
            <AttachmentTitle>report.pdf</AttachmentTitle>
        </AttachmentContent>
    </Attachment>
    <Attachment>
        <AttachmentMedia>
            <FileTextIcon />
        </AttachmentMedia>
        <AttachmentContent>
            <AttachmentTitle>report.pdf</AttachmentTitle>
        </AttachmentContent>
    </Attachment>
</div>`,
            },
        },
    },
};

export const Group: Story = {
    render: () => (
        <AttachmentGroup className="w-80">
            <Attachment>
                <AttachmentMedia>
                    <FileTextIcon />
                </AttachmentMedia>
                <AttachmentContent>
                    <AttachmentTitle>report.pdf</AttachmentTitle>
                    <AttachmentDescription>2.4 MB</AttachmentDescription>
                </AttachmentContent>
            </Attachment>
            <Attachment>
                <AttachmentMedia>
                    <FileTextIcon />
                </AttachmentMedia>
                <AttachmentContent>
                    <AttachmentTitle>notes.txt</AttachmentTitle>
                    <AttachmentDescription>12 KB</AttachmentDescription>
                </AttachmentContent>
            </Attachment>
            <Attachment>
                <AttachmentMedia>
                    <FileTextIcon />
                </AttachmentMedia>
                <AttachmentContent>
                    <AttachmentTitle>budget.xlsx</AttachmentTitle>
                    <AttachmentDescription>88 KB</AttachmentDescription>
                </AttachmentContent>
            </Attachment>
        </AttachmentGroup>
    ),
    parameters: {
        docs: {
            source: {
                code: `<AttachmentGroup className="w-80">
    <Attachment>
        <AttachmentMedia>
            <FileTextIcon />
        </AttachmentMedia>
        <AttachmentContent>
            <AttachmentTitle>report.pdf</AttachmentTitle>
            <AttachmentDescription>2.4 MB</AttachmentDescription>
        </AttachmentContent>
    </Attachment>
    <Attachment>
        <AttachmentMedia>
            <FileTextIcon />
        </AttachmentMedia>
        <AttachmentContent>
            <AttachmentTitle>notes.txt</AttachmentTitle>
            <AttachmentDescription>12 KB</AttachmentDescription>
        </AttachmentContent>
    </Attachment>
    <Attachment>
        <AttachmentMedia>
            <FileTextIcon />
        </AttachmentMedia>
        <AttachmentContent>
            <AttachmentTitle>budget.xlsx</AttachmentTitle>
            <AttachmentDescription>88 KB</AttachmentDescription>
        </AttachmentContent>
    </Attachment>
</AttachmentGroup>`,
            },
        },
    },
};

export const Trigger: Story = {
    render: function Trigger() {
        const [removed, setRemoved] = useState(false);

        if (removed) {
            return <p className="text-sm text-muted-foreground">Removed</p>;
        }

        return (
            <Attachment>
                <AttachmentMedia>
                    <FileTextIcon />
                </AttachmentMedia>
                <AttachmentContent>
                    <AttachmentTitle>report.pdf</AttachmentTitle>
                    <AttachmentDescription>2.4 MB</AttachmentDescription>
                </AttachmentContent>
                <AttachmentTrigger aria-label="Open report.pdf" />
                <AttachmentActions>
                    <AttachmentAction
                        aria-label="Remove report.pdf"
                        onClick={() => setRemoved(true)}
                    >
                        <XIcon />
                    </AttachmentAction>
                </AttachmentActions>
            </Attachment>
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [removed, setRemoved] = useState(false);

if (removed) {
    return <p className="text-sm text-muted-foreground">Removed</p>;
}

<Attachment>
    <AttachmentMedia>
        <FileTextIcon />
    </AttachmentMedia>
    <AttachmentContent>
        <AttachmentTitle>report.pdf</AttachmentTitle>
        <AttachmentDescription>2.4 MB</AttachmentDescription>
    </AttachmentContent>
    <AttachmentTrigger aria-label="Open report.pdf" />
    <AttachmentActions>
        <AttachmentAction
            aria-label="Remove report.pdf"
            onClick={() => setRemoved(true)}
        >
            <XIcon />
        </AttachmentAction>
    </AttachmentActions>
</Attachment>`,
            },
        },
    },
};
