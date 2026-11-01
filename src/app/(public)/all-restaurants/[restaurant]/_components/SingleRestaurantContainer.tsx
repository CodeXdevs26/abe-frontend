"use client";
import React from "react";
import RestaurantDetails from "./RestaurantDetails";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import MenuCategories from "@/components/shared/MenuCategories";
import MenuCard from "@/components/shared/MenuCard";
import { Pagination } from "react-pagination-bar";
import { useGetSingleStoresQuery } from "@/redux/apis/storeApi";
import { TProduct, TRestaurant } from "@/types";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import SingleStoreSkeleton from "@/components/skeleton/SingleStoreSkeleton";
import { useGetProductsQuery } from "@/redux/apis/productApi";
import ProductSkeletons from "@/components/skeleton/ProductSkeletons";
import CategorySkeleton from "@/components/skeleton/CategorySkeleton";

const SingleRestaurantContainer = () => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const router = useRouter();
  const pagePostsLimit = 12;
  const params = useParams();
  const { data, isLoading } = useGetSingleStoresQuery(params?.restaurant);
  const restaurant = data?.data as TRestaurant;
  const productParams = {
    sort: "-ratings",
    limit: pagePostsLimit,
    store: restaurant?._id,
    page: currentPage,
  };

  const { data: productData, isLoading: isProductLoading } =
    useGetProductsQuery(productParams);

  const products = productData?.data?.data;

  const onPageChange = (page: number) => {
    router.push(
      `/all-restaurants/${restaurant._id}?page=${page}#categoryItems`
    );
    // searchParams.set("page", page.toString());
  };

  return (
    <div>
      {isLoading ? (
        <SingleStoreSkeleton />
      ) : (
        <RestaurantDetails restaurant={restaurant}></RestaurantDetails>
      )}
      {/* Restaurant details */}
      <div className="flex-between  md:mt-16 mt-8">
        <div className="space-y-2">
          <h1 className="section-title">Items🔥</h1>
        </div>
        <div
          className="bg-primary-green/10 py-1 px-3 rounded-full"
          id="categoryItems"
        >
          <Link href={`/menu-items?store=${restaurant?._id}`}>
            <p className="text-primary-green hover:text-light-gray flex-center group cursor-pointer overflow-hidden text-xl truncate">
              see all
              <ChevronRight
                size={24}
                color="#9A9CAA"
                className="group-hover:translate-x-10 overflow-hidden duration-700"
              />
            </p>
          </Link>
        </div>
      </div>
      <div className="md:space-y-8 space-y-5">
        {isLoading ? (
          <CategorySkeleton />
        ) : (
          <MenuCategories data={restaurant?.categories}></MenuCategories>
        )}
        {/* _____________________ All Restaurants  _____________________ */}
        <div>
          {isProductLoading ? (
            <div className="md:mt-14 mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 ">
              {new Array(8).fill(0)?.map((product, id) => (
                <div key={id}>
                  <ProductSkeletons />
                </div>
              ))}
            </div>
          ) : !products || products?.length < 1 ? (
            <div className="py-12 text-center">
              <p className="text-lg text-gray-600">No products found!</p>
            </div>
          ) : (
            <div>
              <div className="md:mt-14 mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-5 ">
                {products?.slice(0, 12)?.map((product: TProduct) => (
                  <div key={product?._id} className="flex-center">
                    <MenuCard data={product} />
                  </div>
                ))}
              </div>
            </div>
          )}
          {/*pagination  */}
          <div className="mt-10 text-end">
            <Pagination
              currentPage={currentPage}
              itemsPerPage={pagePostsLimit}
              onPageChange={onPageChange}
              totalItems={productData?.data?.meta?.total}
              pageNeighbours={2}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRestaurantContainer;
