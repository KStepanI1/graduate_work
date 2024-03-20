export interface ProductInfo {
    title: string;
    description: string;
}

export interface ProductMedia {
    id: string;
    name: string;
    link: string;
    size: 0;
}

export interface ProductSchema {
    id: number;
    name: string;
    description: string;
    price: string;
    rating: number;
    info: ProductInfo[];
    files: ProductMedia[];
}
