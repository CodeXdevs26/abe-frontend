"use client";
import ReactHtmlParser from "react-html-parser";
import AboutUsSkeleton from "@/components/skeleton/AboutUsSkeleton";
import { useGetSettingsQuery } from "@/redux/apis/settingsApi";

const AboutUsContainer = () => {
  const { data, isLoading } = useGetSettingsQuery("");
  const about = data?.data[0]?.about_us;
  return isLoading ? <AboutUsSkeleton /> : <div>{ReactHtmlParser(about)}</div>;
};

export default AboutUsContainer;
