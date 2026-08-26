import type { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card } from "@/components/ui/Card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/Carousel";
import { cn } from "@/lib/utils";

const slides = [1, 2, 3, 4, 5];

function CardsExample({
    itemClassName = "basis-1/3",
    ...args
}: ComponentProps<typeof Carousel> & { itemClassName?: string }) {
    return (
        <div className="mx-12 w-xl">
            <Carousel {...args}>
                <CarouselContent>
                    {slides.map((slide) => (
                        <CarouselItem key={slide} className={cn(itemClassName)}>
                            <Card className="flex items-center justify-center text-2xl font-medium">
                                {slide}
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}

const meta = {
    title: "Components/Carousel",
    component: Carousel,
    parameters: {
        docs: {
            description: {
                component: "A slideshow of items you can page through.",
            },
        },
    },
    argTypes: {
        orientation: {
            control: "select",
            options: ["horizontal", "vertical"],
            description: "Scroll direction",
        },
        children: { table: { disable: true } },
        opts: { table: { disable: true } },
        plugins: { table: { disable: true } },
        setApi: { table: { disable: true } },
    },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => (
        <div className="mx-12 w-56">
            <Carousel {...args}>
                <CarouselContent>
                    {slides.map((slide) => (
                        <CarouselItem key={slide}>
                            <div className="flex aspect-square items-center justify-center rounded-xl bg-muted text-2xl font-medium">
                                {slide}
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    ),
    parameters: {
        docs: {
            source: {
                code: `<div className="mx-12 w-56">
    <Carousel>
        <CarouselContent>
            {slides.map((slide) => (
                <CarouselItem key={slide}>
                    <div className="flex aspect-square items-center justify-center rounded-xl bg-muted text-2xl font-medium">
                        {slide}
                    </div>
                </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
    </Carousel>
</div>`,
            },
        },
    },
};

export const Vertical: Story = {
    args: { orientation: "vertical" },
    render: (args) => (
        <div className="my-12 w-56">
            <Carousel {...args}>
                <CarouselContent className="h-56">
                    {slides.map((slide) => (
                        <CarouselItem key={slide}>
                            <div className="flex h-52 items-center justify-center rounded-xl bg-muted text-2xl font-medium">
                                {slide}
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    ),
    parameters: {
        docs: {
            source: {
                code: `<div className="my-12 w-56">
    <Carousel orientation="vertical">
        <CarouselContent className="h-56">
            {slides.map((slide) => (
                <CarouselItem key={slide}>
                    <div className="flex h-52 items-center justify-center rounded-xl bg-muted text-2xl font-medium">
                        {slide}
                    </div>
                </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
    </Carousel>
</div>`,
            },
        },
    },
};

export const Cards: Story = {
    render: (args) => <CardsExample {...args} />,
    parameters: {
        docs: {
            description: {
                story: "Three cards show at once.",
            },
            source: {
                code: `<div className="mx-12 w-xl">
    <Carousel>
        <CarouselContent>
            {slides.map((slide) => (
                <CarouselItem key={slide} className="basis-1/3">
                    <Card className="flex items-center justify-center text-2xl font-medium">
                        {slide}
                    </Card>
                </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
    </Carousel>
</div>`,
            },
        },
    },
};

export const Centered: Story = {
    args: { opts: { align: "center", containScroll: "keepSnaps" } },
    render: (args) => <CardsExample {...args} itemClassName="basis-2/3" />,
    parameters: {
        docs: {
            description: {
                story: "Three cards, with the active one in the center.",
            },
            source: {
                code: `<div className="mx-12 w-xl">
    <Carousel opts={{ align: "center", containScroll: "keepSnaps" }}>
        <CarouselContent>
            {slides.map((slide) => (
                <CarouselItem key={slide} className="basis-2/3">
                    <Card className="flex items-center justify-center text-2xl font-medium">
                        {slide}
                    </Card>
                </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
    </Carousel>
</div>`,
            },
        },
    },
};
