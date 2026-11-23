"use client";
import SafeHtml from "@/components/shared/SafeHtml";
import AboutUsSkeleton from "@/components/skeleton/AboutUsSkeleton";
import { useGetSettingsQuery } from "@/redux/apis/settingsApi";

const AboutUsContainer = () => {
  const { data, isLoading } = useGetSettingsQuery("");
  const about = data?.data[0]?.about_us;
  return isLoading ? <AboutUsSkeleton /> : <div><SafeHtml html={about} /></div>;
};

export default AboutUsContainer;
