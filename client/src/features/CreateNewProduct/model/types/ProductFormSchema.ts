import { ProductInfo } from "entities/Product";
import { ProductMedia } from "entities/Product/model/types/Product";

export interface ProductFormSchema {
    title: string;
    description?: string;
    price: string;
    subCategoryId?: number;
    info?: ProductInfo[];
    media?: ProductMedia[];
    files?: File[];
    isLoading?: boolean;
    error?: string;
}
