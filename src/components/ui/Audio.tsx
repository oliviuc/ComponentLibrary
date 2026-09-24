import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    type ComponentProps,
    type ReactNode,
    type RefObject,
} from "react";
import {
    PauseIcon,
    PlayIcon,
    SkipBackIcon,
    SkipForwardIcon,
    Volume1Icon,
    Volume2Icon,
    VolumeXIcon,
} from "lucide-react";

import { ShadcnButton } from "@/components/shadcn/ShadcnButton";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/Popover";
import { Slider } from "@/components/ui/Slider";
import { Spinner } from "@/components/ui/Spinner";

type AudioPhase = "loading" | "playing" | "paused" | "ended" | "error";

type AudioContextValue = {
    audioRef: RefObject<HTMLAudioElement | null>;
    state: AudioPhase;
    currentTime: number;
    duration: number;
    volume: number;
    muted: boolean;
    rate: number;
    toggle: () => void;
    seek: (time: number) => void;
    setVolume: (volume: number) => void;
    toggleMuted: () => void;
    setRate: (rate: number) => void;
    skip: (seconds: number) => void;
};

const AudioContext = createContext<AudioContextValue | null>(null);

/** Playback state for the surrounding Audio. */
export function useAudio() {
    const value = useContext(AudioContext);
    if (!value) {
        throw new Error("Audio parts must be used within an <Audio>");
    }
    return value;
}

function formatClock(seconds: number) {
    if (!Number.isFinite(seconds) || seconds < 0) {
        return "0:00";
    }
    const total = Math.floor(seconds);
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const secs = total % 60;
    const padded = secs.toString().padStart(2, "0");
    if (hours) {
        return `${hours}:${minutes.toString().padStart(2, "0")}:${padded}`;
    }
    return `${minutes}:${padded}`;
}

function formatSpoken(seconds: number) {
    if (!Number.isFinite(seconds) || seconds < 0) {
        return "0 seconds";
    }
    const total = Math.round(seconds);
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const secs = total % 60;
    const parts: string[] = [];
    if (hours) {
        parts.push(`${hours} ${hours === 1 ? "hour" : "hours"}`);
    }
    if (minutes) {
        parts.push(`${minutes} ${minutes === 1 ? "minute" : "minutes"}`);
    }
    if (secs || parts.length === 0) {
        parts.push(`${secs} ${secs === 1 ? "second" : "seconds"}`);
    }
    return parts.join(" ");
}

export type AudioProps = ComponentProps<"div"> & {
    src?: string;
    loop?: boolean;
    preload?: "none" | "metadata" | "auto";
    onEnded?: ComponentProps<"audio">["onEnded"];
    onPlay?: ComponentProps<"audio">["onPlay"];
    onPause?: ComponentProps<"audio">["onPause"];
    onTimeUpdate?: ComponentProps<"audio">["onTimeUpdate"];
    "aria-label": string;
};

/** A player you compose in JSX. Renders a hidden audio element. */
export function Audio({
    src,
    loop,
    preload = "metadata",
    onEnded,
    onPlay,
    onPause,
    onTimeUpdate,
    className,
    children,
    ...props
}: AudioProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [phase, setPhase] = useState<AudioPhase>("paused");
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolumeState] = useState(1);
    const [muted, setMuted] = useState(false);
    const [rate, setRateState] = useState(1);

    const toggle = () => {
        const audio = audioRef.current;
        if (!audio) {
            return;
        }
        if (audio.paused) {
            void audio.play();
        } else {
            audio.pause();
        }
    };

    const seek = (time: number) => {
        const audio = audioRef.current;
        if (!audio) {
            return;
        }
        audio.currentTime = time;
        setCurrentTime(time);
        if (phase === "ended") {
            setPhase("paused");
        }
    };

    const setVolume = (next: number) => {
        const audio = audioRef.current;
        if (!audio) {
            return;
        }
        audio.volume = next;
        if (next > 0) {
            audio.muted = false;
        }
        setVolumeState(next);
        setMuted(audio.muted);
    };

    const toggleMuted = () => {
        const audio = audioRef.current;
        if (!audio) {
            return;
        }
        audio.muted = !audio.muted;
        setMuted(audio.muted);
    };

    const setRate = (next: number) => {
        const audio = audioRef.current;
        if (!audio) {
            return;
        }
        audio.playbackRate = next;
        setRateState(next);
    };

    const skip = (seconds: number) => {
        const audio = audioRef.current;
        if (!audio) {
            return;
        }
        const limit = Number.isFinite(audio.duration) ? audio.duration : 0;
        const next = Math.min(Math.max(0, audio.currentTime + seconds), limit);
        audio.currentTime = next;
        setCurrentTime(next);
    };

    return (
        <AudioContext.Provider
            value={{
                audioRef,
                state: phase,
                currentTime,
                duration,
                volume,
                muted,
                rate,
                toggle,
                seek,
                setVolume,
                toggleMuted,
                setRate,
                skip,
            }}
        >
            <div
                data-slot="audio"
                data-state={phase}
                role="group"
                className={className}
                {...props}
            >
                <audio
                    ref={audioRef}
                    src={src}
                    loop={loop}
                    preload={preload}
                    className="hidden"
                    onPlay={(event) => {
                        setPhase("playing");
                        onPlay?.(event);
                    }}
                    onPlaying={() => setPhase("playing")}
                    onPause={(event) => {
                        const audio = event.currentTarget;
                        if (!audio.ended) {
                            setPhase("paused");
                        }
                        onPause?.(event);
                    }}
                    onEnded={(event) => {
                        setPhase("ended");
                        onEnded?.(event);
                    }}
                    onWaiting={() => setPhase("loading")}
                    onTimeUpdate={(event) => {
                        setCurrentTime(event.currentTarget.currentTime);
                        onTimeUpdate?.(event);
                    }}
                    onDurationChange={(event) => {
                        const next = event.currentTarget.duration;
                        setDuration(Number.isFinite(next) ? next : 0);
                    }}
                    onVolumeChange={(event) => {
                        setVolumeState(event.currentTarget.volume);
                        setMuted(event.currentTarget.muted);
                    }}
                    onRateChange={(event) => {
                        setRateState(event.currentTarget.playbackRate);
                    }}
                    onError={() => setPhase("error")}
                />
                {children}
            </div>
        </AudioContext.Provider>
    );
}

type IconButtonProps = Omit<ComponentProps<typeof ShadcnButton>, "children"> & {
    children?: ReactNode;
};

/** Play or pause. Shows a spinner while the audio is buffering. */
export function AudioPlayButton({
    className,
    children,
    ...props
}: IconButtonProps) {
    const { state, toggle } = useAudio();
    const playing = state === "playing" || state === "loading";

    return (
        <ShadcnButton
            type="button"
            variant="ghost"
            size="icon-sm"
            className={className}
            {...props}
            aria-label={props["aria-label"] ?? (playing ? "Pause" : "Play")}
            onClick={(event) => {
                props.onClick?.(event);
                if (!event.defaultPrevented) {
                    toggle();
                }
            }}
        >
            {children ??
                (state === "loading" ? (
                    <Spinner aria-hidden />
                ) : playing ? (
                    <PauseIcon className="fill-current" />
                ) : (
                    <PlayIcon className="fill-current" />
                ))}
        </ShadcnButton>
    );
}

/** Jump by a number of seconds. Negative values go backward. */
export function AudioSkipButton({
    seconds,
    className,
    children,
    ...props
}: IconButtonProps & { seconds: number }) {
    const { skip } = useAudio();
    const forward = seconds > 0;
    const amount = Math.abs(seconds);

    return (
        <ShadcnButton
            type="button"
            variant="ghost"
            size="icon-sm"
            className={className}
            {...props}
            aria-label={
                props["aria-label"] ??
                (forward
                    ? `Forward ${amount} seconds`
                    : `Back ${amount} seconds`)
            }
            onClick={(event) => {
                props.onClick?.(event);
                if (!event.defaultPrevented) {
                    skip(seconds);
                }
            }}
        >
            {children ?? (forward ? <SkipForwardIcon /> : <SkipBackIcon />)}
        </ShadcnButton>
    );
}

function volumeLevel(volume: number, muted: boolean) {
    if (muted || volume === 0) {
        return "muted";
    }
    return `${Math.round(volume * 100)} percent`;
}

function VolumeIcon({ volume, muted }: { volume: number; muted: boolean }) {
    if (muted || volume === 0) {
        return <VolumeXIcon />;
    }
    if (volume < 0.5) {
        return <Volume1Icon />;
    }
    return <Volume2Icon />;
}

/** Opens a volume slider. */
export function AudioVolumeButton({
    className,
    children,
    ...props
}: IconButtonProps) {
    const { volume, muted } = useAudio();
    const [open, setOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) {
            return;
        }
        // Radix restores focus to the trigger after this panel mounts. Focus the
        // slider once that settles so arrow keys change the volume.
        const timer = window.setTimeout(() => {
            panelRef.current
                ?.querySelector<HTMLInputElement>('input[type="range"]')
                ?.focus({ preventScroll: true });
        }, 0);
        return () => window.clearTimeout(timer);
    }, [open]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <ShadcnButton
                    ref={triggerRef}
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className={className}
                    {...props}
                    aria-label={
                        props["aria-label"] ??
                        `Volume, ${volumeLevel(volume, muted)}`
                    }
                >
                    {children ?? <VolumeIcon volume={volume} muted={muted} />}
                </ShadcnButton>
            </PopoverTrigger>
            <PopoverContent
                ref={panelRef}
                side="top"
                aria-label="Volume"
                aria-modal={false}
                className="w-fit px-3 py-2"
                onOpenAutoFocus={(event) => event.preventDefault()}
                onEscapeKeyDown={() => {
                    triggerRef.current?.focus();
                }}
            >
                <AudioVolume className="w-24" />
            </PopoverContent>
        </Popover>
    );
}

/** The playhead. Click or drag the bar to move through the audio. */
export function AudioSeek({
    className,
    "aria-label": ariaLabel = "Seek",
    ...props
}: Omit<
    ComponentProps<typeof Slider>,
    | "value"
    | "defaultValue"
    | "min"
    | "max"
    | "onValueChange"
    | "onValueCommitted"
    | "getAriaValueText"
>) {
    const { currentTime, duration, seek } = useAudio();
    const [dragValue, setDragValue] = useState<number | null>(null);
    const max = Number.isFinite(duration) && duration > 0 ? duration : 0;
    const shown = Math.min(dragValue ?? currentTime, max);

    return (
        <Slider
            step={0.1}
            disabled={max === 0}
            {...props}
            aria-label={ariaLabel}
            min={0}
            max={max}
            value={[shown]}
            getAriaValueText={(_formatted, next) =>
                `${formatSpoken(next)} of ${formatSpoken(duration)}`
            }
            onValueChange={([next]) => {
                setDragValue(next);
                seek(next);
            }}
            onValueCommitted={() => setDragValue(null)}
            className={cn(
                "text-foreground **:data-[slot=shadcn-slider-control]:h-6 **:data-[slot=shadcn-slider-control]:cursor-pointer **:data-[slot=shadcn-slider-control]:has-focus-visible:outline-2 **:data-[slot=shadcn-slider-control]:has-focus-visible:outline-offset-2 **:data-[slot=shadcn-slider-range]:bg-current **:data-[slot=shadcn-slider-thumb]:pointer-events-none **:data-[slot=shadcn-slider-thumb]:size-0 **:data-[slot=shadcn-slider-thumb]:border-0 **:data-[slot=shadcn-slider-thumb]:bg-transparent **:data-[slot=shadcn-slider-thumb]:shadow-none **:data-[slot=shadcn-slider-thumb]:focus-visible:ring-0 **:data-[slot=shadcn-slider-track]:h-1 **:data-[slot=shadcn-slider-track]:bg-foreground/25",
                className,
            )}
        />
    );
}

/** Loudness, from silent to full. */
export function AudioVolume({
    className,
    "aria-label": ariaLabel = "Volume",
    ...props
}: Omit<
    ComponentProps<typeof Slider>,
    | "value"
    | "defaultValue"
    | "min"
    | "max"
    | "onValueChange"
    | "getAriaValueText"
>) {
    const { volume, muted, setVolume } = useAudio();
    const shown = Math.round((muted ? 0 : volume) * 100);

    return (
        <Slider
            {...props}
            aria-label={ariaLabel}
            min={0}
            max={100}
            step={1}
            value={[shown]}
            formatValue={(next) => `${Math.round(next)}%`}
            getAriaValueText={(_formatted, next) =>
                next === 0 ? "Muted" : `${Math.round(next)} percent`
            }
            onValueChange={([next]) => setVolume(next / 100)}
            className={className}
        />
    );
}

/** Elapsed time. */
export function AudioCurrentTime({
    className,
    ...props
}: ComponentProps<"span">) {
    const { currentTime } = useAudio();

    return (
        <span className={cn("tabular-nums", className)} {...props}>
            {formatClock(currentTime)}
        </span>
    );
}

/** Elapsed time and total length, as `0:00 / 1:23`. */
export function AudioTime({ className, ...props }: ComponentProps<"span">) {
    const { currentTime, duration } = useAudio();

    return (
        <span
            className={cn(
                "shrink-0 text-sm tabular-nums whitespace-nowrap text-foreground",
                className,
            )}
            {...props}
        >
            {formatClock(currentTime)}
            <span className="text-muted-foreground"> / </span>
            {formatClock(duration)}
        </span>
    );
}

/** Total length. */
export function AudioDuration({ className, ...props }: ComponentProps<"span">) {
    const { duration } = useAudio();

    return (
        <span className={cn("tabular-nums", className)} {...props}>
            {formatClock(duration)}
        </span>
    );
}

/** A menu of playback speeds. */
export function AudioRate({
    children,
    className,
    trigger,
    ...props
}: Omit<ComponentProps<typeof ShadcnButton>, "children"> & {
    children?: ReactNode;
    trigger?: ReactNode;
}) {
    const { rate, setRate } = useAudio();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <ShadcnButton
                        type="button"
                        variant="ghost"
                        size="sm"
                        className={className}
                        aria-label={`Playback speed, ${rate}x`}
                        {...props}
                    />
                }
            >
                {trigger ?? `${rate}x`}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuRadioGroup
                    value={String(rate)}
                    onValueChange={(next) => setRate(Number(next))}
                >
                    {children}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

/** One speed inside AudioRate. */
export function AudioRateItem({
    value,
    children,
    ...props
}: Omit<ComponentProps<typeof DropdownMenuRadioItem>, "value"> & {
    value: number;
}) {
    return (
        <DropdownMenuRadioItem value={String(value)} {...props}>
            {children ?? `${value}x`}
        </DropdownMenuRadioItem>
    );
}
