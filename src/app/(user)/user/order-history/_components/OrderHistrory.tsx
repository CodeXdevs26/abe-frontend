"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "react-pagination-bar";
import "react-pagination-bar/dist/index.css";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { orderData } from "@/utils/order-data";
import { checkPaymentStatus, checkStatus } from "@/utils/check-status";
import Link from "next/link";
import { useGetMyOrdersQuery } from "@/redux/apis/orderApi";
import { TOrder } from "../../profile/_components/ProfileContainer";
import { format } from "date-fns";
import { OrderHistorySkeleton } from "@/components/skeleton/ProfilePageSkeleton";

const OrderHistory = () => {
  const { data: myOrderData, isLoading: isOrderLoading } =
    useGetMyOrdersQuery("");
  const orders = myOrderData?.data?.data;

  const [currentPage, setCurrentPage] = useState(1);
  const pagePostsLimit = 8;
  const TABLE_HEADERS = [
    "Order ID",
    "Date",
    "Total",
    "Status",
    "Payment Status",
    "Action",
  ];

  return (
    <div>
      <div className="dashboard-card py-6">
        <div className="mb-5 flex items-center justify-between px-4">
          <h3 className="text-2xl font-medium">Order History</h3>
        </div>
        {isOrderLoading ? (
          <OrderHistorySkeleton />
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-scale-50">
                  {TABLE_HEADERS.map((header) => (
                    <TableHead key={header} className="text-center">
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody className="p-6 text-center font-medium">
                {orders
                  ?.slice(
                    (currentPage - 1) * pagePostsLimit,
                    currentPage * pagePostsLimit
                  )
                  ?.map((data: TOrder) => (
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
            <div className="mt-10 text-end">
              <Pagination
                currentPage={currentPage}
                itemsPerPage={pagePostsLimit}
                onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
                totalItems={orderData?.length}
                pageNeighbours={2}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
