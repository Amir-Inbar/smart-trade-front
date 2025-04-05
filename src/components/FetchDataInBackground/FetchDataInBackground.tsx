import {useEffect} from "react";
import {useSearchContractsMutation} from "@/store/api/contractApi";
import {useSearchScenariosMutation} from "@/store/api/scenarioApi";
import {useSearchTradesMutation} from "@/store/api/tradeApi";
import useContractsStore from "@/store/actions/contract";
import useScenarioStore from "@/store/actions/scenario";
import useTradeStore from "@/store/actions/trade";
import {ScenarioState} from "@/store/@types/scenario";
import {TradeState} from "@/store/@types/trade";
import {useSearchDailyTradeEventsMutation} from "@/store/api/dailyTradeEventsApi";
import useDailyTradeEventsStore from "@/store/actions/dailyTradeEvents";
import {DailyTradeEventsState} from "@/store/@types/dailyTradeEvents";
import {convertToIsraelTime} from "@/utils/date.util";

export const FetchDataInBackground = () => {
    const [searchContracts, {data: contractsData}] = useSearchContractsMutation();
    const [searchScenarios, {data: scenariosData}] = useSearchScenariosMutation();
    const [searchTrades, {data: tradesData}] = useSearchTradesMutation();
    const [searchEvents, {data: events}] = useSearchDailyTradeEventsMutation();
    const setContracts = useContractsStore((state) => state.setContracts);
    const setScenarios = useScenarioStore((state: ScenarioState) => state.setScenarios);
    const setTrades = useTradeStore((state: TradeState) => state.setTrades);
    const setEvents = useDailyTradeEventsStore((state: DailyTradeEventsState) => state.setDailyTradeEvents);


    const fetchContractsAndScenarios = async () => {
        try {
            const [contracts, scenarios, trades, events] = await Promise.all([
                searchContracts({}).unwrap(),
                searchScenarios({}).unwrap(),
                searchTrades({}).unwrap(),
                searchEvents({}).unwrap(),
            ]);

            setContracts(contracts);
            setScenarios(scenarios);
            setTrades(trades);

            const convertedEvents = events.map(event => ({
                ...event,
                start_date: convertToIsraelTime(event.start_date),
                end_date: convertToIsraelTime(event.end_date),
            }));
            setEvents(convertedEvents);
        } catch (error) {
            // Handle error if needed
        }
    };


    useEffect(() => {
        if (!contractsData || !scenariosData || !tradesData || !events) {
            fetchContractsAndScenarios();
        } else {
            setContracts(contractsData);
            setScenarios(scenariosData);
            setTrades(tradesData);
            setEvents(events);
        }
    }, []);

    return null;
};
