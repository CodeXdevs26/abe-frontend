"use client";
import ReviewSkeleton from "@/components/skeleton/ReviewSkeleton";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { calculateTime } from "@/utils/formatDistance";

import Image from "next/image";
import { useState } from "react";

const CustomerFeedbacks = ({
  reviews,
  isLoading,
}: {
  reviews: any[];
  isLoading: boolean;
}) => {
  const [showFeedbacks, setShowFeedbacks] = useState(4);

  return (
    <div>
      <h1 className=" text-xl font-semibold text-primary-black lg:text-2xl xl:text-4xl">
        Customer Feedback
      </h1>

      {isLoading ? (
        Array(4)
          .fill(0)
          .map((_, index) => (
            <div className="lg:w-3/4" key={index}>
              <ReviewSkeleton />
            </div>
          ))
      ) : reviews?.length < 1 ? (
        <div className="mt-20">
          <p className="text-lg text-gray-500">No data found!</p>
        </div>
      ) : (
        <div className="lg:w-3/4">
          {/*feedbacks */}
          {reviews?.slice(0, showFeedbacks)?.map((review, index) => (
            <div className="mt-6" key={index} id="#reviews">
              <div>
                <div className="flex justify-between gap-x-8">
                  <div className="flex items-center gap-3">
                    {review?.user?.image ? (
                      <Image
                        src={review?.user?.image}
                        alt="userImage"
                        width={950}
                        height={700}
                        className="size-14 rounded-full"
                      ></Image>
                    ) : (
                      <Image
                        src="/nonUser.png"
                        alt="userImage"
                        width={950}
                        height={700}
                        className="size-14 rounded-full"
                      ></Image>
                    )}

                    <div>
                      <h1 className="text-lg font-medium text-primary-black">
                        {review?.user?.name || "Anonymous"}
                      </h1>
                      <Rating rating={review?.stars} className="w-24"></Rating>
                    </div>
                  </div>
                  <p className="text-primary-slate">
                    {calculateTime(review?.createdAt)}
                  </p>
                </div>
                <p className="mt-4 max-w-5xl break-words text-primary-slate">
                  {review?.text}
                </p>
              </div>
              {index === 3 ? "" : <hr className="mt-5" />}
            </div>
          ))}
          {4 < reviews?.length && (
            <div className="mt-5 flex justify-end">
              {showFeedbacks > reviews?.length ? (
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => setShowFeedbacks(4)}
                  disabled={showFeedbacks <= 4}
                >
                  Show {showFeedbacks <= 4 ? "more" : "less"}
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="rounded-full"
                  disabled={showFeedbacks >= reviews?.length}
                  onClick={() => setShowFeedbacks(showFeedbacks + 4)}
                >
                  Show more
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerFeedbacks;
