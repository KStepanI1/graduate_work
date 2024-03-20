import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";

export const getUserAuthData = (state: StateSchema) => {
    return state.user.authData;
};
