import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export const ProfileBoxSkeleton = () => {
  return (
    <Card className="dashboard-card flex flex-col items-center justify-center space-y-4 py-8 text-center lg:w-[60%]">
      {/* Avatar Skeleton */}
      <Skeleton className="size-36 rounded-full" />

      <div className="text-center">
        {/* Name Skeleton */}
        <Skeleton className="w-[230px] h-6 mb-2 rounded-md mx-auto" />

        {/* Role Skeleton */}
        <Skeleton className="w-32 h-4 mb-3 rounded-md mx-auto" />

        {/* Edit Profile Link Skeleton */}
        <Skeleton className="w-32 h-4 rounded-md mx-auto" />
      </div>
    </Card>
  );
};

export const BillingCardSkeleton = () => {
  return (
    <Card className="dashboard-card px-8 py-6 lg:w-[40%]">
      {/* Billing Address Title Skeleton */}
      <Skeleton className="w-1/3 h-4 mb-4 rounded-md" />

      {/* Name Skeleton */}
      <Skeleton className="w-3/4 h-6 mb-4 rounded-md" />

      {/* Contact Details Skeleton */}
      <div className="space-y-4 text-lg">
        <p className="flex items-center gap-x-3 font-medium text-primary-black/75">
          <Skeleton className="w-2/3 h-5 rounded-md" />
        </p>
        <p className="flex items-center gap-x-3 font-medium text-primary-black/75">
          <Skeleton className="w-2/3 h-5 rounded-md" />
        </p>
        <p className="flex items-center gap-x-3 font-medium text-primary-black/75">
          <Skeleton className="w-2/3 h-5 rounded-md" />
        </p>
      </div>

      {/* Edit Address Button Skeleton */}
      <Skeleton className="w-32 h-5 mt-7 rounded-md" />
    </Card>
  );
};

export const OrderHistorySkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-scale-50">
          {Array.from({ length: 6 }).map((_, index) => (
            <TableHead key={index} className="text-center">
              <Skeleton className="w-24 h-5 mx-auto rounded-md" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="text-center font-medium">
        {Array.from({ length: 6 }).map((_, index) => (
          <TableRow key={index}>
            {Array.from({ length: 6 }).map((_, cellIndex) => (
              <TableCell key={cellIndex} className="text-center py-4">
                <Skeleton className="w-24 h-4 mx-auto rounded-md" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
