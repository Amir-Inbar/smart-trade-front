import {UserTPLevelDefaultSchema} from "@/schemas/types";


export interface UserTPDefaultsState {
    items: UserTPLevelDefaultSchema[];

    setItems: (items: UserTPLevelDefaultSchema[]) => void;

    addItem: (item: UserTPLevelDefaultSchema) => void;

    updateItem: (item: UserTPLevelDefaultSchema) => void;

    removeItem: (id: string) => void;

    clear: () => void;
}