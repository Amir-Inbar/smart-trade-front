// app/scenarios/page.tsx

import Link from "next/link";
import {ContentLayout} from "@/components/Layout/ContentLayout";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {CreateScenarioModal} from "@/components/Scenarios/CreateScenarioModal/CreateScenarioModal";

export const metadata = {
    title: "Scenario Page",
    description: "Create a new scenario",
};

const Breadcrumbs = () => (
    <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink asChild>
                    <Link href="/overview">Home</Link>
                </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator/>
            <BreadcrumbItem>
                <BreadcrumbPage>CreateScenarioForm</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
);

const ScenariosPage = () => (
    <ContentLayout title="CreateScenarioForm">
        <Breadcrumbs/>
        <CreateScenarioModal/>
    </ContentLayout>
);

export default ScenariosPage;
