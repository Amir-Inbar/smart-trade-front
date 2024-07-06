import {useFetchAccountSummaryQuery} from "@/store/api/accountApi";
import {SmartTable} from "@/components/SmartTable/SmartTable";
import {accountSummaryColumns, formattedData} from "@/components/AccountSummary/AccountSummary.util";
import {MRT_ColumnDef} from "mantine-react-table";
import {useMemo} from "react";

const AccountSummary = () => {
    const {data: accountsData, isLoading} = useFetchAccountSummaryQuery();

    const data = useMemo(() => Object.values(formattedData(accountsData)), [accountsData]);
    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => accountSummaryColumns,
        []
    );

    return (
        <SmartTable className='w-1/2' columns={columns} data={data}/>
    )
}

export default AccountSummary;