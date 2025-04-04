import {ContentLayout} from "@/components/Layout/ContentLayout";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {Link} from "react-router-dom";
import FullCalendar from "@/components/ui/full-calendar";


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
                <BreadcrumbPage>Calendar</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
);

const CalendarPage = () => (
    <ContentLayout title="Calendar">
        <Breadcrumbs/>
        <FullCalendar/>
    </ContentLayout>
);

export default CalendarPage;
