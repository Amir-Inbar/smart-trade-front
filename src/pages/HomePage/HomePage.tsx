import {ContentLayout} from "../../components/Layout/ContentLayout";

const HomePage = () => {

    return (
        <ContentLayout title="Home">
            <h1 className="text-2xl pb-2 font-bold">Overview</h1>
            <p className="text-sm pb-2 text-gray-500">
                Welcome back!
            </p>
        </ContentLayout>
    );
};

export default HomePage;
