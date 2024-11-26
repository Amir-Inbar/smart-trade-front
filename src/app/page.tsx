"use client";

import { ContentLayout } from "@/components/Layout/ContentLayout";
import { useFetchAccountNumberQuery } from "@/store/api/accountApi";
import Head from "next/head";

const Overview = () => {
  const { data: accountNumber } = useFetchAccountNumberQuery();

  return (
    <ContentLayout title="Home">
      <Head>
        <title>Home - Coding Beauty</title>
        <meta name="description"
              content="codingbeautydev.com: Coding - the art, the science, and the passion." />
      </Head>
      <h1 className="text-2xl pb-2 font-bold">Overview</h1>
      <p className="text-sm pb-2 text-gray-500">
        Welcome back, <span className="font-bold">{accountNumber}</span>
      </p>
    </ContentLayout>
  );
};

export default Overview;
