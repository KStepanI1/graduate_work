import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";

export const getCreateProductInfo = (state: StateSchema) => {
    return state.productForm?.info ?? [];
};
