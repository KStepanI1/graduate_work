// import { $api } from "shared/api/api";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { AuthData } from "features/AuthByPhonenumber";

// export const fetchProfileData = createAsyncThunk<

// >("profile/fetchProfileData", async (_, thunkAPI) => {
//     const { rejectWithValue, dispatch } = thunkAPI;
//     try {
//         const response = await $api.get<AuthData>(`/profile`);

//         if (!response.data) {
//             throw new Error();
//         }

//     } catch (e) {
//         return rejectWithValue(e.response.data.message ?? "Произошла ошибка");
//     }
// });

export {};
