"use client";

import { DialogWrapper } from "@/components/DialogWrapper/DialogWrapper";
import CreateScenarioForm from "@/components/Scenarios/CreateScenarioModal/CreateScenarioForm";
import useContractsStore from "@/store/actions/contract";
import { useState } from "react";
import useScenarioStore from "@/store/actions/trade";
import { ScenarioSchema } from "@/schemas/types";

export const CreateScenarioModal = () => {
  const addScenarios = useScenarioStore((state) => state.addScenario);

  const [isCreateScenarioModalOpen, setIsCreateScenarioModalOpen] = useState(false);


  const onToggleCreateScenarioModal = () => {
    console.log('dsadsa');
    setIsCreateScenarioModalOpen(!isCreateScenarioModalOpen);
  };

  const onAddScenario = (scenario: ScenarioSchema) => {
    try {
      addScenarios(scenario);
    } catch (e) {
      console.error(e);
    }
  };

  const contracts = useContractsStore((state) => state.contracts);
  return (
    <DialogWrapper
      title="Create Scenario"
      description="The bracket order is a complex order type that allows you to set a stop loss and take profit
                        order at the same time."
      openDialogText="Create Scenario"
      open={isCreateScenarioModalOpen}
      onOpenChange={onToggleCreateScenarioModal}
    >
      <CreateScenarioForm
        contracts={contracts}
        onCloseCreateScenarioModal={onToggleCreateScenarioModal}
        onAddScenario={onAddScenario}
      />
    </DialogWrapper>
  );
};