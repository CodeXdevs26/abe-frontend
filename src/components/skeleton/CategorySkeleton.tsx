"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import { Skeleton } from "../ui/skeleton";

const CategorySkeleton = () => {
  return (
    <Carousel
      opts={{
        loop: true,
        duration: 30,
        align: "start",
      }}
      plugins={[
        Autoplay({
          delay: 2000,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ]}
      className="w-full mt-8 "
    >
      <CarouselContent>
        {new Array(15).fill(0)?.map((category, index) => (
          <CarouselItem
            key={index}
            className="basis-1/4 md:basis-1/6 xl:basis-1/12 py-2"
          >
            <div
              className="flex-center flex-col cursor-pointer rounded-xl hover:shadow-2xl hover:bg-gray-200 duration-300 ease-in bg-[#e3f1ea] p-3"
              style={{
                boxShadow: "0px 3.553px 14.214px 0px rgba(0, 0, 0, 0.08)",
              }}
            >
              <Skeleton className="w-14 h-14 rounded-md mb-1" />

              {/* Skeleton for category name */}
              <Skeleton className="w-full h-4 rounded-md" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CategorySkeleton;
