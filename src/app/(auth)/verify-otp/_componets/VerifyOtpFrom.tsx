"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { RotateCcw } from "lucide-react";
import MovementElement from "@/components/animation/MovementElement";
import handleMutation from "@/utils/handleMutation";
import { TResponse } from "@/types";
import { useSendOtpMutation, useVerifyOtpMutation } from "@/redux/apis/authApi";

interface FormData {
  otp: string;
}

const VerifyOtpForm = () => {
  const email = useSearchParams().get("email");
  const verify_account = useSearchParams().get("verify_account");
  const set_pass = useSearchParams().get("set_pass");
  const redirectUrl = `${
    set_pass ? `/set-new-password?email=${email}` : "/sign-in"
  }`;

  const [otp, setOtp] = useState<string>("");
  const router = useRouter();
  const { handleSubmit } = useForm<FormData>();
  const [verifyOtp] = useVerifyOtpMutation();
  const [sendOtp] = useSendOtpMutation();

  const onVerifySuccess = (res: TResponse<any>) => {
    router.push(redirectUrl);
  };

  const onSubmit = async () => {
    handleMutation(
      { otp, email, verify_account: verify_account ? true : false },
      verifyOtp,
      "Verifying OTP...",
      onVerifySuccess
    );
  };

  const handleResendOtp = async () => {
    handleMutation({ email }, sendOtp, "Resending OTP...");
  };

  return (
    <MovementElement duration={0.8}>
      <Card className="xl:w-[650px] md:w-[500px] shadow-md hover:shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-semibold">
            Verify OTP
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* OTP Input */}
            <div className="flex flex-col justify-center items-center space-y-5">
              <InputOTP
                maxLength={6}
                className="w-full"
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  {Array.from({ length: 6 }, (_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className=" mx-2 border border-primary-gray/50 bg-primary-black/10 md:size-12 border-primary-black/30 size-8"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
            <span
              className="flex cursor-pointer items-center justify-end gap-x-1 group hover:text-primary-green duration-500 mt-1"
              onClick={handleResendOtp}
            >
              <RotateCcw size={16} className="group-hover:animate-spin" />{" "}
              Resend OTP
            </span>
            <Button
              disabled={otp.length < 6}
              className="w-full bg-primary-color mt-3 hover:bg-primary-black/70"
            >
              Verify Code
            </Button>
          </form>
        </CardContent>
      </Card>
    </MovementElement>
  );
};

export default VerifyOtpForm;
