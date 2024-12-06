import {ScenarioSchema} from "@/schemas/types";

export interface ScenarioState {
    scenarios: ScenarioSchema[];

    setScenarios(scenarios: ScenarioSchema[]): void;

    addScenario(scenario: ScenarioSchema): void;
}