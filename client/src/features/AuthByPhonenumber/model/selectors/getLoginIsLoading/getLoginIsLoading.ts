import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";

export const getLoginIsLoading = (state: StateSchema) => {
    return state?.loginForm?.isLoading ?? true;
};
