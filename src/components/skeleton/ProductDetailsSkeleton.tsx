import { Skeleton } from "../ui/skeleton";
const ProductDetailsSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col lg:items-center gap-7 lg:flex-row">
        {/* Product Images Skeleton */}
        <div className="flex-1">
          <Skeleton className="w-full h-[256px] sm:h-[180px] md:h-[450px] rounded-xl" />
        </div>

        {/* Product Details Skeleton */}
        <div className="flex-1">
          {/* In Stock / Out of Stock Skeleton */}

          {/* Product Name Skeleton */}
          <h1 className="text-xl font-semibold text-primary-black lg:text-2xl xl:text-5xl">
            <Skeleton className="w-3/4 h-8 rounded-md" />
          </h1>

          {/* Rating and Review Skeleton */}
          <div className="mt-5 flex gap-2">
          <Skeleton className="w-1/3 h-6 rounded-md" />
          </div>

          {/* Price and Discount Skeleton */}
          <div className="mb-6 mt-2 flex items-center gap-x-3">
            <Skeleton className="w-1/3 h-6 rounded-md" />
          </div>

          {/* Regular Price Skeleton */}
          <div className="mb-6 mt-2 flex items-center gap-x-3">
            <Skeleton className="w-1/4 h-6 rounded-md" />
          </div>

          <hr />

          {/* Category and Description Skeleton */}
          <div className="mt-7 space-y-3">
            <Skeleton className="w-1/4 h-4 rounded-md" />
            <Skeleton className="w-3/4 h-3 mt-6 rounded-md" />
            <Skeleton className="w-3/4 h-3 mt-6 rounded-md" />
            <Skeleton className="w-3/4 h-3 mt-6 rounded-md" />
            <Skeleton className="w-3/4 h-3 mt-6 rounded-md" />
          </div>

          {/* Checkout Section Skeleton */}
          <div className="mt-7 flex items-center md:gap-x-3 gap-x-1">
           

            {/* Checkout Button Skeleton */}
            <Skeleton className="w-full h-10 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
