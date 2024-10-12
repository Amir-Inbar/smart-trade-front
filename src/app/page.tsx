"use client";

import { FetchDataInBackground } from "@/components/FetchDataInBackground/FetchDataInBackground";
import { ContentLayout } from "@/components/Layout/ContentLayout";
import { useFetchAccountNumberQuery } from "@/store/api/accountApi";

const Overview = () => {
  const { data: accountNumber } = useFetchAccountNumberQuery();

  return (
    <ContentLayout title='Home'>
      <FetchDataInBackground />
      <h1 className='text-2xl pb-2 font-bold'>Overview</h1>
      <p className='text-sm pb-2 text-gray-500'>
        Welcome back,
        <span className='font-bold'>{accountNumber}</span>
      </p>
    </ContentLayout>
  );
};

export default Overview;
