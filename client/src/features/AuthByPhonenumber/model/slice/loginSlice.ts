import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoginSchema } from "../types/LoginSchema";
import { loginByPhoneNumber } from "../services/loginByPhoneNumber/loginByPhoneNumber";

const initialState: LoginSchema = {
    isLoading: false,
    phoneNumber: "",
};

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setPhoneNumber: (state, action: PayloadAction<string>) => {
            state.phoneNumber = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByPhoneNumber.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(loginByPhoneNumber.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(loginByPhoneNumber.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: loginActions, reducer: loginReducer } = loginSlice;
