"use client";
import React from "react";
import MenuDetails from "./MenuDetails";
import CustomerFeedbacks from "./CustomerFeedbacks";
import { useGetProductsReviewQuery } from "@/redux/apis/reviewApi";
import { useParams } from "next/navigation";

const MenuDetailsContainer = () => {
  const params = useParams();
  const { data, isLoading } = useGetProductsReviewQuery(params?.menuId);
  const reviewsData = data?.data;

  console.log("reviewsData", reviewsData);

  return (
    <div className="md:space-y-16 space-y-12">
      <MenuDetails reviewLength={reviewsData?.length}></MenuDetails>
      <CustomerFeedbacks
        reviews={reviewsData}
        isLoading={isLoading}
      ></CustomerFeedbacks>
    </div>
  );
};

export default MenuDetailsContainer;
