import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { TProduct } from "@/types";
import { Loader, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useAddToCartMutation } from "@/redux/apis/cartApi";
import handleMutation from "@/utils/handleMutation";
import { useRouter } from "next/navigation";

const MenuCard = ({ data }: { data: TProduct }) => {
  const [addToCart, { isLoading }] = useAddToCartMutation();

  const router = useRouter();
  const onSuccess = () => {
    setTimeout(() => {
      router.push("/cart");
    }, 400);
  };

  const handleAddToCart = async () => {
    const cartData = {
      product: data?._id,
      quantity: 1,
    };
    handleMutation(cartData, addToCart, "Adding to cart...", onSuccess);
  };
  return (
    <Card className="w-full hover:shadow-2xl rounded-xl duration-100 ease-in truncate">
      <CardContent className="px-0 relative pt-6">
        <Link href={`/menu-items/${data?._id}`}>
          <Image
            src={data?.images[0]}
            alt="menu_image"
            width={1200}
            height={1200}
            className="w-auto mx-auto h-[200px] object-cover rounded-xl"
          ></Image>
          <div className="px-4 mt-4 flex-between">
            <div>
              <h1 className="text-xl font-semibold">
                {data?.name.length > 20
                  ? data?.name.slice(0, 20) + "..."
                  : data?.name}
              </h1>
              <p className="text-primary-black/80">
                {data?.description.slice(0, 30)}
                {data?.description.length > 30 ? "..." : ""}
              </p>
            </div>
            <p className="font-semibold text-xl">${data?.price}</p>
          </div>
        </Link>

        <div
          onClick={handleAddToCart}
          className={`absolute top-2 right-2 bg-primary-green hover:bg-primary-black/70 rounded-full p-3 cursor-pointer group duration-300 ease-in z-10 ${
            isLoading && "pointer-events-none"
          }`}
        >
          {isLoading ? (
            <Loader
              className="text-white group-hover:scale-110 duration-1000 animate-spin"
              size={22}
            />
          ) : (
            <ShoppingCart
              className="text-white group-hover:scale-110 duration-300 ease-in"
              size={22}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuCard;
