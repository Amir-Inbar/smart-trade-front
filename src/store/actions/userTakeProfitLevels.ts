import {create} from 'zustand';
import {UserTPDefaultsState} from '../@types/userTakeProfitLevels';

const useUserTakeProfitLevelsStore = create<UserTPDefaultsState>((set) => ({
    userTakeProfitLevels: [],
    setUserTakeProfitLevels: (levels) =>
        set(() => ({userTakeProfitLevels: levels})),
    addUserTakeProfitLevel: (level) =>
        set((state) => ({userTakeProfitLevels: [...state.userTakeProfitLevels, level]})),
    updateUserTakeProfitLevel: (level) =>
        set((state) => ({
            userTakeProfitLevels: state.userTakeProfitLevels.map((l) =>
                l.id === level.id ? level : l
            ),
        })),
    removeUserTakeProfitLevel: (id) =>
        set((state) => ({
            userTakeProfitLevels: state.userTakeProfitLevels.filter((l) => l.id !== id),
        })),
}))


export default useUserTakeProfitLevelsStore;
