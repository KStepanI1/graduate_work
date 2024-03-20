import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";

export const getCreateProductPrice = (state: StateSchema) => {
    return state.productForm?.price ?? "";
};
