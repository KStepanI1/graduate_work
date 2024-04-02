import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserSchema } from "../types/User";
import { AuthData } from "features/AuthByEmail";

const initialState: UserSchema = {
    _mounted: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<AuthData>) => {
            state.authData = action.payload;
        },
        setMounted: (state, action: PayloadAction<boolean>) => {
            state._mounted = action.payload;
        },
    },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
