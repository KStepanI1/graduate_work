import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";

export const getLoginEmail = (state: StateSchema) => {
    return state?.loginForm?.email ?? "";
};
