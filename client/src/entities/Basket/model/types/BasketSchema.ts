import { ProductSchema } from "entities/Product";

export interface BasketSchema {
    id: number;
    userId: number;
    basket_products: {
        id: number;
        basketId: number;
        productId: number;
        product: ProductSchema;
    };
}
