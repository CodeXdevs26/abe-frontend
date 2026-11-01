"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import google from "@/assets/icons/google.png";
import Image from "next/image";
import Link from "next/link";
import MovementElement from "@/components/animation/MovementElement";
import {
  useGoogleLoginMutation,
  useSignInMutation,
} from "@/redux/apis/authApi";
import handleMutation from "@/utils/handleMutation";
import { TJwtPayload, TResponse } from "@/types";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { setUser } from "@/redux/slices/auth/authSlice";
import getUserByToken from "@/utils/getUserByToken";
import { toast } from "sonner";

// Define form data types
interface FormData {
  email: string;
  password: string;
  is_remember: boolean;
}

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [pathname, setPathname] = useState("");
  const redirectUrl = pathname.includes("redirect=")
    ? `${pathname.split("redirect=")[1]}`
    : "/user/profile";
  const { data: session } = useSession();
  const [googleLogin] = useGoogleLoginMutation();
  const dispatch = useAppDispatch();
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    // This code will only run on the client-side
    if (typeof window !== "undefined") {
      const currentPathname = window.location.href;
      setPathname(currentPathname);
    }
  }, []);

  // on login success
  const onLoginSuccess = (
    res: TResponse<{ accessToken: string; refreshToken: string }>,
  ) => {
    const accessToken = res.data?.accessToken;
    const user = getUserByToken(accessToken!) as TJwtPayload;

    if (user.role !== "user") {
      toast.error("Only user can login!");
    } else {
      dispatch(setUser({ token: accessToken, user }));
      router.push(redirectUrl.includes("cart") ? `/cart` : redirectUrl);
    }
  };

  useEffect(() => {
    if (session) {
      const loginData = {
        name: session.user?.name,
        email: session.user?.email,
        image: session.user?.image,
      };
      handleMutation(loginData, googleLogin, "Signing in...", onLoginSuccess);
    }
  }, [session]);

  const [login, { isLoading }] = useSignInMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    data.is_remember = remember;
    handleMutation(data, login, "Logging in...", onLoginSuccess);
  };

  const handleRemember = (checked: boolean) => {
    setRemember(checked);
  };
  return (
    <MovementElement duration={0.8}>
      <Card className="xl:w-[650px] md:w-[500px] shadow-md hover:shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-semibold">
            Sign In
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              {/* Input email */}
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="email"
                  defaultValue={"junayednoman05@gmail.com"}
                  placeholder="Email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Input password with eye icon to toggle visibility */}
              <div>
                <div className="relative flex flex-col space-y-1.5">
                  <Input
                    defaultValue={"Junayednoman@"}
                    id="password"
                    placeholder={"Password"}
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />

                  {/* Eye icon to toggle password visibility */}
                  <div
                    className="absolute right-3 top-1/3 -translate-y-1/2 transform cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Eye color="#424040" />
                    ) : (
                      <EyeOff color="#424040" />
                    )}
                  </div>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 mt-2">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember me and forget password section */}
              <div className="flex flex-col justify-between gap-y-3 md:flex-row">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    // checked={remember}
                    onCheckedChange={handleRemember}
                    id="terms"
                  />
                  <label htmlFor="terms" className="text-secondary-gray">
                    Remember me
                  </label>
                </div>
                <Link href="/forget-password">
                  <p className="text-secondary-gray">Forgot Password</p>
                </Link>
              </div>

              {/* Login button */}
              <Button
                disabled={isLoading}
                type="submit"
                className="rounded-full bg-primary-color hover:bg-primary-black/70"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </div>
          </form>
          {/* google sign in 
         {/* <div onClick={() => signIn("google")} className="relative mt-3">
            <Button className="w-full rounded-full" variant="outline">
              Continue with Google
            </Button>
            <Image
              src={google}
              alt="google"
              className="absolute left-2 top-1"
            />
          </div>
          */}
        </CardContent>

        {/* Footer with link to register */}
        <CardFooter className="flex justify-center gap-1">
          <p className="text-secondary-gray">Don&apos;t have an account</p>
          <Link href={"/sign-up"}>
            <span className="text-lg font-medium">Register</span>
          </Link>
        </CardFooter>
      </Card>
    </MovementElement>
  );
};

export default SignInForm;
