"use client";
import Spinner from "@/components/animation/spinner";
import { Button } from "@/components/ui/button";
import { InputRating } from "@/components/ui/input-rating";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateReviewMutation,
  useGetReviewStatsQuery,
} from "@/redux/apis/reviewApi";
import { Star } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useGetMeQuery } from "@/redux/apis/profileApi";
import handleMutation from "@/utils/handleMutation";

interface TReviewStats {
  _id: any;
  avgRating: number;
  totalRatings: number;
  totalReviews: number;
  fiveStars: number;
  fourStars: number;
  threeStars: number;
  twoStars: number;
  oneStars: number;
}

type FormInputs = {
  comment: number;
};

const ProductReviewContainer = () => {
  const { data: myData } = useGetMeQuery("");
  const userId = myData?.data?._id;
  const productId = useSearchParams().get("product_id");
  const { data, isLoading } = useGetReviewStatsQuery(productId);
  const ratingData = data?.data[0] as TReviewStats;
  const [createReview, { isLoading: isCreating }] = useCreateReviewMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const [selectRating, setSelectRating] = useState(0);

  const router = useRouter();

  const onSuccess = () => {
    router.back();
  };
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const reviewData = {
      user: userId,
      stars: selectRating,
      text: data.comment,
      product: productId,
    };

    handleMutation(reviewData, createReview, "Review creating...", onSuccess);
  };

  const handleRatingChange = (newRating: number) => {
    setSelectRating(newRating);
  };

  if (isLoading) {
    return <Spinner className="md:h-[65vh] h-[50vh]" />;
  }

  return (
    <div className="space-y-6 lg:space-y-16">
      <div className="flex flex-col justify-center gap-5 md:flex-row lg:gap-x-40">
        <>
          <div className="flex justify-center">
            <div>
              <div className="flex items-center gap-2 justify-center">
                <h1 className="text-5xl font-medium">
                  {ratingData?.avgRating.toFixed(1) || 0}
                </h1>
                <Star fill="#000" size={40}></Star>
              </div>
              <div className="mt-4 w-fit text-center">
                <p>{ratingData?.totalRatings || 0} Ratings</p>
                <p className="text-center">&</p>
                <p className="text-center">
                  {ratingData?.totalReviews || 0} Reviews
                </p>
              </div>
            </div>
          </div>

          {/* previous ratings */}
          <div className="flex-1">
            <div className="flex items-center gap-14">
              <div className="flex gap-1 text-[#F8B84E]">
                <h1 className="text-xl font-medium">5</h1>
                <Star fill="#F8B84E" />
              </div>
              <Progress
                value={ratingData?.fiveStars}
                totalValue={ratingData?.totalReviews}
                className="max-h-[14px] max-w-[600px]"
              ></Progress>
            </div>
            <div className="flex items-center gap-14">
              <div className="flex gap-1 text-[#F8B84E]">
                <h1 className="text-xl font-medium">4</h1>
                <Star fill="#F8B84E" />
              </div>
              <Progress
                value={ratingData?.fourStars}
                totalValue={ratingData?.totalReviews}
                className="max-h-[14px] max-w-[600px]"
              ></Progress>
            </div>
            <div className="flex items-center gap-14">
              <div className="flex gap-1 text-[#F8B84E]">
                <h1 className="text-xl font-medium">3</h1>
                <Star fill="#F8B84E" />
              </div>
              <Progress
                value={ratingData?.threeStars}
                totalValue={ratingData?.totalReviews}
                className="max-h-[14px] max-w-[600px]"
              ></Progress>
            </div>
            <div className="flex items-center gap-14">
              <div className="flex gap-1 text-[#F8B84E]">
                <h1 className="text-xl font-medium">2</h1>
                <Star fill="#F8B84E" />
              </div>
              <Progress
                value={ratingData?.twoStars}
                totalValue={ratingData?.totalReviews}
                className="max-h-[14px] max-w-[600px]"
              ></Progress>
            </div>
            <div className="flex items-center gap-14">
              <div className="flex gap-1 text-[#F8B84E]">
                <h1 className="text-xl font-medium">1</h1>
                <Star fill="#F8B84E" />
              </div>
              <Progress
                value={ratingData?.oneStars}
                totalValue={ratingData?.totalReviews}
                className="max-h-[14px] max-w-[600px]"
              ></Progress>
            </div>
          </div>
        </>
      </div>

      {/* input rating */}
      <div>
        <InputRating
          onRatingChange={handleRatingChange}
          className="md:w-96"
        ></InputRating>
      </div>

      {/* Feedback message */}
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <Label className="md:text-2xl text-base text-primary-black">
          Please share your opinion about the product
        </Label>
        <Textarea
          placeholder="type your feedback here"
          className="mt-2 bg-light-gray/30"
          rows={7}
          {...register("comment", { required: "Feedback is required" })}
        />
        {errors.comment && (
          <span className="text-red-500">{errors.comment.message}</span>
        )}

        {/* submit button */}
        <Button
          disabled={!selectRating || isCreating}
          type="submit"
          className="mt-5 w-full bg-primary-color hover:bg-primary-gray"
        >
          {isCreating ? "Review creating..." : "Send Review"}
        </Button>
      </form>
    </div>
  );
};

export default ProductReviewContainer;
