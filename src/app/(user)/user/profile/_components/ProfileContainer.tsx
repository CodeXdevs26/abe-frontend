"use client";
import "../../User.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, MapPinHouse, Phone } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { checkPaymentStatus, checkStatus } from "@/utils/check-status";
import {
  useGetMeQuery,
  useGetMyBillingAddressQuery,
} from "@/redux/apis/profileApi";
import { useGetMyOrdersQuery } from "@/redux/apis/orderApi";
import { format } from "date-fns";
import {
  BillingCardSkeleton,
  OrderHistorySkeleton,
  ProfileBoxSkeleton,
} from "@/components/skeleton/ProfilePageSkeleton";

export interface TOrder {
  _id: string;
  order_id: string;
  total: number;
  status: string;
  payment_status: string;
  createdAt: string;
}

export default function ProfileContainer() {
  const { data: profileData, isLoading: isProfileLoading } = useGetMeQuery("");
  const { data: billingData, isLoading: isBillingLoading } =
    useGetMyBillingAddressQuery("");

  const { data: myOrderData, isLoading: isOrderLoading } =
    useGetMyOrdersQuery("");

  const profile = profileData?.data;
  const billing = billingData?.data;
  const orders = myOrderData?.data?.data;

  const billingAddress = `${billing?.house_no || ""}, ${
    billing?.street_address || ""
  }, ${billing?.city || ""}, ${billing?.state || ""} ${
    billing?.zip_code || ""
  }, ${billing?.country || ""}`;

  const TABLE_HEADERS = [
    "Order ID",
    "Date",
    "Total",
    "Status",
    "Payment Status",
    "Action",
  ];

  return (
    <div className="space-y-8 text-primary-black">
      {/* Profile Details */}

      <div className="flex flex-col items-stretch gap-x-8 gap-y-8 lg:flex-row">
        {isProfileLoading ? (
          <ProfileBoxSkeleton />
        ) : !profile ? (
          <div className="dashboard-card flex flex-col items-center justify-center space-y-4 py-8 text-center lg:w-[60%]">
            <h3>No data found!</h3>
          </div>
        ) : (
          <div className="dashboard-card flex flex-col items-center justify-center space-y-4 py-8 text-center lg:w-[60%]">
            <Avatar className="size-36">
              <AvatarImage src={profile?.image} />
              <AvatarFallback className="text-3xl uppercase">
                {profile?.name?.split(" ").length > 1 ? (
                  <p>
                    {profile?.name?.split(" ")[0].slice(0, 1)}
                    {profile?.name?.split(" ")[1].slice(0, 1)}
                  </p>
                ) : (
                  profile?.name?.split(" ")[0].slice(0, 2)
                )}
              </AvatarFallback>
            </Avatar>

            <div>
              <h5 className="text-2xl font-bold text-primary-black">
                {profile?.name}
              </h5>
              <p className="mb-3 mt-1 text-base text-muted-foreground">
                {profile?.role === "admin" ? "Admin" : "Customer"}
              </p>

              <Link
                href="/user/account-settings#profile"
                className="dashboard-primary-link"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        )}

        {isBillingLoading ? (
          <BillingCardSkeleton />
        ) : (
          <div className="dashboard-card px-8 py-6 lg:w-[40%]">
            <p className="font-medium uppercase text-muted-foreground">
              Billing Address
            </p>

            <h4 className="my-4 text-xl font-semibold">
              {billing?.name || "N/A"}
            </h4>

            <div className="space-y-3 text-lg">
              <p className="flex items-center gap-x-3 font-medium text-primary-black/75">
                <Mail size={22} />
                {billing?.email || "N/A"}
              </p>
              <p className="flex items-center gap-x-3 font-medium text-primary-black/75">
                <MapPinHouse size={22} /> {billingAddress || "N/A"}
              </p>
              <p className="flex items-center gap-x-3 font-medium text-primary-black/75">
                <Phone size={22} /> {billing?.phone || "N/A"}
              </p>
            </div>

            <Link href={"/user/account-settings#address"}>
              <button className="dashboard-primary-link mt-7">
                Edit Address
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Recent Order History */}

      {isOrderLoading ? (
        <div className="dashboard-card py-6">
          <div className="mb-5 flex items-center justify-between px-4">
            <h3 className="text-2xl font-medium">Recent Order History</h3>
            <Link
              href="/user/order-history"
              type="button"
              className="dashboard-primary-link"
            >
              View All
            </Link>
          </div>

          <OrderHistorySkeleton />
        </div>
      ) : (
        <div className="dashboard-card py-6">
          <div className="mb-5 flex items-center justify-between px-4">
            <h3 className="text-2xl font-medium">Recent Order History</h3>
            <Link
              href="/user/order-history"
              type="button"
              className="dashboard-primary-link"
            >
              View All
            </Link>
          </div>

          <Table>
            <TableCaption>A list of {profile?.name} recent orders</TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-scale-50">
                {TABLE_HEADERS?.map((header) => (
                  <TableHead key={header} className="text-center">
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="p-6 text-center font-medium">
              {orders?.slice(0, 6)?.map((data: TOrder) => (
                <TableRow key={data._id}>
                  <TableCell>{data.order_id}</TableCell>
                  <TableCell>
                    {" "}
                    {format(data.createdAt, "d MMM, yyyy")}
                  </TableCell>
                  <TableCell>${data.total?.toFixed(2)}</TableCell>
                  <TableCell
                    className={cn(
                      data.status === "pending" && "text-[#5B4373]",
                      data.status === "cancelled" && "text-red-600",
                      data.status === "onTheWay" && "text-[#2E3559]",
                      data.status === "processing" && "text-yellow-700",
                      data.status === "delivered" && "text-green-600"
                    )}
                  >
                    {checkStatus(data.status)}
                  </TableCell>
                  <TableCell
                    className={cn(
                      data.payment_status === "paid" && "text-green-600",
                      data.payment_status === "pending" && "text-red-600",
                      data.payment_status === "cashOnDelivery" &&
                        "text-yellow-700"
                    )}
                  >
                    {checkPaymentStatus(data.payment_status)}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/user/order-history/${data._id}`}
                      className="dashboard-primary-link"
                      style={{ fontSize: "1rem" }}
                    >
                      View Details
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
