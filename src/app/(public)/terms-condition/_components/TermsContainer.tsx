"use client";
import AboutUsSkeleton from "@/components/skeleton/AboutUsSkeleton";
import { useGetSettingsQuery } from "@/redux/apis/settingsApi";
import React from "react";
import ReactHtmlParser from "react-html-parser";

const TermsContainer = () => {
  const { data, isLoading } = useGetSettingsQuery("");
  const terms = data?.data[0]?.terms_conditions;
  return isLoading ? (
    <AboutUsSkeleton />
  ) : (
    <div>{ReactHtmlParser(terms)}</div>
  );
};

export default TermsContainer;
