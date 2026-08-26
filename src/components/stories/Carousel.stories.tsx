import type { Meta, StoryObj } from "@storybook/react-vite";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/Carousel";

const slides = [1, 2, 3, 4, 5];

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
};
