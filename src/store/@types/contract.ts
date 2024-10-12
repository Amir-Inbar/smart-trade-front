import { ContractSchema } from "@/schemas/types";

export interface ContractState {
  contracts: ContractSchema[];

  setContracts(contracts: ContractSchema[]): void;

  addContract(contract: ContractSchema): void;
}
