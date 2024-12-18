import {create} from 'zustand'
import {ScenarioState} from "@/store/@types/scenario";


const useScenarioStore = create<ScenarioState>((set) => ({
    scenarios: [],
    setScenarios: (scenarios) => set({scenarios}),
    addScenario: (scenario) => set((state) => ({scenarios: [...state.scenarios, scenario]})),
}))

export default useScenarioStore
