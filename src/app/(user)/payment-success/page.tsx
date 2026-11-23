import { Suspense } from "react";
import PaymentSuccess from "./PaymentSuccess";

const PaymentSuccessPage = () => {
  return (
    <Suspense fallback={null}>
      <PaymentSuccess />
    </Suspense>
  );
};

export default PaymentSuccessPage;
