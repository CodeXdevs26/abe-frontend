"use client"
import AboutUsSkeleton from "@/components/skeleton/AboutUsSkeleton";
import { useGetSettingsQuery } from "@/redux/apis/settingsApi";
import SafeHtml from "@/components/shared/SafeHtml";

const PrivacyPolicyContainer = () => {
  const { data, isLoading } = useGetSettingsQuery("");
  const privacy = data?.data[0]?.privacy_policy;
  return isLoading ? (
    <AboutUsSkeleton />
  ) : (
    <div><SafeHtml html={privacy} /></div>
  );
};

export default PrivacyPolicyContainer;
