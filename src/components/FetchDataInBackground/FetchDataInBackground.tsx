"use client";

import { useEffect } from "react";
import useContractsStore from "@/store/actions/contract";
import useScenarioStore from "@/store/actions/trade";
import { useSearchContractsMutation } from "@/store/api/contractApi";
import { useSearchScenariosMutation } from "@/store/api/scenarioApi";

export const FetchDataInBackground = () => {
  const [searchContracts, { data: contractsData }] = useSearchContractsMutation();
  const [searchScenarios, { data: scenariosData }] = useSearchScenariosMutation();

  const setContracts = useContractsStore((state) => state.setContracts);
  const setScenarios = useScenarioStore((state) => state.setScenarios);

  const fetchContractsAndScenarios = async () => {
    try {
      const [contracts, scenarios] = await Promise.all([
        searchContracts({}).unwrap(),
        searchScenarios({}).unwrap()
      ]);
      setContracts(contracts);
      setScenarios(scenarios);
    } catch (error) {
      console.error("Failed to fetch contracts or scenarios:", error);
    }
  };

  useEffect(() => {
    if (!contractsData || !scenariosData) {
      fetchContractsAndScenarios();
    } else {
      setContracts(contractsData);
      setScenarios(scenariosData);
    }
  }, []);

  return null;
};
