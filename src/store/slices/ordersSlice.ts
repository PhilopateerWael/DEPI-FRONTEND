import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TOrderProduct = {
    productId: string;
    name: string;
    description?: string;
    price: number;
    img: string;
    quantity: number;
};

export type TOrder = {
    _id: string;
    userId: string;
    products: TOrderProduct[];
    totalPrice: number;
    status: "pending" | "canceled" | "completed";
    payUrl: string;
    sessionId: string;
    createdAt: string;
    updatedAt: string;
};

const initialState : TOrder[] = []
const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setOrders(_state, action: PayloadAction<TOrder[]>) {
            return action.payload;
        },
    },
});

export const { setOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
