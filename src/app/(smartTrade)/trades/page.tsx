"use client";

import Link from "next/link";
import { ContentLayout } from "@/components/Layout/ContentLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { TradesOverview } from "@/components/Trades/TradesOverview/TradesOverview";


const Breadcrumbs = () => (
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link href="/overview">Home</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Trades</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
);

const ScenariosPage = () => (
  <ContentLayout title="Trades">
    <Breadcrumbs />
    <TradesOverview />
  </ContentLayout>
);

export default ScenariosPage;
