import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";

export const getUser = (state: StateSchema) => {
    return state.user.authData?.user ?? null;
};
