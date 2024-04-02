import { EnhancedStore } from "@reduxjs/toolkit";
import { UserSchema } from "entities/User";
import { LoginSchema } from "features/AuthByEmail";
import { createReducerManager } from "./reducerManager";
import { AxiosInstance } from "axios";
import { ProductFormSchema } from "features/CreateNewProduct/model/types/ProductFormSchema";
import { CartSchema } from "entities/Cart";
// import { NavigateOptions, To } from "react-router-dom";

export interface StateSchema {
    user: UserSchema;
    cart: CartSchema;
    loginForm?: LoginSchema;
    productForm?: ProductFormSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReturnType<typeof createReducerManager>;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
    // navigate?: (to: To, options?: NavigateOptions) => void,
}
