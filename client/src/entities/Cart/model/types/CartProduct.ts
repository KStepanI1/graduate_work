import { Product } from "entities/Product";

export interface CartProduct {
    id?: number;
    cartId: number;
    productId: number;
    qty: number;
    price: number;
    product?: Product;
}
