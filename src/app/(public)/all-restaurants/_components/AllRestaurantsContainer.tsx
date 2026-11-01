"use client";
import HeroSearch from "@/components/modules/home/HeroSearch";
import RestaurantCard from "@/components/shared/RestaurantCard";
import RestaurantListSkeleton from "@/components/skeleton/RestuarantSkeleton";
import { useGetStoresQuery } from "@/redux/apis/storeApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Pagination } from "react-pagination-bar";

const AllRestaurantsContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchText = searchParams.get("search");
  const currentPage = Number(searchParams.get("page")) || 1;
  const pagePostsLimit = 16;
  const coords = searchParams.get("coords");
  console.log("coords", coords);
  const storeParams = {
    limit: pagePostsLimit,
    page: currentPage,
    searchTerm: searchText || undefined,
    coordinates: coords || undefined,
  };

  const { data, isLoading, refetch } = useGetStoresQuery(storeParams);
  const stores = data?.data?.data;

  useEffect(() => {
    refetch();
    console.log("refetch");
  }, [coords]);

  const onPageChange = (page: number) => {
    if (searchText) {
      router.push(`/all-restaurants?page=${page}&search=${searchText}`);
    } else {
      router.push(`/all-restaurants?page=${page}`);
    }
  };

  return (
    <div>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        <div className="space-y-2 xl:col-span-1">
          <h1 className="section-title">
            Top <span className="text-primary-color"> Restaurants </span>
          </h1>
          <p className="text-light-gray">
            Check your city Near by <br /> Restaurant
          </p>
        </div>
        <div className="xl:col-span-2">
          <HeroSearch className="ml-auto" />
        </div>
      </div>
      {/* _____________________ All Restaurants  _____________________ */}

      {isLoading ? (
        <RestaurantListSkeleton />
      ) : !stores || stores?.length < 1 ? (
        <div className="h-[50vh] flex items-center justify-center">
          <p className="text-lg text-gray-500">No data found!</p>
        </div>
      ) : (
        <>
          <div className="md:mt-8 mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-5 ">
            {stores?.map((restaurant: any) => (
              <div key={restaurant?._id} className="flex-center">
                <RestaurantCard data={restaurant} />
              </div>
            ))}
          </div>

          {/*pagination  */}
          <div className="mt-10 text-end  ">
            <Pagination
              currentPage={currentPage}
              itemsPerPage={pagePostsLimit}
              onPageChange={onPageChange}
              totalItems={data?.data?.meta?.total}
              pageNeighbours={2}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AllRestaurantsContainer;
