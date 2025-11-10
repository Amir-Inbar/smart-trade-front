import {UserTPLevelDefaultSchema} from "@/schemas/types";


export interface UserTPDefaultsState {
    userTakeProfitLevels: UserTPLevelDefaultSchema[];

    setUserTakeProfitLevels(levels: UserTPLevelDefaultSchema[]): void;

    addUserTakeProfitLevel(level: UserTPLevelDefaultSchema): void;

    updateUserTakeProfitLevel(level: UserTPLevelDefaultSchema): void;

    removeUserTakeProfitLevel(id: string): void;
}