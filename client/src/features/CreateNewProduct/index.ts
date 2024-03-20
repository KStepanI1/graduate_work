import { createProduct } from "./model/services/createProduct";
import { ProductFormSchema } from "./model/types/ProductFormSchema";
import { ProductCreateResponse } from "./model/types/ProductCreateResponse";
import { ProductFormAsync as ProductForm } from "./ui/ProductForm/ProductForm.async";
import { productActions, productReducer } from "./model/slice/ProductSlice";

export {
    ProductForm,
    ProductCreateResponse,
    ProductFormSchema,
    createProduct,
    productActions,
    productReducer,
};
