import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TProduct } from "../../Types";

type ProductsState = TProduct[];

const initialState: ProductsState = [];

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<TProduct[]>) {
            return action.payload;
        }
    },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
