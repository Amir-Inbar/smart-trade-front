"use client";

import { DialogWrapper } from "@/components/DialogWrapper/DialogWrapper";
import CreateScenarioForm from "@/components/Scenarios/CreateScenarioModal/CreateScenarioForm";
import useContractsStore from "@/store/actions/contract";
import { useState } from "react";

export const CreateScenarioModal = () => {

  const [isCreateScenarioModalOpen, setIsCreateScenarioModalOpen] = useState(false);

  const onCloseCreateScenarioModal = () => {
    setIsCreateScenarioModalOpen(false);
  };

  const onOpenCreateScenarioModal = () => {
    setIsCreateScenarioModalOpen(true);
  };

  const contracts = useContractsStore((state) => state.contracts);
  return (
    <DialogWrapper
      title="Create Scenario"
      description="The bracket order is a complex order type that allows you to set a stop loss and take profit
                        order at the same time."
      openDialogText="Create Scenario"
      open={isCreateScenarioModalOpen}
      onOpenModal={onOpenCreateScenarioModal}
    >
      <CreateScenarioForm
        contracts={contracts}
        onCloseCreateScenarioModal={onCloseCreateScenarioModal}
      />
    </DialogWrapper>
  );
};