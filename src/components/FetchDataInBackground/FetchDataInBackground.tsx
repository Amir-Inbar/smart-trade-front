import {useEffect} from "react";
import {useSearchContractsMutation} from "../../store/api/contractApi.ts";
import {useSearchScenariosMutation} from "../../store/api/scenarioApi.ts";
import {useSearchTradesMutation} from "../../store/api/tradeApi.ts";
import useContractsStore from "../../store/actions/contract.ts";
import useScenarioStore from "../../store/actions/scenario.ts";
import useTradeStore from "../../store/actions/trade.ts";


export const FetchDataInBackground = () => {
    const [searchContracts, {data: contractsData}] = useSearchContractsMutation();
    const [searchScenarios, {data: scenariosData}] = useSearchScenariosMutation();
    const [searchTrades, {data: tradesData}] = useSearchTradesMutation();

    const setContracts = useContractsStore((state) => state.setContracts);
    const setScenarios = useScenarioStore((state) => state.setScenarios);
    const setTrades = useTradeStore((state) => state.setTrades);

    const fetchContractsAndScenarios = async () => {
        try {
            const [contracts, scenarios, trades] = await Promise.all([
                searchContracts({}).unwrap(),
                searchScenarios({}).unwrap(),
                searchTrades({}).unwrap()
            ]);
            setContracts(contracts);
            setScenarios(scenarios);
            setTrades(trades);
        } catch (error) { /* empty */
        }
    };

    useEffect(() => {
        if (!contractsData || !scenariosData || !tradesData) {
            fetchContractsAndScenarios();
        } else {
            setContracts(contractsData);
            setScenarios(scenariosData);
            setTrades(tradesData);
        }
    }, []);

    return null;
};
