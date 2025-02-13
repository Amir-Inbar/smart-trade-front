import {useFetchAccountNumberQuery} from "../../store/api/accountApi.ts";
import {ContentLayout} from "../../components/Layout/ContentLayout.tsx";

const HomePage = () => {
    const {data: accountNumber} = useFetchAccountNumberQuery();

    return (
        <ContentLayout title="Home">
            <h1 className="text-2xl pb-2 font-bold">Overview</h1>
            <p className="text-sm pb-2 text-gray-500">
                Welcome back, <span className="font-bold">{accountNumber}</span>
            </p>
        </ContentLayout>
    );
};

export default HomePage;
