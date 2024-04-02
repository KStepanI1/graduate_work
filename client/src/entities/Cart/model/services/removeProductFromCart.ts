import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "app/providers/StoreProvider";
import { cartApi } from "shared/api/CartApi";
import { cartActions } from "../slice/cartSlice";
import { CartSchemaCart } from "../types/CartSchema";
import { CART_LOCALSTORAGE_KEY } from "shared/const/localStorage";
import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";

export const removeProductFromCart = createAsyncThunk<
    CartSchemaCart,
    string | number,
    { rejectValue: string; dispatch: AppDispatch; state: StateSchema }
>("cart/removeProduct", async (productId, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
        const authData = thunkAPI.getState()?.user.authData;

        if (authData) {
            const response = await cartApi.delete(productId);

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

            if (cartProduct && cartProduct.qty <= 1) {
                cart.products = cart.products.filter(
                    (prod) => prod.id !== +productId
                );
                cart.totalQty -= 1;
            } else if (cartProduct) {
                cartProduct.qty -= 1;
                cart.totalQty -= 1;
            }

            dispatch(cartActions.setCart(cart));
            localStorage.setItem(CART_LOCALSTORAGE_KEY, JSON.stringify(cart));

            return cart;
        }
    } catch (e) {
        return rejectWithValue(e.response.data.message ?? "Произошла ошибка");
    }
});
