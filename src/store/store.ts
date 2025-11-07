import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './slices/cartSlice'
import authSlice from "./slices/authSlice"
import productsSlice from "./slices/productsSlice";
import favoritesSlice from "./slices/favoritesSlice";

const Store = configureStore({
    reducer: {
        cart: cartSlice,
        auth: authSlice,
        products: productsSlice,
        favorites: favoritesSlice
    }
})

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export default Store