import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";

export const getLoginPhoneNumber = (state: StateSchema) => {
    return state?.loginForm?.phoneNumber ?? "";
};
