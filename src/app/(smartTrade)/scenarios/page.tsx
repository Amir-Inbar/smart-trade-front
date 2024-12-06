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
import { CreateScenarioModal } from "@/components/Scenarios/CreateScenarioModal/CreateScenarioModal";
import { ScenariosOverview } from "@/components/Scenarios/ScenariosOverview/ScenariosOverview";

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
        <BreadcrumbPage>CreateScenarioForm</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
);

const ScenariosPage = () => (
  <ContentLayout title="CreateScenarioForm">
    <Breadcrumbs />
    <div className="m-3">
      <CreateScenarioModal />
    </div>
    <ScenariosOverview />
  </ContentLayout>
);

export default ScenariosPage;
