import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './slices/cartSlice'
import authSlice from "./slices/authSlice"
import productsSlice from "./slices/productsSlice";
import favoritesSlice from "./slices/favoritesSlice";
import ordersSlice from "./slices/ordersSlice";
import searchSlice from "./slices/searchSlice"

const Store = configureStore({
    reducer: {
        cart: cartSlice,
        auth: authSlice,
        products: productsSlice,
        favorites: favoritesSlice,
        orders: ordersSlice,
        search : searchSlice
    }
})

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export default Store