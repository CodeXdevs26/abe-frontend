"use client";
import Spinner from "@/components/animation/spinner";
import { Button } from "@/components/ui/button";
import CountryStateCitySelector from "@/components/ui/country-state-city-selector";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useGetMyBillingAddressQuery,
  useUpdateBillingAddressMutation,
} from "@/redux/apis/profileApi";
import handleMutation from "@/utils/handleMutation";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormInputs {
  street_address?: string;
  house?: string;
  country?: string;
  state?: string;
  city?: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  phone?: string;
  email?: string;
  name?: string;
}

const BillingAddressForm = () => {
  const { data, isLoading } = useGetMyBillingAddressQuery("");
  const existingBilling = data?.data;
  const [updateBillingAddress, { isLoading: isUpdating }] =
    useUpdateBillingAddressMutation();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>();

  if (isLoading) {
    return <Spinner className="py-32" size="100px" />;
  }

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { first_name, last_name, ...bodyData } = data;
    bodyData.name = data.first_name + " " + data.last_name;
    if(bodyData.city === "No city found") bodyData.city = "";

    handleMutation(
      bodyData,
      updateBillingAddress,
      "Billing address updating..."
    );
  };

  return (
    <div className="dashboard-card" id="address">
      <h1 className="px-7 py-5 text-2xl font-medium">Billing Address</h1>
      <hr />
      <div className="px-7 py-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col space-y-1.5">
                <Label
                  htmlFor="first_name"
                  className="mb-1 block font-semibold text-primary-black"
                >
                  First Name
                </Label>
                <Input
                  defaultValue={existingBilling?.name?.split(" ")[0]}
                  id="first_name"
                  placeholder="First Name"
                  type="text"
                  {...register("first_name")}
                />
                {errors.first_name && (
                  <p className="text-sm text-red-500">
                    {errors.first_name.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label
                  htmlFor="last_name"
                  className="mb-1 block font-semibold text-primary-black"
                >
                  Last Name
                </Label>
                <Input
                  defaultValue={existingBilling?.name?.split(" ")[1]}
                  id="last_name"
                  placeholder="Last Name"
                  type="text"
                  {...register("last_name")}
                />
                {errors.last_name && (
                  <p className="text-sm text-red-500">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label
                  htmlFor="company_name"
                  className="mb-1 block font-semibold text-primary-black"
                >
                  Company Name(Optional)
                </Label>
                <Input
                  defaultValue={existingBilling?.company_name}
                  id="company_name"
                  placeholder="Company Name"
                  type="text"
                  {...register("company_name")}
                />
                {errors.company_name && (
                  <p className="text-sm text-red-500">
                    {errors.company_name.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col space-y-1.5">
                <Label
                  htmlFor="email"
                  className="mb-1 block font-semibold text-primary-black"
                >
                  Email
                </Label>
                <Input
                  defaultValue={existingBilling?.email}
                  id="email"
                  placeholder="email"
                  type="text"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label
                  htmlFor="phone"
                  className="mb-1 block font-semibold text-primary-black"
                >
                  Phone
                </Label>
                <Input
                  defaultValue={existingBilling?.phone}
                  id="phone"
                  placeholder="phone"
                  type="text"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>
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
                  country: existingBilling?.country,
                  state: existingBilling?.state,
                  city: existingBilling?.city,
                  street_address: existingBilling?.street_address,
                  house: existingBilling?.house_no,
                  zip_code: existingBilling?.zip_code,
                }}
                register={register}
                setValue={setValue}
              />
            </div>
          </div>
          {/* submit button */}
          <Button
            type="submit"
            disabled={isUpdating}
            className={`mt-7 rounded-full bg-primary-color px-10  ${
              isUpdating && "cursor-not-allowed opacity-40"
            }`}
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BillingAddressForm;
