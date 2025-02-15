import {useEffect} from "react";
import {useSearchContractsMutation} from "@/store/api/contractApi";
import {useSearchScenariosMutation} from "@/store/api/scenarioApi";
import {useSearchTradesMutation} from "@/store/api/tradeApi";
import useContractsStore from "@/store/actions/contract";
import useScenarioStore from "@/store/actions/scenario";
import useTradeStore from "@/store/actions/trade";
import {ScenarioState} from "@/store/@types/scenario";
import {TradeState} from "@/store/@types/trade";

export const FetchDataInBackground = () => {
    const [searchContracts, {data: contractsData}] = useSearchContractsMutation();
    const [searchScenarios, {data: scenariosData}] = useSearchScenariosMutation();
    const [searchTrades, {data: tradesData}] = useSearchTradesMutation();

    const setContracts = useContractsStore((state) => state.setContracts);
    const setScenarios = useScenarioStore((state: ScenarioState) => state.setScenarios);
    const setTrades = useTradeStore((state: TradeState) => state.setTrades);

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
