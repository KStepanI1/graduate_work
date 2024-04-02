import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartSchema, CartSchemaCart } from "../types/CartSchema";

const initialState: CartSchema = {
    cart: { products: [], totalQty: 0 },
    isLoading: false,
    error: "",
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<CartSchemaCart | undefined>) => {
            state.cart = action.payload;
        },
    },
});

export const { actions: cartActions, reducer: cartReducer } = cartSlice;
