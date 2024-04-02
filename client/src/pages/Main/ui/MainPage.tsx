import { useQuery } from "@tanstack/react-query";
import { ProductsBox } from "entities/Product";
import { productApi } from "shared/api/ProductApi";
import Rating, { RatingVariant } from "shared/ui/Rating/Rating";

const MainPage = () => {
    const productQuery = useQuery({
        queryKey: ["product"],
        queryFn: () => productApi.getAll({ limit: 100 }),
    });

    return (
        <div>
            <ProductsBox data={productQuery.data?.data?.rows} />
            <Rating size={16} variant={RatingVariant.MIN} value={3.5} />
            <Rating />
            <Rating size={32} />
        </div>
    );
};

export default MainPage;
