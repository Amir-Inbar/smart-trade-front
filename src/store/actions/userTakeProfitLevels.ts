import {create} from 'zustand';
import {UserTPDefaultsState} from '../@types/userTakeProfitLevels';

const useUserTakeProfitLevelsStore = create<UserTPDefaultsState>((set) => ({
    items: [],
    setItems: (items) => set({items}),
    addItem: (item) => set((s) => ({items: [...s.items, item]})),
    updateItem: (item) =>
        set((s) => ({
            items: s.items.map((x) => (x.id === item.id ? {...x, ...item} : x)),
        })),
    removeItem: (id) =>
        set((s) => ({items: s.items.filter((x) => x.id !== id)})),
    clear: () => set({items: []}),
}));

export default useUserTakeProfitLevelsStore;
