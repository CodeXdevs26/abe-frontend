"use client";
import ProductSkeletons from "@/components/skeleton/ProductSkeletons";
import { useGetProductsQuery } from "@/redux/apis/productApi";
import { TProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";

const PopularProduct = () => {
  const params = { sort: "-ratings", limit: 12 };
  const { data, isLoading } = useGetProductsQuery(params);
  const products = data?.data?.data;

  return (
    <div className="">
      <h1 className="md:text-4xl text-2xl text-primary-black font-bold">
        Products
      </h1>
      <div>
        {isLoading ? (
          <div className="mt-7 grid grid-cols-2 gap-x-2 gap-y-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {new Array(8).fill(0)?.map((product, id) => (
              <div key={id}>
                <ProductSkeletons />
              </div>
            ))}
          </div>
        ) : !products || products.length === 0 ? (
          <div>
            <p className="text-lg text-gray-500 py-16">No data found!</p>
          </div>
        ) : (
          <div className="mt-7 grid grid-cols-2 gap-x-2 gap-y-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {products?.map((product: TProduct) => (
              <Link href={`/menu-items/${product?._id}`} key={product?._id}>
                <div className="group relative space-y-1 hover:bg-gray-200 hover:shadow-md rounded-xl duration-200 ease-in p-4 space-y-3">
                  <Image
                    src={product?.images[0]}
                    alt="product_image"
                    width={1950}
                    height={1000}
                    className="w-auto h-[200px] mx-auto rounded-xl"
                  ></Image>

                  <div className="px-2">
                    <h1 className="font-medium text-primary-black  ">
                      {product?.name}
                    </h1>
                    <p className="font-medium   text-light-gray ">
                      ${product?.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularProduct;
