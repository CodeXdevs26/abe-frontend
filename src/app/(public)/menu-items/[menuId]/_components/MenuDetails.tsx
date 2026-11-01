"use client";
import { useState } from "react";
import { Rating } from "@/components/ui/rating";
import { Button } from "@/components/ui/button";
import { Loader, ShoppingBag, ShoppingCart } from "lucide-react";
import { EmblaOptionsType } from "embla-carousel";
import { discountPrice } from "@/utils/discountPrice";
import MenuDetailsCarousel from "./Carousel/MenuDetailsCarousel";
import { toast } from "sonner";
import Link from "next/link";
import { TProduct } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { useGetSingleProductQuery } from "@/redux/apis/productApi";
import ProductDetailsSkeleton from "@/components/skeleton/ProductDetailsSkeleton";
import handleMutation from "@/utils/handleMutation";
import { useAddToCartMutation } from "@/redux/apis/cartApi";

const MenuDetails = ({ reviewLength }: { reviewLength: number }) => {
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const { data, isLoading } = useGetSingleProductQuery(params.menuId);
  const productData = data?.data as TProduct;
  console.log('productData, ', productData);
  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();
  const router = useRouter();

  const handleIncrementQuantity = () => {
    if (quantity >= Number(productData?.quantity)) {
      toast.error("Out of stock");
      return;
    }
    setQuantity(quantity + 1);
  };

  const handleDecrementQuantity = () => {
    setQuantity(quantity - 1);
  };

  const OPTIONS: EmblaOptionsType = {};

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  const slides = productData?.images?.map((item) => {
    return {
      url: item,
      key: item,
      _id: item,
    };
  });

  const onSuccess = () => {
    setTimeout(() => {
      router.push("/cart");
    }, 400);
  };

  const handleAddToCart = async () => {
    const cartData = {
      product: productData?._id,
      quantity,
    };
    handleMutation(cartData, addToCart, "Adding to cart...", onSuccess);
  };

  const onBuySuccess = () => {
    router.push(`/checkout`);
  };

  const handleBuyNow = () => {
    const cartData = {
      product: productData?._id,
      quantity,
    };
    handleMutation(cartData, addToCart, "Adding to cart...", onBuySuccess);
  };

  return productData ? (
    <div className="flex flex-col lg:items-center gap-7 lg:flex-row">
      {/* products images */}
      <div className="flex-1">
        <MenuDetailsCarousel slides={slides} options={OPTIONS} />
      </div>

      {/* product details */}
      <div className="flex-1">
        {productData?.quantity >= 0 ? (
          <p className="w-fit rounded bg-primary-pink px-2 py-1 text-primary-red mb-3">
            In Stock
          </p>
        ) : (
          <p className="w-fit truncate rounded bg-black px-2 py-1 text-primary-white mb-3">
            Out of Stock
          </p>
        )}
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-primary-black lg:text-2xl xl:text-5xl">
            {productData?.name}
          </h1>
        </div>
        {/* rating and review */}
        <Link href={"#reviews"} className="mt-5 flex gap-2">
          <Rating
            rating={Number(productData?.ratings)}
            className="w-28"
          ></Rating>
          <p className="text-primary-slate">
            <span>{reviewLength}</span> Reviews
          </p>
        </Link>
        {/* price and discount*/}
        {productData?.discount > 0 && (
          <div className="mb-6 mt-2 flex items-center gap-x-3">
            <p className="text-xl text-primary-color">
              <span className="mr-1 font-medium">
                ${discountPrice(productData?.price, productData?.discount)}
              </span>
              <s className="text-primary-slate text-base">
                ${productData?.price}
              </s>
            </p>

            <p className="rou rounded-full bg-primary-pink px-2 py-1 text-primary-red">
              {productData?.discount}% Off
            </p>
          </div>
        )}

        {productData?.discount == 0 && (
          <div className="mb-6 mt-2 flex items-center gap-x-3">
            <span className="ml-2 text-xl font-medium text-primary-color">
              ${productData?.price}
            </span>
          </div>
        )}
        <hr />
        {/* category and description */}
        <div className="mt-7">
          <p className="font-medium text-primary-black">
            Category:{" "}
            <span className="font-normal text-primary-slate">
              {productData?.category?.name}
            </span>
          </p>
          <p className="mt-6 max-w-3xl text-primary-slate">
            {productData?.description}
          </p>

          {/* checkout */}
          <div className="mt-7 flex  items-center md:gap-x-3 gap-x-1 ">
            {/* quantity */}
            <div className="flex items-center gap-x-3 rounded-full border-2">
              <Button
                onClick={handleDecrementQuantity}
                className={`flex md:size-10 size-8 items-center justify-center rounded-full bg-light-gray/40 text-xl text-black shadow-lg duration-500 hover:bg-primary-black/80 hover:text-primary-white`}
                disabled={quantity === 0}
              >
                -
              </Button>
              <p>{quantity}</p>
              <Button
                onClick={handleIncrementQuantity}
                className={`flex md:size-10 size-8 items-center justify-center rounded-full bg-light-gray/40 text-lg text-black shadow-lg duration-500 hover:bg-primary-black/80 hover:text-primary-white`}
              >
                +
              </Button>
            </div>

            {/* checkout btn */}
            <Button
              disabled={productData?.quantity == 0}
              onClick={handleBuyNow}
              className={`w-full rounded-full bg-primary-color ${
                productData?.quantity == 0 ? "cursor-not-allowed" : ""
              }`}
            >
              Buy Now <ShoppingBag className="ml-2" size={20} />
            </Button>

            <div
              onClick={handleAddToCart}
              className=" bg-primary-slate/80 hover:bg-primary-black/80 rounded-full md:p-3 p-2 cursor-pointer group duration-300 ease-in z-10 shadow-xl"
            >
              {isAddingToCart ? (
                <Loader
                  className="text-white group-hover:scale-110 duration-1000 animate-spin"
                  size={20}
                />
              ) : (
                <ShoppingCart
                  className={`text-white group-hover:scale-110 duration-300 ease-in ${
                    productData?.quantity == 0 &&
                    "opacity-40 cursor-not-allowed"
                  }`}
                  size={20}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="text-lg text-gray-600 text-center py-14">
      <p>Product data not found!</p>
    </div>
  );
};

export default MenuDetails;
