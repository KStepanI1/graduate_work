import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";

export const getCreateProductFiles = (state: StateSchema) => {
    return state.productForm?.files ?? [];
};
