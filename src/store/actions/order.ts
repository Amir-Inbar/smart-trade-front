import { create } from "zustand";
import { OrderState } from "@/store/@types/order";
import { OrderSchema } from "@/schemas/types";


const useOrdersStore = create<OrderState>((set) => ({
  orders: [],
  setOrders: (orders: OrderSchema[]) => set({ orders }),
  addOrder: (order: OrderSchema) => set((state) => ({
    orders: [...state.orders, order]
  }))
}));

export default useOrdersStore;
