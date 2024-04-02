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

export interface Product {
    id: number;
    title: string;
    description: string;
    price: string;
    rating: number;
    info: ProductInfo[];
    media: ProductMedia[];
}
