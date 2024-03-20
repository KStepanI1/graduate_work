import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";

export const getCreateProductState = (state: StateSchema) => {
    return state.productForm;
};
