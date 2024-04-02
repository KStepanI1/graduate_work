import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "app/providers/StoreProvider";
import { cartApi } from "shared/api/CartApi";
import { cartActions } from "../slice/cartSlice";
import { CartSchemaCart } from "../types/CartSchema";
import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";
import { CART_LOCALSTORAGE_KEY } from "shared/const/localStorage";

export const addProductToCart = createAsyncThunk<
    CartSchemaCart,
    string | number,
    { rejectValue: string; dispatch: AppDispatch; state: StateSchema }
>("cart/addProduct", async (productId, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
        const authData = thunkAPI.getState()?.user.authData;

        if (authData) {
            const response = await cartApi.add(productId);

            if (!response.data) {
                throw new Error();
            }

            dispatch(cartActions.setCart(response.data));

            return response.data;
        } else {
            const cartStorage = localStorage.getItem(CART_LOCALSTORAGE_KEY);
            let cart: CartSchemaCart = JSON.parse(cartStorage);

            if (
                !cartStorage ||
                !Array.isArray(cart.products) ||
                (cart.totalQty !== 0 && !Number(cart.totalQty))
            ) {
                cart = { totalQty: 0, products: [] };
            }

            const cartProduct = cart.products.find(
                (prod) => prod.id === productId
            );

            if (!cartProduct) {
                cart.products.push({ id: +productId, qty: 1 });
                cart.totalQty += 1;
            } else {
                cartProduct.qty += 1;
                cart.totalQty += 1;
            }

            dispatch(cartActions.setCart(cart));
            localStorage.setItem(CART_LOCALSTORAGE_KEY, JSON.stringify(cart));

            return cart;
        }
    } catch (e) {
        return rejectWithValue(e.response.data.message ?? "Произошла ошибка");
    }
});
