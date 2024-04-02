import { CartProduct } from "./CartProduct";

export interface Cart {
    id: number;
    userId: number;
    totalQty: number;
    totalPrice: number;
    products?: CartProduct[];
}
