import {SmartTable} from "@/components/SmartTable/SmartTable";
import {MRT_ColumnDef} from "mantine-react-table";
import {useEffect, useMemo} from "react";
import {getScenarioColumns, OrderDataInitialState} from "./OrderOverview.util";
import {ScenarioSchema} from "@/schemas/types";
import useScenarioStore from "@/store/actions/trade";
import {useFetchScenariosQuery} from "@/store/api/scenarioApi";

const OrderOverview = () => {
    const {data: fetchScenarios, isSuccess} = useFetchScenariosQuery();
    const {setScenarios, scenarios} = useScenarioStore();


    useEffect(() => {
        if (isSuccess) {
            setScenarios(fetchScenarios || []);
        }
    }, [fetchScenarios, isSuccess, setScenarios]);

    const columns = useMemo<MRT_ColumnDef<ScenarioSchema>[]>(() => getScenarioColumns(), []);

    return (
        <SmartTable
            className="w-full"
            columns={columns}
            data={scenarios || []}
            config={OrderDataInitialState}
        />
    );
};

export default OrderOverview;
