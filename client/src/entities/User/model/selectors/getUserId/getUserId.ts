import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";

export const getUserId = (state: StateSchema) => {
    return state.user.authData?.user?.id ?? null;
};
