import type { Meta, StoryObj } from "@storybook/react-vite";
import { MoreHorizontalIcon } from "lucide-react";

import {
    Attachment,
    AttachmentContent,
    AttachmentDescription,
    AttachmentMedia,
    AttachmentTitle,
} from "@/components/ui/Attachment";
import {
    Audio,
    AudioCurrentTime,
    AudioDuration,
    AudioVolumeButton,
    AudioPlayButton,
    AudioRate,
    AudioRateItem,
    AudioSeek,
    AudioSkipButton,
    AudioTime,
} from "@/components/ui/Audio";

const meta = {
    title: "Components/Audio",
    component: Audio,
    parameters: {
        docs: {
            description: {
                component:
                    "A player you compose in JSX. For spoken audio, also provide a transcript.",
            },
        },
    },
    argTypes: {
        children: { table: { disable: true } },
    },
} satisfies Meta<typeof Audio>;

export default meta;
type Story = StoryObj<typeof meta>;

const sample = "/audio/sample.wav";

export const Default: Story = {
    args: { "aria-label": "Sample track", src: sample },
    render: () => (
        <Audio
            src={sample}
            aria-label="Sample track"
            className="flex w-[min(28rem,calc(100vw-3rem))] items-center gap-1.5 rounded-full bg-muted py-1 pr-1 pl-2"
        >
            <AudioPlayButton className="rounded-full" />
            <AudioTime />
            <AudioSeek className="mx-1 flex-1" />
            <AudioVolumeButton className="rounded-full" />
            <AudioRate
                trigger={<MoreHorizontalIcon />}
                size="icon-sm"
                className="rounded-full"
            >
                <AudioRateItem value={0.75} />
                <AudioRateItem value={1} />
                <AudioRateItem value={1.5} />
                <AudioRateItem value={2} />
            </AudioRate>
        </Audio>
    ),
    parameters: {
        docs: {
            source: {
                code: `<Audio
    src="/audio/sample.wav"
    aria-label="Sample track"
    className="flex w-[min(28rem,calc(100vw-3rem))] items-center gap-1.5 rounded-full bg-muted py-1 pr-1 pl-2"
>
    <AudioPlayButton className="rounded-full" />
    <AudioTime />
    <AudioSeek className="mx-1 flex-1" />
    <AudioVolumeButton className="rounded-full" />
    <AudioRate
        trigger={<MoreHorizontalIcon />}
        size="icon-sm"
        className="rounded-full"
    >
        <AudioRateItem value={0.75} />
        <AudioRateItem value={1} />
        <AudioRateItem value={1.5} />
        <AudioRateItem value={2} />
    </AudioRate>
</Audio>`,
            },
        },
    },
};

export const Minimal: Story = {
    args: { "aria-label": "Sample track", src: sample },
    render: () => (
        <Audio
            src={sample}
            aria-label="Sample track"
            className="flex w-72 items-center gap-2"
        >
            <AudioPlayButton />
            <AudioSeek className="flex-1" />
            <AudioCurrentTime className="text-xs text-muted-foreground" />
        </Audio>
    ),
    parameters: {
        docs: {
            source: {
                code: `<Audio
    src="/audio/sample.wav"
    aria-label="Sample track"
    className="flex w-72 items-center gap-2"
>
    <AudioPlayButton />
    <AudioSeek className="flex-1" />
    <AudioCurrentTime className="text-xs text-muted-foreground" />
</Audio>`,
            },
        },
    },
};

export const Podcast: Story = {
    args: { "aria-label": "Episode 12, the design of buttons", src: sample },
    render: () => (
        <Audio
            src={sample}
            aria-label="Episode 12, the design of buttons"
            className="grid w-80 gap-3 rounded-lg border border-border p-4"
        >
            <div>
                <p className="text-sm font-medium">The design of buttons</p>
                <p className="text-xs text-muted-foreground">Episode 12</p>
            </div>
            <AudioSeek />
            <div className="flex items-center justify-between">
                <AudioCurrentTime className="text-xs text-muted-foreground" />
                <div className="flex items-center">
                    <AudioSkipButton seconds={-15} />
                    <AudioPlayButton />
                    <AudioSkipButton seconds={15} />
                </div>
                <AudioRate>
                    <AudioRateItem value={1} />
                    <AudioRateItem value={1.5} />
                    <AudioRateItem value={2} />
                </AudioRate>
            </div>
        </Audio>
    ),
    parameters: {
        docs: {
            source: {
                code: `<Audio
    src="/audio/sample.wav"
    aria-label="Episode 12, the design of buttons"
    className="grid w-80 gap-3 rounded-lg border border-border p-4"
>
    <div>
        <p className="text-sm font-medium">The design of buttons</p>
        <p className="text-xs text-muted-foreground">Episode 12</p>
    </div>
    <AudioSeek />
    <div className="flex items-center justify-between">
        <AudioCurrentTime className="text-xs text-muted-foreground" />
        <div className="flex items-center">
            <AudioSkipButton seconds={-15} />
            <AudioPlayButton />
            <AudioSkipButton seconds={15} />
        </div>
        <AudioRate>
            <AudioRateItem value={1} />
            <AudioRateItem value={1.5} />
            <AudioRateItem value={2} />
        </AudioRate>
    </div>
</Audio>`,
            },
        },
    },
};

export const CustomColors: Story = {
    args: { "aria-label": "Sample track", src: sample },
    render: () => (
        <Audio
            src={sample}
            aria-label="Sample track"
            className="flex w-72 items-center gap-2"
        >
            <AudioPlayButton className="text-chart-2" />
            <AudioSeek className="flex-1 text-chart-2" />
            <AudioCurrentTime className="text-xs text-muted-foreground" />
        </Audio>
    ),
    parameters: {
        docs: {
            description: {
                story: "Point the seek bar at the text color with classes.",
            },
            source: {
                code: `<Audio
    src="/audio/sample.wav"
    aria-label="Sample track"
    className="flex w-72 items-center gap-2"
>
    <AudioPlayButton className="text-chart-2" />
    <AudioSeek className="flex-1 text-chart-2" />
    <AudioCurrentTime className="text-xs text-muted-foreground" />
</Audio>`,
            },
        },
    },
};

export const VoiceNote: Story = {
    args: { "aria-label": "Voice note from Alex", src: sample },
    render: () => (
        <Audio src={sample} aria-label="Voice note from Alex">
            <Attachment className="w-72">
                <AttachmentMedia>
                    <AudioPlayButton />
                </AttachmentMedia>
                <AttachmentContent>
                    <AttachmentTitle>Voice note</AttachmentTitle>
                    <AttachmentDescription>Alex</AttachmentDescription>
                    <AudioSeek className="mt-2" />
                    <AudioDuration className="mt-1 text-xs text-muted-foreground" />
                </AttachmentContent>
            </Attachment>
        </Audio>
    ),
    parameters: {
        docs: {
            source: {
                code: `<Audio src="/audio/sample.wav" aria-label="Voice note from Alex">
    <Attachment className="w-72">
        <AttachmentMedia>
            <AudioPlayButton />
        </AttachmentMedia>
        <AttachmentContent>
            <AttachmentTitle>Voice note</AttachmentTitle>
            <AttachmentDescription>Alex</AttachmentDescription>
            <AudioSeek className="mt-2" />
            <AudioDuration className="mt-1 text-xs text-muted-foreground" />
        </AttachmentContent>
    </Attachment>
</Audio>`,
            },
        },
    },
};
