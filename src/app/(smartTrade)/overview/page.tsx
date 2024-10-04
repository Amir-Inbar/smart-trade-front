'use client';

import Link from "next/link";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {ContentLayout} from "@/components/Layout/ContentLayout";

interface OverviewCardProps {
    title: string;
    description: string;
    link: string;
}

// A simple overview card component
const OverviewCard = ({title, description, link}: OverviewCardProps) => (
    <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link href={link} className="text-blue-600 hover:underline">
            Learn More →
        </Link>
    </div>
);

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
                <BreadcrumbPage>Overview</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
);

const OverviewPage = () => (
    <ContentLayout title="Overview">
        <Breadcrumbs/>
        <section className="my-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <OverviewCard
                title="Trades"
                description="Explore recent trades and market trends. Get detailed insights and analysis."
                link="/trades"
            />
            <OverviewCard
                title="CreateScenarioForm"
                description="Manage and simulate different scenarios for better decision making."
                link="/scenario"
            />
            <OverviewCard
                title="Reports"
                description="View comprehensive reports that track key performance metrics."
                link="/reports"
            />
        </section>
    </ContentLayout>
)

export default OverviewPage;
