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
import UsersTable from "@/components/UsersTable/UsersTable";


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
                <BreadcrumbPage>Users</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
);

const UsersPage = () => (
    <ContentLayout title="Users">
        <Breadcrumbs/>
        <UsersTable/>
    </ContentLayout>
);

export default UsersPage;
