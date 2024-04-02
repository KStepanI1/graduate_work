import { Api } from "./api";
import { Cart, CartSchemaCart } from "entities/Cart";

class CartApi extends Api {
    async get() {
        return this._api.get<Cart>(`cart`);
    }

    async add(productId: number | string) {
        return this._api.post<CartSchemaCart>(
            `cart${this.parseQuery({ productId })}`
        );
    }

    async delete(productId: number | string) {
        return this._api.delete<CartSchemaCart>(
            `cart${this.parseQuery({ productId })}`
        );
    }

    async init() {
        return this._api.get<CartSchemaCart>(`cart/init`);
    }
}

const cartApi = new CartApi();
export { cartApi };
