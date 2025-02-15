import {useState} from "react";
import {DialogWrapper} from "@/components/DialogWrapper/DialogWrapper";
import CreateScenarioForm from "@/components/Scenarios/CreateScenarioModal/CreateScenarioForm";
import useContractsStore from "@/store/actions/contract";
import useScenarioStore from "@/store/actions/scenario";
import {ScenarioSchema} from "@/schemas/types";
import {ScenarioState} from "@/store/@types/scenario";

const CreateScenarioModal = () => {
    const addScenarios = useScenarioStore((state:ScenarioState) => state.addScenario);
    const [isCreateScenarioModalOpen, setIsCreateScenarioModalOpen] = useState(false);

    const onToggleCreateScenarioModal = () => {
        setIsCreateScenarioModalOpen(!isCreateScenarioModalOpen);
    };

    const onAddScenario = (scenario: ScenarioSchema) => {
        try {
            addScenarios(scenario);
        } catch (e) { /* empty */
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

export default CreateScenarioModal;