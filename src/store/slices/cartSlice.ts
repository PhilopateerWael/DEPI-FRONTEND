import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TCart, TCartEntry } from "../../Types";

const initialState: TCart = [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct(state, action) {
            const { productId, quantity } = action.payload as TCartEntry;
            const found = state.find((p) => p.productId === productId);

            if (found) {
                found.quantity = quantity;
            } else {
                state.push({ productId, quantity });
            }

            localStorage.setItem("cart", JSON.stringify(state));
            return state;
        },

        removeProduct(state, action) {
            state = state.filter((p) => p.productId !== action.payload.productId);
            localStorage.setItem("cart", JSON.stringify(state));
            return state;
        },

        incQuantity(state, action) {
            const found = state.find((p) => p.productId === action.payload.productId);
            if (found) found.quantity++;
            localStorage.setItem("cart", JSON.stringify(state));
            return state;
        },

        decQuantity(state, action) {
            const found = state.find((p) => p.productId === action.payload.productId);
            if (!found) return;

            if (found.quantity > 1) {
                found.quantity--;
            } else {
                state = state.filter((p) => p.productId !== action.payload.productId);
            }
            localStorage.setItem("cart", JSON.stringify(state));
            return state
        },

        clearCart(state) {
            state = [] as TCart;
            localStorage.setItem("cart", JSON.stringify(state));
            return state;
        },

        setCart(state, action: PayloadAction<{ cart: TCart }>) {
            const safe = action.payload.cart.filter(x => {
                return typeof x.productId === 'string' && typeof x.quantity === 'number' && x.quantity > 0;
            });
            state = safe;
            localStorage.setItem("cart", JSON.stringify(state));
            return state;
        }
    },
});

export const {
    addProduct,
    removeProduct,
    clearCart,
    decQuantity,
    incQuantity,
    setCart
} = cartSlice.actions;

export default cartSlice.reducer;
