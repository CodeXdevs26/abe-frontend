import { Suspense } from "react";
import { Metadata } from "next";
import React from "react";
import AllRestaurantsContainer from "./_components/AllRestaurantsContainer";
import Container from "@/components/ui/container";

export const metadata: Metadata = {
  title: "All Restaurants",
  description:
    "Here you can find all the high quality restaurants. We provide delicious and healthy food for you. we server at your doorstep.",
};

const AllRestaurantsPage = () => {
  return (
    <Container className="page-padding">
      <Suspense fallback={null}><AllRestaurantsContainer></AllRestaurantsContainer></Suspense>
    </Container>
  );
};

export default AllRestaurantsPage;
