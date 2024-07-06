'use client';

import Link from "next/link";

import {ContentLayout} from "@/components/Layout/ContentLayout";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Scenarios from "@/components/Scenarios/Scenarios";

const Breadcrumbs = () => (
    <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator/>
            <BreadcrumbItem>
                <BreadcrumbPage>Scenarios</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
);

const ScenariosPage = () => {
    return (
        <ContentLayout title="Scenarios">
            <Breadcrumbs/>
            <Scenarios/>
        </ContentLayout>
    );
}

export default ScenariosPage;