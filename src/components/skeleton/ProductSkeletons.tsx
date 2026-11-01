import { Skeleton } from "../ui/skeleton";

const ProductSkeletons = () => {
  return (
    <div className="group relative space-y-1 hover:bg-gray-200 hover:shadow-md rounded-xl duration-200 ease-in">
      {/* Image Skeleton */}
      <Skeleton className="w-full h-[200px] sm:h-[180px] md:h-[256px] rounded-xl" />

      <div className="px-2">
        {/* Title Skeleton */}
        <Skeleton className="w-3/4 h-5 mb-2 rounded-md" />

        {/* Price Skeleton */}
        <Skeleton className="w-1/3 h-4 rounded-md" />
      </div>
    </div>
  );
};

export default ProductSkeletons;
