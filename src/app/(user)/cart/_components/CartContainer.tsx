"use client";
import MovementElement from "@/components/animation/MovementElement";
import CartPageSkeleton from "@/components/skeleton/CartPageSkeleton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDecreaseCartQuantityMutation,
  useDeleteCartMutation,
  useGetCartsQuery,
  useIncreaseCartQuantityMutation,
} from "@/redux/apis/cartApi";
import { TCart } from "@/types";
import handleMutation from "@/utils/handleMutation";
import { ArrowLeft, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import GoogleMapContainer from "./GoogleMapContainer";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CartContainer = () => {
  // Initialize state with quantities from productData
  const router = useRouter();
  const [increaseQuantity] = useIncreaseCartQuantityMutation();
  const [decreaseQuantity] = useDecreaseCartQuantityMutation();
  const [deleteCart] = useDeleteCartMutation();
  const shippingLocation = localStorage.getItem("shippingLocation");
  const [address, setAddress] = useState(shippingLocation || "");

  const coords = useSearchParams().get("coords");
  const [latitude, setLatitude] = useState(Number(coords?.split(",")[1]) || 0);
  const [longitude, setLongitude] = useState(
    Number(coords?.split(",")[0]) || 0
  );

  const { data, isLoading } = useGetCartsQuery(`userCoords=${coords || null}`);
  const carts = data?.data?.result;
  const [quantities, setQuantities] = useState([]);

  useEffect(() => {
    const quantities = carts?.map((cart: TCart) => cart.quantity);
    setQuantities(quantities);
    if (carts?.length === 0) router.push("/menu-items");
  }, [carts]);

  // useEffect(() => {
  //   localStorage.setItem("shippingLocation", address);
  //   if (window !== undefined && longitude !== 0 && latitude !== 0) {
  //     localStorage.setItem("shippingCoords", `${longitude},${latitude}`);

  //     router.push(`/cart?coords=${longitude},${latitude}`);
  //   } else {
  //     const shippingCoords = localStorage.getItem("shippingCoords");
  //     setLatitude(Number(shippingCoords?.split(",")[1]) || 0);
  //     setLongitude(Number(shippingCoords?.split(",")[0]) || 0);
  //     setAddress(shippingLocation || "");
  //     router.push(`/cart?coords=${shippingCoords}`);
  //   }
  // }, [window, longitude, latitude, address]);
  useEffect(() => {
    if (longitude !== 0 && latitude !== 0) {
      // Save location to local storage
      localStorage.setItem("shippingLocation", address);
      localStorage.setItem("shippingCoords", `${longitude},${latitude}`);

      // Update the URL to reflect coordinates
      router.push(`/cart?coords=${longitude},${latitude}`);
    } else {
      const shippingCoords = localStorage.getItem("shippingCoords");
      if (shippingCoords) {
        setLatitude(Number(shippingCoords.split(",")[1]) || 0);
        setLongitude(Number(shippingCoords.split(",")[0]) || 0);
      }
      setAddress(shippingLocation || "");
      router.push(`/cart?coords=${shippingCoords}`);
    }
  }, [longitude, latitude, address]); // Only trigger when latitude, longitude, or address changes

  const handleQuantityChange = (idx: number, change: number, id: string) => {
    setQuantities((prevQuantities: any) =>
      prevQuantities.map((quantity: number, index: number) =>
        index === idx ? Math.max(quantity + change, 0) : quantity
      )
    );
    if (change === -1) {
      handleMutation(id, decreaseQuantity, "Quantity decreasing...");
    } else if (change === 1) {
      handleMutation(id, increaseQuantity, "Quantity increasing...");
    }
  };

  const handleDeleteCart = (id: string) => {
    handleMutation(id, deleteCart, "Cart deleting...");
  };

  const subTotal = carts?.reduce(
    (acc: any, cart: TCart) => acc + cart?.subtotal,
    0
  );
  const shippingFee = !coords ? 0 : data?.data?.totalShippingFee || 0;

  const handleProceed = () => {
    router.push(`/checkout?coords=${coords}`);
  };

  return isLoading ? (
    <CartPageSkeleton />
  ) : carts ? (
    <div>
      <MovementElement duration={0.3}>
        <div className="mt-8 grid grid-cols-1 xl:grid-cols-3 xl:gap-x-7 gap-y-5 items-center justify-center">
          <div className="col-span-2 shadow-md py-5 rounded-md border">
            <Table className="lg:text-lg w-full overflow-x-auto">
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Subtotal</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {carts?.map((cart: TCart, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium min-w-fit">
                      <div className="lg:text-lg text-sm flex flex-col lg:flex-row items-center gap-3 min-w-fit">
                        <Image
                          src={cart?.product?.images[0]}
                          alt="product_image"
                          width={950}
                          height={700}
                          className="md:size-28 size-16"
                        />
                        <p className="truncate">{cart?.product?.name}</p>
                      </div>
                    </TableCell>
                    <TableCell>${cart?.product?.price}</TableCell>
                    <TableCell>
                      {/* quantity */}
                      <div className="border-2  rounded-full flex items-center gap-x-3 max-w-fit ">
                        <button
                          onClick={() =>
                            handleQuantityChange(idx, -1, cart?._id)
                          }
                          className={`bg-primary-gray shadow-md size-10 flex justify-center items-center rounded-full hover:bg-primary-color hover:text-primary-white hover:shadow-2xl ease-in duration-300`}
                          disabled={quantities?.[idx] === 0}
                        >
                          -
                        </button>
                        <p>{quantities?.[idx]}</p>
                        <button
                          onClick={() =>
                            handleQuantityChange(idx, 1, cart?._id)
                          }
                          className="bg-primary-gray shadow-md size-10 flex justify-center items-center rounded-full hover:bg-primary-color hover:text-primary-white hover:shadow-2xl ease-in duration-300"
                        >
                          +
                        </button>
                      </div>
                    </TableCell>
                    <TableCell>
                      ${(cart?.product?.price * quantities?.[idx]).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div
                        onClick={() => handleDeleteCart(cart?._id)}
                        className="border size-8  rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-300 group duration-300"
                      >
                        <X
                          size={20}
                          className="group-hover:text-red-700 duration-300"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <hr />
            <div className="flex flex-wrap gap-2 md:justify-between items-center justify-center px-4 mt-5">
              <Link href="/menu-items">
                <Button className="bg-primary-gray text-primary-black hover:text-primary-white hover:bg-gray-500 ease-in duration-300 group overflow-hidden">
                  <ArrowLeft className="group-hover:-translate-x-10 ease-in duration-500"></ArrowLeft>
                  Return to shop
                </Button>
              </Link>
              <Button className="bg-primary-gray text-primary-black  hover:text-primary-white hover:bg-gray-500 duration-300">
                Clear Cart
              </Button>
            </div>
          </div>

          {/* cart statistics */}
          <Card className="shadow-md hover:border hover:border-primary-color/50 duration-300">
            <CardHeader>
              <div className="flex justify-between items-center gap-8">
                <CardTitle className="font-semibold text-xl">
                  Cart Total
                </CardTitle>
                <div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Shipping location</Button>
                    </DialogTrigger>
                    <DialogContent className="lg:min-w-[1000px] md:min-w-[700px] min-w-[300px] lg:h-[80vh] md:h-[70vh] h-[55vh]">
                      <DialogTitle>Shipping location</DialogTitle>
                      <div className="min-h-full">
                        <GoogleMapContainer
                          className={""}
                          address={address}
                          setAddress={setAddress}
                          latitude={latitude}
                          setLatitude={setLatitude}
                          longitude={longitude}
                          setLongitude={setLongitude}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <div className="flex justify-between py-5">
                  <p>Subtotal:</p>
                  <p className="font-medium">${subTotal?.toFixed(2) || 0}</p>
                </div>
                <hr />
                <div className="flex justify-between py-5">
                  <p>Shipping:</p>
                  {shippingFee == 0 ? (
                    <p className="text-sm text-gray-500">
                      Select shipping location
                    </p>
                  ) : (
                    <p className="font-medium">${shippingFee}</p>
                  )}
                </div>
                <hr />
                <div className="flex justify-between py-5">
                  <p>Total:</p>
                  <p className="font-medium">${shippingFee + subTotal || 0}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleProceed}
                className="bg-primary-color w-full rounded-full hover:bg-primary-black/80"
              >
                Proceed to checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </MovementElement>
    </div>
  ) : (
    <div className="text-lg text-gray-600 text-center py-20">
      <p>No data found!</p>
    </div>
  );
};

export default CartContainer;
