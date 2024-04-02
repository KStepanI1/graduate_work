export interface CartSchemaProduct {
    id: number;
    qty: number;
}

export interface CartSchemaCart {
    totalQty: number;
    products: CartSchemaProduct[];
}
export interface CartSchema {
    cart: CartSchemaCart | undefined;
    isLoading: boolean;
    error?: string;
}
