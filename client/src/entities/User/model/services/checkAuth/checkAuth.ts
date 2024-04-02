import { $api } from "shared/api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { userActions } from "entities/User";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localStorage";
import { AuthData } from "features/AuthByEmail";

export const cehckAuth = createAsyncThunk<
    AuthData,
    void,
    { rejectValue: string }
>("user/cehckAuth", async (_, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
        const response = await $api
            .get<AuthData>(`/auth/refresh`)
            .finally(() => dispatch(userActions.setMounted(true)));

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
