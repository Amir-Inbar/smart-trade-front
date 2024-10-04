'use client';

import {DialogWrapper} from "@/components/DialogWrapper/DialogWrapper";
import CreateScenarioForm from "@/components/Scenarios/CreateScenarioModal/CreateScenarioForm";

export const CreateScenarioModal = () => (
    <DialogWrapper
        title="Create Scenario"
        description="The bracket order is a complex order type that allows you to set a stop loss and take profit
                        order at the same time."
        openDialogText="Create Scenario"
    >
        <CreateScenarioForm/>
    </DialogWrapper>
)