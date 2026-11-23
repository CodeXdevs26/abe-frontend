import { Suspense } from "react";
import Container from "@/components/ui/container";
import ProductReviewContainer from "./_components/ProductReviewContainer";

export const metadata = {
  title: "Review",
  description: "The Review page of this product",
};

const ReviewPage = () => {
  return (
    <Container className="page-padding">
      <Suspense fallback={null}><ProductReviewContainer></ProductReviewContainer></Suspense>
    </Container>
  );
};

export default ReviewPage;
