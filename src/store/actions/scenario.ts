import {create} from 'zustand'
import {ScenarioState} from "../@types/scenario";
import {ScenarioSchema} from "@/schemas/types";


const useScenarioStore = create<ScenarioState>((set) => ({
    scenarios: [],
    setScenarios: (scenarios: ScenarioSchema[]) => set({scenarios}),
    addScenario: (scenario: ScenarioSchema) => set((state) => ({scenarios: [...state.scenarios, scenario]})),
    updateScenarioInList: (scenario: ScenarioSchema) =>
        set((state) => ({
            scenarios: state.scenarios.map((s) => (s.id === scenario.id ? scenario : s)),
        })),
}))

export default useScenarioStore
