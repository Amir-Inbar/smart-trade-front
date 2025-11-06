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
import useUserStore from "@/store/actions/user";
import {useSearchUsersMutation} from "@/store/api/userApi";

export const FetchDataInBackground = () => {
    const [searchContracts, {data: contractsData}] = useSearchContractsMutation();
    const [searchScenarios, {data: scenariosData}] = useSearchScenariosMutation();
    const [searchTrades, {data: tradesData}] = useSearchTradesMutation();
    const [searchEvents, {data: events}] = useSearchDailyTradeEventsMutation();
    const [searchUsers, {data: users}] = useSearchUsersMutation();

    const setContracts = useContractsStore((state) => state.setContracts);
    const setScenarios = useScenarioStore((state: ScenarioState) => state.setScenarios);
    const setTrades = useTradeStore((state: TradeState) => state.setTrades);
    const setEvents = useDailyTradeEventsStore((state: DailyTradeEventsState) => state.setDailyTradeEvents);
    const setUsers = useUserStore((state) => state.setUsers);

    const fetchContractsAndScenarios = async () => {
        try {
            const [contracts, scenarios, trades, events, users] = await Promise.all([
                searchContracts({}).unwrap(),
                searchScenarios({}).unwrap(),
                searchTrades({}).unwrap(),
                searchEvents({}).unwrap(),
                searchUsers({}).unwrap(),
            ]);

            setContracts(contracts);
            setScenarios(scenarios);
            setTrades(trades);
            setUsers(users)

            const convertedEvents = events.map(event => ({
                ...event,
                start_date: convertToIsraelTime(event.start_date).toString(),
                end_date: convertToIsraelTime(event.end_date).toString(),
            }));
            setEvents(convertedEvents);
        } catch (error) {
            // Handle error if needed
        }
    };


    useEffect(() => {
        if (!contractsData || !scenariosData || !tradesData || !events || !users) {
            fetchContractsAndScenarios();
        } else {
            setContracts(contractsData);
            setScenarios(scenariosData);
            setTrades(tradesData);
            setEvents(events);
            setUsers(users)
        }
    }, []);

    return null;
};
