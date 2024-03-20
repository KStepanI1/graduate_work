import { $api } from "shared/api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { userActions } from "../../slice/userSlice";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localStorage";

export const logout = createAsyncThunk<null, void, { rejectValue: string }>(
    "user/logout",
    async (_, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI;
        try {
            const response = await $api.post("/auth/logout");

            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
            dispatch(userActions.setAuthData(undefined));

            return response.data;
        } catch (e) {
            return rejectWithValue(
                e.response.data.message ?? "Произошла ошибка"
            );
        }
    }
);
