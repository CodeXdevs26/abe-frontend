"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const MenuCategories = ({ data }: { data: any[] }) => {
  const searchParams = useSearchParams();
  const params = useParams();
  const store = searchParams?.get("store") || params?.restaurant;

  console.log("store", searchParams?.get("store"), params?.restaurant);
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (store) {
      setUrl(`/menu-items?store=${store}&category=`);
    } else {
      setUrl(`/menu-items?category=`);
    }
  }, [searchParams]);
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
        {data?.map((category) => (
          <CarouselItem
            key={category._id}
            className="basis-1/4 md:basis-1/6 xl:basis-1/12 py-2"
          >
            <Link href={`${url}${category?._id}`}>
              <div
                className="flex-center flex-col cursor-pointer rounded-xl hover:shadow-2xl hover:bg-gray-200 duration-300 ease-in bg-[#e3f1ea] space-y-1 p-4"
                style={{
                  boxShadow: "0px 3.553px 14.214px 0px rgba(0, 0, 0, 0.08)",
                }}
              >
                <Image
                  src={category.icon}
                  alt="menu_category"
                  width={1200}
                  height={1200}
                  className="w-11"
                ></Image>
                <p>{category.name}</p>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default MenuCategories;
