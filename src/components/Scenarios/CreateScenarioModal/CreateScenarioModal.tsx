import {useState} from "react";
import {DialogWrapper} from "@/components/DialogWrapper/DialogWrapper";
import CreateScenarioForm from "@/components/Scenarios/CreateScenarioModal/CreateScenarioForm";
import useContractsStore from "@/store/actions/contract";
import useScenarioStore from "@/store/actions/scenario";
import {ScenarioSchema} from "@/schemas/types";
import {ScenarioState} from "@/store/@types/scenario";
import {UserState} from "@/store/@types/user";
import useUserStore from "@/store/actions/user";

const CreateScenarioModal = () => {
    const addScenarios = useScenarioStore((state: ScenarioState) => state.addScenario);
    const users = useUserStore((state: UserState) => state.users);
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
            openDialogText="Create Scenario"
            open={isCreateScenarioModalOpen}
            onOpenChange={onToggleCreateScenarioModal}
        >
            <CreateScenarioForm
                contracts={contracts}
                onCloseCreateScenarioModal={onToggleCreateScenarioModal}
                onAddScenario={onAddScenario}
                users={users}
            />
        </DialogWrapper>
    );
};

export default CreateScenarioModal;