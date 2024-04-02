import { Product } from "entities/Product/model/types/Product";
import { Api, ResponseWitchCount, WithPagination } from "./api";
import { ProductCreateResponse } from "features/CreateNewProduct";

class ProductApi extends Api {
    async getAll(
        args: WithPagination<{ subCategoryId?: number; includeAll?: boolean }>
    ) {
        return this._api.get<ResponseWitchCount<Product[]>>(
            `products${this.parseQuery(args)}`
        );
    }

    async getById(id: string | number) {
        return this._api.get<Product>(`/products/${id}`);
    }

    async create(formData: FormData) {
        return this._api.post<ProductCreateResponse>(`/products`, formData);
    }

    async delete(id: string | number) {
        return this._api.delete(`/products/${id}`);
    }
}

const productApi = new ProductApi();
export { productApi };
