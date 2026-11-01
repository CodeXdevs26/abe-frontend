"use client";

import { useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

function PaymentSuccess() {
  const searchParams = useSearchParams();
  const isCashDelivery = searchParams.get("cash");
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }, [])

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div>
        <div className="w-full max-w-md bg-gradient-to-b from-green-50 to-green-100 p-10 rounded-md space-y-8 font-poppins border border-stroke">
          <div>
            <div className="text-center text-2xl font-bold text-green-600 flex items-center justify-center">
              <CheckCircle className="mr-2" />
              {isCashDelivery === "true"
                ? "Order placed successfully!"
                : "Payment Successful!"}
            </div>
          </div>
          <div>
            <p className="text-center text-gray-600 mb-6 font-poppins">
              {isCashDelivery === "true"
                ? "Thank you for your purchase. Your order has been placed successfully."
                : "Thank you for your purchase. Your payment has been processed successfully."}
            </p>
          </div>
          <div className="flex flex-row gap-x-4 items-center">
            <Link href="/user/order-history" className="mx-auto">
              <Button className="w-full">Order History</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
