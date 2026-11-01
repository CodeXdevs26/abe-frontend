"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import useDebounced from "@/hooks/useDebounced";
import getCoordinates from "@/utils/getCoordinates";
import { ChevronDown, MapPin, MoveUpRight, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const HeroSearch = ({ className }: { className?: string }) => {
  const [isLocationSetOpen, setIsLocationSetOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const debouncedValue = useDebounced(searchText, 500);
  const coords = searchParams.get("coords");
  const { handleSubmit } = useForm();

  useEffect(() => {
    setSearchText(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    if (coords) {
      router.push(`/all-restaurants?coords=${coords}`);
    } else if (pathName === "/all-restaurants" && debouncedValue) {
      router.push(`/all-restaurants?search=${debouncedValue}`);
    } else if (
      !debouncedValue &&
      pathName === "/all-restaurants" &&
      !searchParams.get("ref")
    ) {
      router.push(`/all-restaurants?search=${debouncedValue}`);
    }
  }, [debouncedValue, coords]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const onSearch = () => {
    if (pathName == "/") {
      router.push(`/all-restaurants?search=${searchText}&ref=home`);
    } else {
      router.push(`/all-restaurants?search=${searchText}`);
    }
  };

  const handleGetCoordinates = async () => {
    const coordinates = await getCoordinates();
    console.log("coordinates", coordinates);
    setIsLocationSetOpen(!isLocationSetOpen);
    router.push(`/all-restaurants?search=${searchText}&coords=${coordinates}`);
  };
  return (
    <div
      className={`flex xl:w-3/4 border-2 p-1 rounded-full border-primary-black/80 lg:pr-3 relative ${className}`}
    >
      <Button
        onClick={() => setIsLocationSetOpen(!isLocationSetOpen)}
        className="rounded-l-full rounded-r-xl bg-primary-green py-6 lg:text-lg hover:bg-primary-black/70"
      >
        <MapPin size={22} className="hidden md:block"></MapPin>Location{" "}
        <ChevronDown></ChevronDown>
      </Button>
      <form
        onSubmit={handleSubmit(onSearch)}
        className="flex justify-between w-full"
      >
        <Input
          placeholder="Search by name"
          defaultValue={searchText}
          onChange={onInputChange}
          className="py-6 focus-visible:ring-0 border-none focus-visible:ring-offset-0 bg-transparent shadow-none"
        ></Input>
        <Button
          onClick={onSearch}
          className="rounded-l-xl rounded-r-full bg-primary-green py-6 text-lg hover:bg-primary-black/70 rounded-full"
        >
          <Search></Search>
        </Button>
      </form>
      <Button
        onClick={handleGetCoordinates}
        className={cn(
          "bg-primary-green py-6 hover:bg-primary-black/70 absolute top-14 left-5 opacity-0 invisible duration-1000 ease-in",
          isLocationSetOpen && "opacity-100 visible"
        )}
      >
        Set Nearby Location <MoveUpRight size={28} className="ml-0" />
      </Button>
    </div>
  );
};

export default HeroSearch;
