import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "app/providers/StoreProvider";
import { cartApi } from "shared/api/CartApi";
import { cartActions } from "../slice/cartSlice";
import { CartSchemaCart } from "../types/CartSchema";
import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";
import { CART_LOCALSTORAGE_KEY } from "shared/const/localStorage";

export const initCart = createAsyncThunk<
    CartSchemaCart,
    void,
    { rejectValue: string; dispatch: AppDispatch; state: StateSchema }
>("cart/init", async (a, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
        const authData = thunkAPI.getState()?.user.authData;

        if (authData) {
            const response = await cartApi.init();

            if (!response.data) {
                throw new Error();
            }

            dispatch(cartActions.setCart(response.data));

            return response.data;
        } else {
            const cartStorage = localStorage.getItem(CART_LOCALSTORAGE_KEY);
            let cart: CartSchemaCart = cartStorage
                ? JSON.parse(cartStorage)
                : null;

            if (
                !cart ||
                !Array.isArray(cart.products) ||
                (cart.totalQty !== 0 && !Number(cart.totalQty))
            ) {
                cart = { totalQty: 0, products: [] };
            }

            dispatch(cartActions.setCart(cart));
            localStorage.setItem(CART_LOCALSTORAGE_KEY, JSON.stringify(cart));

            return cart;
        }
    } catch (e) {
        return rejectWithValue(e.response.data.message ?? "Произошла ошибка");
    }
});
