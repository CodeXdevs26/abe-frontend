import { Skeleton } from "../ui/skeleton";

const SingleStoreSkeleton = () => {
  return (
    <div>
      {/* Restaurant Image Slider Skeleton */}
      <Skeleton className="w-full xl:h-[450px] lg:h-[350px] md:h-[300px] h-[200px] rounded-md" />

      {/* Restaurant Name Skeleton */}
      <h1 className="md:text-3xl text-xl font-medium my-3">
        <Skeleton className="w-3/5 h-8 rounded-md" />
      </h1>
      <div>
        <hr />
      </div>

      {/* Restaurant Details */}
      <div className="md:flex-between flex-col md:flex-row mt-6">
        <div className="flex-1 space-y-3 md:-mt-[70px] ">
          {/* Location Skeleton */}
          <div className="flex items-center gap-x-2">
            <Skeleton className="w-3/5 h-5 rounded-md md:mx-0 mx-auto" />
          </div>

          {/* Rating Skeleton */}
          <div className="flex items-center gap-x-2">
            <Skeleton className="w-3/5 h-5 rounded-md md:mx-0 mx-auto" />
          </div>
        </div>

        <div className="flex-1 md:mt-0 mt-4">
          {/* Description Skeleton */}
          <div className="space-y-4">
            <Skeleton className="w-full h-3 rounded-md" />
            <Skeleton className="w-full h-3 rounded-md" />
            <Skeleton className="w-full h-3 rounded-md" />
            <Skeleton className="w-full h-3 rounded-md" />
            <Skeleton className="w-full h-3 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleStoreSkeleton;
