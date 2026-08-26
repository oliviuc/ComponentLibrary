import type { ComponentProps } from "react";

import {
    ShadcnCarousel,
    ShadcnCarouselContent,
    ShadcnCarouselItem,
    ShadcnCarouselNext,
    ShadcnCarouselPrevious,
    useShadcnCarousel,
    type ShadcnCarouselApi,
} from "@/components/shadcn/ShadcnCarousel";

export type CarouselApi = ShadcnCarouselApi;

/** A slideshow of items you can page through. */
export function Carousel(props: ComponentProps<typeof ShadcnCarousel>) {
    return <ShadcnCarousel {...props} />;
}

export function CarouselContent(
    props: ComponentProps<typeof ShadcnCarouselContent>,
) {
    return <ShadcnCarouselContent {...props} />;
}

export function CarouselItem(props: ComponentProps<typeof ShadcnCarouselItem>) {
    return <ShadcnCarouselItem {...props} />;
}

export function CarouselPrevious(
    props: ComponentProps<typeof ShadcnCarouselPrevious>,
) {
    return <ShadcnCarouselPrevious {...props} />;
}

export function CarouselNext(props: ComponentProps<typeof ShadcnCarouselNext>) {
    return <ShadcnCarouselNext {...props} />;
}

export function useCarousel() {
    return useShadcnCarousel();
}
