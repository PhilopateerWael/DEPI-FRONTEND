import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = Array<string>()

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        setFavorites(state, action: PayloadAction<string[]>) {
            state = action.payload
            return state
        },
        addFavorite(state, action: PayloadAction<string>) {
            state.push(action.payload)
            localStorage.setItem("wishlist", JSON.stringify(state))
            return state
        },
        removeFavorite(state, action: PayloadAction<string>) {
            state = state.filter(item => item !== action.payload)
            localStorage.setItem("wishlist", JSON.stringify(state))
            return state
        }
    },
});

export const {
    setFavorites,
    addFavorite,
    removeFavorite,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
