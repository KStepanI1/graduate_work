import { ProductMedia } from "./../../../../entities/Product/model/types/Product";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductFormSchema } from "../types/ProductFormSchema";
import { ProductInfo } from "entities/Product";
import { createProduct } from "../services/createProduct";

const initialState: ProductFormSchema = {
    isLoading: false,
    name: "",
    price: "0",
    description: "",
    info: [],
    files: [],
    media: [],
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
        },
        setPrice: (state, action: PayloadAction<string>) => {
            state.price = action.payload;
        },
        setInfo: (state, action: PayloadAction<ProductInfo[]>) => {
            state.info = action.payload;
        },
        setFiles: (state, action: PayloadAction<File[]>) => {
            state.files = action.payload;
        },
        setMedia: (state, action: PayloadAction<ProductMedia[]>) => {
            state.media = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProduct.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(createProduct.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: productActions, reducer: productReducer } =
    productSlice;
