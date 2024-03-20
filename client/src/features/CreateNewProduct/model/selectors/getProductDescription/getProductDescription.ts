import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";

export const getCreateProductDescription = (state: StateSchema) => {
    return state.productForm?.description ?? "";
};
