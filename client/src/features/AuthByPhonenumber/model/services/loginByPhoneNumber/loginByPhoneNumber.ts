import { createAsyncThunk } from "@reduxjs/toolkit";
import { userActions } from "entities/User";
import { $api } from "shared/api/api";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localStorage";
import { AuthData } from "../../types/AuthData";
import { AppDispatch } from "app/providers/StoreProvider";

export const loginByPhoneNumber = createAsyncThunk<
    AuthData,
    string,
    { rejectValue: string; dispatch: AppDispatch }
>("login/loginByPhoneNumber", async (phoneNumber, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
        const response = await $api.post<AuthData>("/auth/login", {
            phoneNumber,
        });

        if (!response.data) {
            throw new Error();
        }

        const { accessToken } = response.data;

        localStorage.setItem(USER_LOCALSTORAGE_KEY, accessToken);
        dispatch(userActions.setAuthData(response.data));

        return response.data;
    } catch (e) {
        return rejectWithValue(e.response.data.message ?? "Произошла ошибка");
    }
});
