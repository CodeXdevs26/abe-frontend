"use client";
import Spinner from "@/components/animation/spinner";
import { ProgressBar } from "@/components/ui/steps-progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetSingleOrderQuery } from "@/redux/apis/orderApi";
import { TSingleOrder } from "@/types";
import { checkPaymentStatus } from "@/utils/check-status";
import { format } from "date-fns";
import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

// check order status
const checkStatus = (status: string) => {
  if (status === "received") {
    return 0;
  } else if (status === "processing") {
    return 1;
  } else if (status === "ongoing") {
    return 2;
  } else if (status === "delivered") {
    return 3;
  } else {
    return 1;
  }
};

const SingleOrderDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleOrderQuery(id as string);
  const order = data?.data as TSingleOrder;
  console.log("data, ", order);

  const billing = order?.billing_address;
  const shipping = order?.shipping_address;
  const billingAddress = `${billing?.house_no || ""}, ${
    billing?.street_address || ""
  }, ${billing?.city || ""}, ${billing?.state || ""} ${
    billing?.zip_code || ""
  }, ${billing?.country || ""}`;

  return (
    <>
      {isLoading ? (
        <div className="h-[500px]">
          <Spinner />
        </div>
      ) : !order ? (
        <div className="h-[500px] p-6 flex items-center justify-center">
          No data found!
        </div>
      ) : (
        <div className="dashboard-card py-6">
          <div className="mb-5 flex flex-col items-center justify-between gap-2 px-4 md:flex-row">
            <div className="flex items-center justify-center gap-x-1">
              <h3 className="text-2xl font-medium">Order Details</h3>
              <Dot className="hidden md:block" />
              <p className="">
                {format(new Date(order?.createdAt), "MMMM d, yyyy")}
              </p>
              <Dot className="hidden md:block" />
              <p>{order?.items?.length} products</p>
            </div>
            <div>
              <Link href="/user/order-history">
                <p className="font-medium text-primary-color underline">
                  Back to List
                </p>
              </Link>
            </div>
          </div>
          <hr />
          <div className="flex flex-col justify-between gap-7 px-7 py-6 lg:flex-row">
            {/* order Address */}
            <div className="flex flex-1 flex-col rounded border md:flex-row">
              {/* billing address */}
              <div className="flex-1 border-r">
                <h1 className="border-b px-7 py-5 text-primary-slate">
                  Billing Address
                </h1>
                <div className="px-7 py-5">
                  <h2>{billing?.name || "N/A"}</h2>
                  {/* if have user profile address then show else show order address */}
                  <p className="text-primary-slate">
                    {billingAddress || "N/A"}
                  </p>
                  <p className="mt-10 text-primary-slate">Email</p>
                  <p>{billing?.email || "N/A"}</p>
                  <p className="mt-3 text-primary-slate">Phone</p>
                  <p>
                    {/* if have user profile phone number then show else show order phone number */}
                    {billing?.phone || "N/A"}
                  </p>
                </div>
              </div>

              {/* shipping address */}
              <div className="flex-1">
                <h1 className="border-b px-7 py-5 text-primary-slate">
                  Shipping Address
                </h1>
                <div className="px-7 py-5">
                  <h2>{shipping?.name || "N/A"}</h2>
                  {/* if have user profile address then show else show order address */}
                  <p className="text-primary-slate">
                    {shipping?.address || "N/A"}
                  </p>
                  <p className="mt-10 text-primary-slate">Email</p>
                  <p>{shipping?.email || "N/A"}</p>
                  <p className="mt-3 text-primary-slate">Phone</p>
                  <p>
                    {/* if have user profile phone number then show else show order phone number */}
                    {shipping?.phone || "N/A"}
                  </p>
                </div>
              </div>
            </div>
            {/* order payment related details */}
            <div className="rounded border">
              <div className="">
                <div className="gap-x-2 border-b border-r px-2 py-5">
                  <h3 className="text-center text-primary-slate">Order ID</h3>
                  <p className="text-center">{order?.order_id}</p>
                </div>

                <div className="items-center border-b px-2 py-5">
                  <h3 className="text-center text-primary-slate">
                    Payment Method
                  </h3>
                  <p className="text-center capitalize">
                    {order.payment_method === "stripe"
                      ? "Stripe"
                      : "Cash on Delivery"}
                  </p>
                </div>

                <div className="items-center border-b px-2 py-5">
                  <h3 className="text-center text-primary-slate">
                    Payment Status
                  </h3>
                  <p className="text-center">
                    {checkPaymentStatus(order?.payment_status)}
                  </p>
                </div>
              </div>

              <div className="px-6 py-5">
                <div className="flex justify-between gap-x-2 py-3">
                  <h3 className="text-xl">Total </h3>
                  <p className="text-xl font-semibold text-primary-red">
                    ${order.total}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* progressbar */}
          <div className="mx-auto mt-10 px-2 pl-14 lg:w-3/4 lg:pl-10">
            <ProgressBar
              stages={[
                "Order Received",
                "Processing",
                "On the way",
                "Delivered",
              ]}
              percent={1}
              currentStage={checkStatus(order?.status)}
            />
          </div>

          {/* product table */}
          <Table className="mt-20 w-full overflow-x-auto">
            <TableHeader>
              <TableRow className="bg-light-gray/30">
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Subtotal</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order?.items?.map((data, idx: number) => (
                <TableRow key={idx}>
                  <TableCell className="min-w-fit font-medium">
                    <div className="flex min-w-fit flex-col items-center gap-3 lg:flex-row">
                      <Image
                        src={data?.product?.images[0]}
                        alt="data?.product_image"
                        width={950}
                        height={700}
                        className="size-10 rounded md:size-28"
                      />
                      <p className="max-w-sm text-primary-black/80 lg:text-lg">
                        {data?.product?.name}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>${data?.product?.price.toFixed(2)}</TableCell>
                  <TableCell>x{data?.quantity}</TableCell>
                  <TableCell>
                    $
                    {(
                      Number(data?.quantity) * Number(data?.product?.price)
                    ).toFixed(2)}
                  </TableCell>
                  <TableCell>{data?.discount || 0}%</TableCell>
                  <TableCell className="font-semibold">
                    $
                    {(
                      data?.quantity * data?.product?.price -
                      data?.quantity *
                        data?.product?.price *
                        (data.discount / 100)
                    ).toFixed(2)}
                    {/* subtotal - (subtotal * (discount / 100)) */}
                  </TableCell>
                  <TableCell>
                    <Link href={`/review?product_id=${data?.product?._id}`}>
                      <p className="font-medium text-primary-color underline">
                        Feedback
                      </p>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
};

export default SingleOrderDetails;
