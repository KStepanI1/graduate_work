import React, { FC } from "react";
import cls from "./ProductsBox.module.scss";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import { ProductCard, Product } from "entities/Product";

export interface ProductsBoxProps {
    data?: Product[];
}

const ProductsBox: FC<ProductsBoxProps> = (props) => {
    const { data } = props;
    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
            {data &&
                data.map((product) => (
                    <ProductCard
                        data={product}
                        key={product.id}
                        className={generateClassNames(cls.product)}
                    />
                ))}
        </div>
    );
};

export default ProductsBox;
