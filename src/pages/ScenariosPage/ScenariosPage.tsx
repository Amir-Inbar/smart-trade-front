import {Link} from "react-router-dom";
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

const CreateScenarioModal = lazy(() => import("@/components/Scenarios/CreateScenarioModal/CreateScenarioModal"));
const ScenariosOverview = lazy(() => import("@/components/Scenarios/ScenariosOverview/ScenariosOverview"));
import {FetchScenariosInBackground} from "@/components/FetchDataInBackground/FetchScenariosInBackground";
import {DailyTradeLimit} from "@/components/DailyTradeLimit/DailyTradeLimit";

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
        <FetchScenariosInBackground/>
        <Breadcrumbs/>
        <div className="m-3">
            <Suspense fallback={<div>Loading...</div>}>
                <div className='flex justify-between'>
                    <CreateScenarioModal/>
                    <DailyTradeLimit/>
                </div>
            </Suspense>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
            <ScenariosOverview/>
        </Suspense>
    </ContentLayout>
);

export default ScenariosPage;
