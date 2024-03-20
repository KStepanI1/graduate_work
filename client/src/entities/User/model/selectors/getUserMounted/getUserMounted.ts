import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";

export const getUserMounted = (state: StateSchema) => {
    return state.user._mounted;
};
