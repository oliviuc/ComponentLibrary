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
    slideCount: number;
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
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const scrollPrev = () => {
        api?.scrollPrev();
    };

    const scrollNext = () => {
        api?.scrollNext();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const prevKey = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
        const nextKey = orientation === "vertical" ? "ArrowDown" : "ArrowRight";
        if (event.key === prevKey) {
            event.preventDefault();
            scrollPrev();
        } else if (event.key === nextKey) {
            event.preventDefault();
            scrollNext();
        }
    };

    React.useEffect(() => {
        if (!api || !setApi) return;
        setApi(api);
    }, [api, setApi]);

    React.useLayoutEffect(() => {
        if (!api) return;

        // Embla mutates scroll bounds on this same api object. Read them in
        // the event, not during render, or the compiler caches the first result.
        const handleSelect = () => {
            setCanScrollPrev(api.canScrollPrev());
            setCanScrollNext(api.canScrollNext());
        };

        handleSelect();
        api.on("reInit", handleSelect);
        api.on("select", handleSelect);

        return () => {
            api.off("reInit", handleSelect);
            api.off("select", handleSelect);
        };
    }, [api]);

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
                slideCount: api?.slideNodes().length ?? 0,
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
    "aria-label": ariaLabel,
    ...props
}: React.ComponentProps<"div">) {
    const { orientation, slideCount } = useShadcnCarousel();
    const ref = React.useRef<HTMLDivElement>(null);
    const [positionLabel, setPositionLabel] = React.useState<
        string | undefined
    >(undefined);

    React.useLayoutEffect(() => {
        if (ariaLabel) {
            return;
        }
        const node = ref.current;
        const parent = node?.parentElement;
        if (!node || !parent) {
            return;
        }
        const slides = [...parent.children].filter(
            (child) =>
                child.getAttribute("data-slot") === "shadcn-carousel-item",
        );
        const index = slides.indexOf(node);
        if (index < 0) {
            return;
        }
        const next = `${index + 1} of ${slides.length}`;
        setPositionLabel((current) => (current === next ? current : next));
    }, [ariaLabel, slideCount]);

    return (
        <div
            ref={ref}
            role="group"
            aria-roledescription="slide"
            aria-label={ariaLabel ?? positionLabel}
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
