import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const RestaurantCardSkeleton = () => {
  return (
    <Card className="border-light-gray animate-pulse w-full">
      <CardHeader className="px-4 py-3">
        <Skeleton className="w-full lg:h-[250px] h-[220px] rounded-md" />
      </CardHeader>
      <CardContent className="px-4 py-3 space-y-3">
        <div className="flex-between">
          <Skeleton className="w-3/5 h-6 rounded-md" />
          <div className="flex items-center gap-x-2">
            <Skeleton className="w-16 h-5 rounded-md" />
          </div>
        </div>
        <div className="flex items-center gap-x-1">
          <Skeleton className="w-3/5 h-4 rounded-md" />
        </div>
        <Skeleton className="w-full h-4 rounded-md" />
        <Skeleton className="w-4/5 h-4 rounded-md" />
      </CardContent>
      <CardFooter className="px-4 py-3">
        <Skeleton className="w-full h-10 rounded-md" />
      </CardFooter>
    </Card>
  );
};

const RestaurantListSkeleton = ({ length = 8 }) => {
  return (
    <div className="md:mt-8 mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
      {Array.from({ length }).map((_, index) => (
        <div key={index} className="flex-center">
          <RestaurantCardSkeleton />
        </div>
      ))}
    </div>
  );
};

export default RestaurantListSkeleton;
