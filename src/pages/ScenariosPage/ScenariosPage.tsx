import {lazy, Suspense} from "react";
import {ContentLayout} from "@/components/Layout/ContentLayout";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
// import CreateScenarioModal from "@/components/Scenarios/CreateScenarioModal/CreateScenarioModal";
// import ScenariosOverview from "@/components/Scenarios/ScenariosOverview/ScenariosOverview";

const CreateScenarioModal = lazy(() => import("@/components/Scenarios/CreateScenarioModal/CreateScenarioModal"));
const ScenariosOverview = lazy(() => import("@/components/Scenarios/ScenariosOverview/ScenariosOverview"));
import {Link} from "react-router-dom";

const Breadcrumbs = () => (
    <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator/>
            <BreadcrumbItem>
                <BreadcrumbPage>Scenarios</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
);

const ScenariosPage = () => (
    <ContentLayout title="Scenarios">
        <Breadcrumbs/>
        <div className="m-3">
            <Suspense fallback={<div>Loading...</div>}>
                <CreateScenarioModal/>
            </Suspense>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
            <ScenariosOverview/>
        </Suspense>
    </ContentLayout>
);

export default ScenariosPage;
