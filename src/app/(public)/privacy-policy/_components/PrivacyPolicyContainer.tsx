"use client"
import AboutUsSkeleton from "@/components/skeleton/AboutUsSkeleton";
import { useGetSettingsQuery } from "@/redux/apis/settingsApi";
import ReactHtmlParser from "react-html-parser";

const PrivacyPolicyContainer = () => {
  const { data, isLoading } = useGetSettingsQuery("");
  const privacy = data?.data[0]?.privacy_policy;
  return isLoading ? (
    <AboutUsSkeleton />
  ) : (
    <div>{ReactHtmlParser(privacy)}</div>
  );
};

export default PrivacyPolicyContainer;
