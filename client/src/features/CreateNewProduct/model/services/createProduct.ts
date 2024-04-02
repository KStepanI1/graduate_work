import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductFormSchema } from "../types/ProductFormSchema";
import { AppDispatch } from "app/providers/StoreProvider";
import { productApi } from "shared/api/ProductApi";
import { ProductCreateResponse } from "../types/ProductCreateResponse";

export const createProduct = createAsyncThunk<
    ProductCreateResponse,
    ProductFormSchema,
    { rejectValue: string; dispatch: AppDispatch }
>("login/loginByPhoneNumber", async (product, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const formData = new FormData();

        Object.entries(product).map(([key, value]) =>
            key === "files"
                ? (value as Array<File>).forEach((img) =>
                      formData.append("media", img)
                  )
                : formData.append(key, value as string)
        );

        const response = await productApi.create(formData);
        await productApi.create(formData);
        await productApi.create(formData);
        await productApi.create(formData);
        await productApi.create(formData);
        await productApi.create(formData);
        await productApi.create(formData);
        await productApi.create(formData);
        await productApi.create(formData);
        await productApi.create(formData);
        await productApi.create(formData);
        await productApi.create(formData);
        await productApi.create(formData);
        await productApi.create(formData);
        await productApi.create(formData);
        await productApi.create(formData);
        await productApi.create(formData);
        await productApi.create(formData);
        await productApi.create(formData);
        await productApi.create(formData);

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(
            e.response.data.message ?? "Неудалось создать товар"
        );
    }
});
