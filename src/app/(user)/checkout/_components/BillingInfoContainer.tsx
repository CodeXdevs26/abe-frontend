"use client";
import MovementElement from "@/components/animation/MovementElement";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CountryStateCitySelector from "@/components/ui/country-state-city-selector";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-number-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useGetCartsQuery } from "@/redux/apis/cartApi";
import { TCart } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import GoogleMapContainer from "../../cart/_components/GoogleMapContainer";
import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { useGetMyBillingAddressQuery } from "@/redux/apis/profileApi";
import Spinner from "@/components/animation/spinner";
import { useCreatePaymentSessionMutation } from "@/redux/apis/paymentApi";
import handleMutation from "@/utils/handleMutation";
import { useCreateOrderMutation } from "@/redux/apis/orderApi";
import { toast } from "sonner";

// Define form input types
interface CheckoutFormInputs {
  name: string;
  email: string;
  phone: string;
  payment_method: string;
  country: string;
  state: string;
  city: string;
  area: string;
  house: string;
  shipping_name: string;
  shipping_email: string;
  shipping_phone_number: string;
  shipping_address: string;
}

const BillingInfoContainer = () => {
  const { data: billingData, isLoading: isBillingLoading } =
    useGetMyBillingAddressQuery("");
  const [createOrder, { isLoading: isOrderCreating }] =
    useCreateOrderMutation();
  const billing = billingData?.data;
  const params = useSearchParams();
  const coords = params?.get("coords");
  const router = useRouter();
  const shippingLocation = localStorage.getItem("shippingLocation");
  const [address, setAddress] = useState(shippingLocation || "");

  const [latitude, setLatitude] = useState(Number(coords?.split(",")[1]) || 0);
  const [longitude, setLongitude] = useState(
    Number(coords?.split(",")[0]) || 0
  );
  const { data, isLoading: isCartLOading } = useGetCartsQuery(
    `userCoords=${coords}`
  );
  const carts = data?.data?.result;

  const totalPrice = carts
    ?.reduce((acc: any, cart: TCart) => acc + cart?.subtotal, 0)
    ?.toFixed(2);
  const shippingFee = data?.data?.totalShippingFee?.toFixed(2) || 0;

  useEffect(() => {
    if ((!isCartLOading && !carts) || carts?.length === 0)
      router.push("/menu-items");
  }, [carts]);

  useEffect(() => {
    if (window !== undefined && longitude !== 0 && latitude !== 0) {
      localStorage.setItem("shippingLocation", address);
      localStorage.setItem("shippingCoords", `${longitude},${latitude}`);

      router.push(`/checkout?coords=${longitude},${latitude}`);
    } else {
      const shippingCoords = localStorage.getItem("shippingCoords");
      setLatitude(Number(shippingCoords?.split(",")[1]) || 0);
      setLongitude(Number(shippingCoords?.split(",")[0]) || 0);
      setAddress(shippingLocation || "");
      router.push(`/checkout?coords=${shippingCoords}`);
    }
  }, [window, longitude, latitude, address]);

  const subTotal = Number(totalPrice) + Number(shippingFee);
  const discount = 0;
  const total = subTotal - discount || 0;
  const [createPaymentSession, { isLoading }] =
    useCreatePaymentSessionMutation();

  // Define payment methods
  const paymentMethods = [
    {
      id: "1",
      name: "Stripe",
      value: "stripe",
    },
    {
      id: "2",
      name: "Cash On Delivery",
      value: "cash",
    },
  ];

  // Setup useForm with default values
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<CheckoutFormInputs>();

  // on success
  const onSuccess = ({ data }: { data: { url: string } }) => {
    router.push(data?.url);
  };
  const createOrderSuccess = () => {
    router.push("/payment-success?cash=true");
  };
  // Form submission for  create order and
  const onSubmit: SubmitHandler<CheckoutFormInputs> = async (data) => {
    if (!data?.payment_method)
      return toast.warning("Please select a payment method");

    data.shipping_address = address;
    if (data?.city === "No city found") data.city = "";
    const {
      shipping_name,
      shipping_email,
      shipping_phone_number,
      shipping_address,
      ...billing_data
    } = data;

    const shippingData = {
      name: shipping_name,
      email: shipping_email,
      phone: shipping_phone_number,
      address: shipping_address,
    };

    const items = carts?.map((item: any) => ({
      product: item?.product?._id,
      store: item?.product?.store?._id,
      name: item?.product?.name,
      shipping_fee: item?.shippingFee,
      amount: item?.product?.price,
      quantity: item?.quantity,
    }));

    const orderData = {
      isWeb: true,
      billing_address: billing_data,
      shipping_address: shippingData,
      items,
      payment_method: data.payment_method,
      payment_status: data?.payment_method === "cash" ? "pending" : "unpaid",
    };

    if (data?.payment_method === "stripe") {
      handleMutation(
        orderData,
        createPaymentSession,
        "Placing order...",
        onSuccess
      );
    } else if (data?.payment_method === "cash") {
      console.log("orderData", orderData);
      handleMutation(
        orderData,
        createOrder,
        "Placing order...",
        createOrderSuccess
      );
    }
  };

  if (isBillingLoading) return <Spinner size="120px" className="py-32" />;

  return (
    <div>
      <MovementElement duration={0.3}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" grid grid-cols-1 justify-center xl:gap-x-7 gap-y-5 xl:grid-cols-3"
        >
          {/* form */}
          <div className="col-span-2 justify-start py-5 shadow-sm px-2 rounded space-y-12">
            <div>
              <h1 className="text-3xl font-bold text-primary-black lg:text-4xl mb-6">
                Billing Information
              </h1>
              <div className="grid w-full items-center gap-4">
                {/* Name input */}
                <div className="flex flex-1 flex-col space-y-1.5">
                  <Label>Name</Label>
                  <Input
                    id="name"
                    placeholder="Name"
                    defaultValue={billing?.name}
                    {...register("name")}
                    className="bg-primary-light-gray"
                  />
                </div>

                {/* address */}
                <div className="relative grid w-full items-center gap-1.5">
                  <Label
                    htmlFor="address"
                    className="mb-1 block font-semibold text-primary-black"
                  >
                    Address
                  </Label>

                  <CountryStateCitySelector
                    control={control}
                    userAddress={{
                      country: billing?.country,
                      state: billing?.state,
                      city: billing?.city,
                      street_address: billing?.street_address,
                      house: billing?.house_no,
                      zip_code: billing?.zip_code,
                    }}
                    register={register}
                    setValue={setValue}
                  />
                </div>

                {/* Email and Phone inputs */}
                <div className="flex flex-col md:items-center justify-between gap-4 md:flex-row">
                  <div className="flex flex-1 flex-col space-y-1.5">
                    <Label>Email</Label>
                    <Input
                      id="email"
                      defaultValue={billing?.email}
                      placeholder="Email Address"
                      className="bg-primary-light-gray"
                      {...register("email", {
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: "Please enter a valid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col space-y-1.5">
                    {/* user phone number */}
                    <div className="mb-2 space-y-1">
                      <Label>Phone Number</Label>
                      <Controller
                        // @ts-ignore
                        name="phone"
                        defaultValue={billing?.phone}
                        // rules={{ required: "Phone number is required" }}
                        control={control}
                        render={({ field }) => (
                          <PhoneInput
                            // @ts-ignore
                            value={field.value || billing?.phone}
                            onChange={field.onChange}
                            international
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary-black lg:text-4xl mb-6">
                Shipping Information
              </h1>
              <div className="grid w-full items-center gap-4">
                {/* Name input */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-1 flex-col space-y-1.5">
                    <Label>Name</Label>
                    <Input
                      defaultValue={billing?.name}
                      id="shipping_name"
                      placeholder="Name"
                      {...register("shipping_name")}
                      className="bg-primary-light-gray"
                    />
                  </div>
                  <div className="flex flex-1 flex-col space-y-1.5">
                    <Label>Email</Label>
                    <Input
                      defaultValue={billing?.email}
                      id="shipping_email"
                      placeholder="Email Address"
                      className="bg-primary-light-gray"
                      {...register("shipping_email", {
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: "Please enter a valid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 items-center">
                  {/* Email and Phone inputs */}
                  <div className="flex flex-1 flex-col space-y-1.5">
                    {/* user phone number */}
                    <div className="space-y-1">
                      <Label>Phone Number</Label>
                      <Controller
                        // @ts-ignore
                        name="shipping_phone_number"
                        defaultValue={billing?.phone}
                        // rules={{ required: "Phone number is required" }}
                        control={control}
                        render={({ field }) => (
                          <PhoneInput
                            // @ts-ignore
                            value={field.value || billing?.phone}
                            onChange={field.onChange}
                            international
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex items-end gap-2">
                    <div className="w-full">
                      <Label>Address</Label>
                      <Input
                        disabled
                        value={address}
                        id="shipping_address"
                        placeholder="Name"
                        {...register("shipping_address")}
                        className="bg-primary-light-gray h-10"
                      />
                    </div>
                    <div className="w-fit">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="px-4 py-5">
                            <Pencil size={25} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="lg:min-w-[1000px] md:min-w-[700px] min-w-[300px] lg:h-[80vh] md:h-[70vh] h-[55vh]">
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
                </div>
              </div>
            </div>
          </div>

          {/* cart statistics */}
          <Card className="shadow-md hover:border hover:border-gray-400 duration-300 h-fit">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* products information */}
              <div>
                <div className="flex justify-between pb-5">
                  <p>Subtotal:</p>
                  <p className="font-medium">${subTotal}</p>
                </div>
                <hr />
                <div className="flex justify-between py-5">
                  <p>Discount:</p>
                  <p className="font-medium">{discount}</p>
                </div>
                <hr />
                <div className="flex justify-between py-5">
                  <p>Total:</p>
                  <p className="font-medium">${total}</p>
                </div>
              </div>

              {/* payment method */}
              <Label className="text-xl">Payment Method</Label>

              <RadioGroup className="mt-4">
                {paymentMethods?.map((paymentMethod) => (
                  <div
                    className="flex items-center space-x-2"
                    key={paymentMethod?.id}
                  >
                    <RadioGroupItem
                      value={paymentMethod?.value}
                      id={paymentMethod?.id}
                      onClick={() =>
                        setValue("payment_method", paymentMethod?.value)
                      }
                    />
                    <Label htmlFor={paymentMethod?.id}>
                      {paymentMethod?.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.payment_method && (
                <p className="text-sm text-red-500">
                  {errors.payment_method.message}
                </p>
              )}
            </CardContent>
            <CardFooter>
              <Button
                disabled={isLoading}
                type="submit"
                className="w-full rounded-full bg-primary-color"
              >
                {!isLoading ? "Place Order" : "Placing Order..."}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </MovementElement>
    </div>
  );
};

export default BillingInfoContainer;
