import { Skeleton } from "../ui/skeleton";

const ReviewSkeleton = () => {
  return (
    <div className="mt-6">
      <div className="flex justify-between gap-x-8">
        {/* User Image Skeleton */}
        <div className="flex items-center gap-3">
          <Skeleton className="w-14 h-14 rounded-full" />

          <div>
            {/* User Name Skeleton */}
            <Skeleton className="w-32 h-5 mb-2 rounded-md" />

            {/* Rating Skeleton */}
            <Skeleton className="w-24 h-5 rounded-md" />
          </div>
        </div>

        {/* Time Skeleton */}
        <Skeleton className="w-28 h-5 rounded-md" />
      </div>

      {/* Review Text Skeleton */}
      <div className="mt-4 space-y-3">
        <Skeleton className="w-full h-3 rounded-md" />
        <Skeleton className="w-full h-3 rounded-md" />
      </div>

      {/* Conditional Divider Skeleton */}
      <hr className="mt-5" />
    </div>
  );
};

export default ReviewSkeleton;
