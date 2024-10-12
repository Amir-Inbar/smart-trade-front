import { create } from "zustand";
import { ContractState } from "../@types/contract";

const useContractsStore = create<ContractState>((set) => ({
  contracts: [],
  setContracts: (contracts) => set({ contracts }),
  addContract: (contract) =>
    set((state) => ({
      contracts: [...state.contracts, contract]
    }))
}));

export default useContractsStore;
