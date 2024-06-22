'use client'

import Link from "next/link";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {SmartTable} from "@/components/SmartTable/SmartTable";
import {ContentLayout} from "@/components/Layout/ContentLayout";

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
                <BreadcrumbPage>Orders</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
);

const OrdersPage = () => {
    console.log("OrdersPage");
    return (
        <ContentLayout title="Orders">
            <Breadcrumbs/>
            {/*<SmartTable />*/}
        </ContentLayout>
    );
};

export default OrdersPage;
