import * as React from "react";
import useEmblaCarousel, {
    type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { ShadcnButton } from "@/components/shadcn/ShadcnButton";

type ShadcnCarouselApi = UseEmblaCarouselType[1];
type UseShadcnCarouselParameters = Parameters<typeof useEmblaCarousel>;
type ShadcnCarouselOptions = UseShadcnCarouselParameters[0];
type ShadcnCarouselPlugin = UseShadcnCarouselParameters[1];

type ShadcnCarouselProps = {
    opts?: ShadcnCarouselOptions;
    plugins?: ShadcnCarouselPlugin;
    orientation?: "horizontal" | "vertical";
    setApi?: (api: ShadcnCarouselApi) => void;
};

type ShadcnCarouselContextProps = {
    carouselRef: ReturnType<typeof useEmblaCarousel>[0];
    api: ReturnType<typeof useEmblaCarousel>[1];
    scrollPrev: () => void;
    scrollNext: () => void;
    canScrollPrev: boolean;
    canScrollNext: boolean;
} & ShadcnCarouselProps;

const ShadcnCarouselContext =
    React.createContext<ShadcnCarouselContextProps | null>(null);

function useShadcnCarousel() {
    const context = React.useContext(ShadcnCarouselContext);

    if (!context) {
        throw new Error(
            "useShadcnCarousel must be used within a <ShadcnCarousel />",
        );
    }

    return context;
}

function ShadcnCarousel({
    orientation = "horizontal",
    opts,
    setApi,
    plugins,
    className,
    children,
    ...props
}: React.ComponentProps<"div"> & ShadcnCarouselProps) {
    const [carouselRef, api] = useEmblaCarousel(
        {
            ...opts,
            axis: orientation === "horizontal" ? "x" : "y",
        },
        plugins,
    );
    const [, onSelect] = React.useReducer((count: number) => count + 1, 0);

    const scrollPrev = React.useCallback(() => {
        api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
        api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.key === "ArrowLeft") {
                event.preventDefault();
                scrollPrev();
            } else if (event.key === "ArrowRight") {
                event.preventDefault();
                scrollNext();
            }
        },
        [scrollPrev, scrollNext],
    );

    React.useEffect(() => {
        if (!api || !setApi) return;
        setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
        if (!api) return;

        const handleSelect = () => {
            onSelect();
        };

        api.on("reInit", handleSelect);
        api.on("select", handleSelect);

        return () => {
            api.off("reInit", handleSelect);
            api.off("select", handleSelect);
        };
    }, [api, onSelect]);

    const canScrollPrev = api?.canScrollPrev() ?? false;
    const canScrollNext = api?.canScrollNext() ?? false;

    return (
        <ShadcnCarouselContext.Provider
            value={{
                carouselRef,
                api: api,
                opts,
                orientation:
                    orientation ||
                    (opts?.axis === "y" ? "vertical" : "horizontal"),
                scrollPrev,
                scrollNext,
                canScrollPrev,
                canScrollNext,
            }}
        >
            <div
                onKeyDownCapture={handleKeyDown}
                className={cn("relative", className)}
                role="region"
                aria-roledescription="carousel"
                data-slot="shadcn-carousel"
                {...props}
            >
                {children}
            </div>
        </ShadcnCarouselContext.Provider>
    );
}

function ShadcnCarouselContent({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const { carouselRef, orientation } = useShadcnCarousel();

    return (
        <div
            ref={carouselRef}
            className="overflow-hidden"
            data-slot="shadcn-carousel-content"
        >
            <div
                className={cn(
                    "flex",
                    orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
                    className,
                )}
                {...props}
            />
        </div>
    );
}

function ShadcnCarouselItem({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const { orientation } = useShadcnCarousel();

    return (
        <div
            role="group"
            aria-roledescription="slide"
            data-slot="shadcn-carousel-item"
            className={cn(
                "min-w-0 shrink-0 grow-0 basis-full",
                orientation === "horizontal" ? "pl-4" : "pt-4",
                className,
            )}
            {...props}
        />
    );
}

function ShadcnCarouselPrevious({
    className,
    variant = "outline",
    size = "icon-sm",
    ...props
}: React.ComponentProps<typeof ShadcnButton>) {
    const { orientation, scrollPrev, canScrollPrev } = useShadcnCarousel();

    return (
        <ShadcnButton
            data-slot="shadcn-carousel-previous"
            variant={variant}
            size={size}
            className={cn(
                "absolute touch-manipulation rounded-full",
                orientation === "horizontal"
                    ? "inset-y-0 -left-12 my-auto"
                    : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
                className,
            )}
            disabled={!canScrollPrev}
            onClick={scrollPrev}
            {...props}
        >
            <ChevronLeftIcon />
            <span className="sr-only">Previous slide</span>
        </ShadcnButton>
    );
}

function ShadcnCarouselNext({
    className,
    variant = "outline",
    size = "icon-sm",
    ...props
}: React.ComponentProps<typeof ShadcnButton>) {
    const { orientation, scrollNext, canScrollNext } = useShadcnCarousel();

    return (
        <ShadcnButton
            data-slot="shadcn-carousel-next"
            variant={variant}
            size={size}
            className={cn(
                "absolute touch-manipulation rounded-full",
                orientation === "horizontal"
                    ? "inset-y-0 -right-12 my-auto"
                    : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
                className,
            )}
            disabled={!canScrollNext}
            onClick={scrollNext}
            {...props}
        >
            <ChevronRightIcon />
            <span className="sr-only">Next slide</span>
        </ShadcnButton>
    );
}

export {
    type ShadcnCarouselApi,
    ShadcnCarousel,
    ShadcnCarouselContent,
    ShadcnCarouselItem,
    ShadcnCarouselPrevious,
    ShadcnCarouselNext,
    useShadcnCarousel,
};
