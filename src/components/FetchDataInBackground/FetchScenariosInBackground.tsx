import {useSearchScenariosMutation} from "@/store/api/scenarioApi";
import useScenarioStore from "@/store/actions/scenario";
import {ScenarioState} from "@/store/@types/scenario";
import {useEffect} from "react";

const FETCH_INTERVAL_MINUTES = 1;
const FETCH_INTERVAL_MS = FETCH_INTERVAL_MINUTES * 60 * 1000;

export const FetchScenariosInBackground = () => {
    const [searchScenarios] = useSearchScenariosMutation();
    const setScenarios = useScenarioStore((state: ScenarioState) => state.setScenarios);

    const fetchContractsAndScenarios = async () => {
        try {
            const scenarios = await searchScenarios({}).unwrap();
            setScenarios(scenarios);
        } catch (error) {
            console.error("Error fetching scenarios:", error);
        }
    };

    useEffect(() => {
        fetchContractsAndScenarios();

        const intervalId = setInterval(fetchContractsAndScenarios, FETCH_INTERVAL_MS);

        return () => clearInterval(intervalId);
    }, []);

    return null;
};
