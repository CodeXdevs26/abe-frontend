import { Suspense } from "react";
import React from "react";
import BillingInfoContainer from "./_components/BillingInfoContainer";
import Container from "@/components/ui/container";

const BillingInfo = () => {
  return (
    <Container className="page-padding">
      <Suspense fallback={null}><BillingInfoContainer></BillingInfoContainer></Suspense>
    </Container>
  );
};

export default BillingInfo;
