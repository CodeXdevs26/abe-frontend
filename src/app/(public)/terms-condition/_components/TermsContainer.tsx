"use client";
import AboutUsSkeleton from "@/components/skeleton/AboutUsSkeleton";
import { useGetSettingsQuery } from "@/redux/apis/settingsApi";
import React from "react";
import SafeHtml from "@/components/shared/SafeHtml";

const TermsContainer = () => {
  const { data, isLoading } = useGetSettingsQuery("");
  const terms = data?.data[0]?.terms_conditions;
  return isLoading ? (
    <AboutUsSkeleton />
  ) : (
    <div><SafeHtml html={terms} /></div>
  );
};

export default TermsContainer;
