import {OrderSchema} from "@/schemas/types";

export interface OrderState {
    orders: OrderSchema[];
    setOrders: (orders: OrderSchema[]) => void;
    addOrder: (order: OrderSchema) => void;
}