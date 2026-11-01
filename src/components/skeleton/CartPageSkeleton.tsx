
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const CartSkeleton = () => {
  return (
    <div className="mt-8 grid grid-cols-1 xl:grid-cols-3 xl:gap-x-7 gap-y-5 items-center justify-center animate-pulse">
      {/* Cart Table */}
      <div className="col-span-2 shadow-md py-5 rounded-md border">
        <div className="w-full overflow-x-auto">
          <div className="flex justify-between px-6 py-3 gap-5">
            <Skeleton className="w-1/5 h-6 rounded-md" />
            <Skeleton className="w-1/5 h-6 rounded-md" />
            <Skeleton className="w-1/5 h-6 rounded-md" />
            <Skeleton className="w-1/5 h-6 rounded-md" />
            <Skeleton className="w-1/5 h-6 rounded-md" />
          </div>

          {/* Rows */}
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="flex justify-between items-center px-6 py-4 border-b">
              <div className="flex items-center gap-3">
                <Skeleton className="w-16 h-16 rounded-md" />
                <Skeleton className="w-32 h-6 rounded-md" />
              </div>
              <Skeleton className="w-16 h-6 rounded-md" />
              <Skeleton className="w-16 h-6 rounded-md" />
              <Skeleton className="w-16 h-6 rounded-md" />
              <Skeleton className="w-8 h-8 rounded-full" />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <hr />
        <div className="flex flex-wrap gap-2 md:justify-between items-center justify-center px-4 mt-5">
          <Skeleton className="w-40 h-10 rounded-md" />
          <Skeleton className="w-32 h-10 rounded-md" />
        </div>
      </div>

      {/* Cart Summary */}
      <Card className="shadow-md hover:border hover:border-primary-color/50 duration-300">
        <CardHeader>
          <Skeleton className="w-3/5 h-6 rounded-md" />
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            <div className="flex justify-between">
              <Skeleton className="w-1/4 h-4 rounded-md" />
              <Skeleton className="w-16 h-4 rounded-md" />
            </div>
            <hr />
            <div className="flex justify-between">
              <Skeleton className="w-1/4 h-4 rounded-md" />
              <Skeleton className="w-16 h-4 rounded-md" />
            </div>
            <hr />
            <div className="flex justify-between">
              <Skeleton className="w-1/4 h-4 rounded-md" />
              <Skeleton className="w-16 h-4 rounded-md" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="w-full h-10 rounded-md" />
        </CardFooter>
      </Card>
    </div>
  );
};

// Export multiple skeletons for loading states
export const CartPageSkeleton = () => {
  return (
    <div className="w-full">
      <CartSkeleton />
    </div>
  );
};

export default CartPageSkeleton;
