import { Suspense } from "react";
import Container from "@/components/ui/container";
import React from "react";
import SingleRestaurantContainer from "./_components/SingleRestaurantContainer";

const SIngleRestaurant = () => {
  return (
    <Container className="page-padding">
      <Suspense fallback={null}><SingleRestaurantContainer></SingleRestaurantContainer></Suspense>
    </Container>
  );
};

export default SIngleRestaurant;
