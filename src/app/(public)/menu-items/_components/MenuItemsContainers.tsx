"use client";
import MenuCard from "@/components/shared/MenuCard";
import MenuCategories from "@/components/shared/MenuCategories";
import CategorySkeleton from "@/components/skeleton/CategorySkeleton";
import ProductSkeletons from "@/components/skeleton/ProductSkeletons";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "@/redux/apis/productApi";
import { useGetSingleStoresQuery } from "@/redux/apis/storeApi";
import { TProduct } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "react-pagination-bar";

const MenuItemsContainers = () => {
  const router = useRouter();
  const pagePostsLimit = 16;
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category");
  const store = searchParams.get("store");
  const productParams = {
    limit: pagePostsLimit,
    page: currentPage,
    category: category || undefined,
    store: store || undefined,
  };

  const { data, isLoading } = useGetProductsQuery(productParams);
  const { data: storeData, isLoading: isStoreCategoryLoading } =
    useGetSingleStoresQuery(store);

  const { data: categoryData, isLoading: isCategoryLoading } =
    useGetCategoriesQuery("");

  const categories = categoryData?.data;

  const products = data?.data?.data;

  const onPageChange = (page: number) => {
    if (category && store) {
      router.push(
        `/menu-items?page=${page}&category=${category}&store=${store}`
      );
    } else if (store) {
      router.push(`/menu-items?page=${page}&store=${store}`);
    } else if (category) {
      router.push(`/menu-items?page=${page}&category=${category}`);
    } else {
      router.push(`/menu-items?page=${page}`);
    }
  };

  return (
    <div>
      {isCategoryLoading || isStoreCategoryLoading ? (
        <CategorySkeleton />
      ) : (
        <MenuCategories
          data={storeData?.data?.categories || categories}
        ></MenuCategories>
      )}

      {/* _____________________ All Restaurants  _____________________ */}

      {isLoading ? (
        <div className="md:mt-14 mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 ">
          {new Array(16).fill(0)?.map((product, id) => (
            <div key={id}>
              <ProductSkeletons />
            </div>
          ))}
        </div>
      ) : !products || products?.length < 1 ? (
        <div className="text-center py-20 text-lg text-gray-500">
          No product found!
        </div>
      ) : (
        <div className="md:mt-14 mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 ">
          {products?.map((product: TProduct) => (
            <div key={product?._id} className="flex-center items-start">
              <MenuCard data={product} />
            </div>
          ))}
        </div>
      )}

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
    </div>
  );
};

export default MenuItemsContainers;
