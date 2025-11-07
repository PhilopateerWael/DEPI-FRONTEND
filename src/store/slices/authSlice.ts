// src/store/authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TUser } from "../../Types";

export type AuthState = {
    user: TUser | null;
    loading: boolean;
};

const initialState: AuthState = {
    user: null,
    loading: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        auth(state, action: PayloadAction<TUser>) {
            state.user = action.payload
            state.loading = false
        },
        notAuth(state) {
            state.user = null
            state.loading = false
        },
    },
});

export const {
    auth, notAuth,
} = authSlice.actions;

export default authSlice.reducer;
