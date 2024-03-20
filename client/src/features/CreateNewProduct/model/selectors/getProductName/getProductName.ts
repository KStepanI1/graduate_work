import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";

export const getCreateProductName = (state: StateSchema) => {
    return state.productForm?.name ?? "";
};
