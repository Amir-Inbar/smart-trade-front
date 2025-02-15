import {create} from 'zustand'
import {ScenarioState} from "../@types/scenario";
import {ScenarioSchema} from "@/schemas/types";


const useScenarioStore = create<ScenarioState>((set) => ({
    scenarios: [],
    setScenarios: (scenarios: ScenarioSchema[]) => set({scenarios}),
    addScenario: (scenario: ScenarioSchema) => set((state) => ({scenarios: [...state.scenarios, scenario]})),
}))

export default useScenarioStore
