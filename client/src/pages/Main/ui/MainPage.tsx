import { useQuery } from "@tanstack/react-query";
import { productApi } from "shared/api/ProductApi";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import Rating, { RatingVariant } from "shared/ui/Rating/Rating";

import cls from "./MainPage.module.scss";
import { ProductCard } from "entities/Product";

const MainPage = () => {
    const productQuery = useQuery({
        queryKey: ["product"],
        queryFn: () => productApi.getAll({}),
    });

    return (
        <div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
                {productQuery.data?.data?.rows &&
                    productQuery.data?.data?.rows.map((product) => (
                        <ProductCard
                            data={product}
                            key={product.id}
                            className={generateClassNames(cls.product)}
                        />
                    ))}
            </div>

            <Rating size={16} variant={RatingVariant.MIN} value={3.5} />
            <Rating />
            <Rating size={32} />
        </div>
    );
};

export default MainPage;
