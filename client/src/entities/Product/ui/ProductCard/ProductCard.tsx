import React, { memo, useCallback, useState } from "react";
import cls from "./ProductCard.module.scss";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import { Product } from "entities/Product/model/types/Product";
import { GalleryViewer } from "widgets/GalleryViewer";
import AppLink, { AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { RoutePath } from "app/providers/router/routeConfig/routeConfig";
import Button, { ThemeButton } from "shared/ui/Button/Button";
import { useAppSelector } from "shared/hooks/useAppSelector/useAppSelector";
import { getUserId } from "entities/User";
import { useLocalStorage } from "@uidotdev/usehooks";
import { CART_LOCALSTORAGE_KEY } from "shared/const/localStorage";
import { CartProduct, getCart } from "entities/Cart";
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";
import { addProductToCart } from "entities/Cart/model/services/addProductToCart";
import { removeProductFromCart } from "entities/Cart/model/services/removeProductFromCart";

export interface ProductCardProps {
    className?: string;
    data: Product;
    root?: Element | Document;
    rootMargin?: string;
}

const ProductCard = (props: ProductCardProps) => {
    const { className, data, root = null, rootMargin = "0px" } = props;
    const cart = useAppSelector(getCart);
    const dispatch = useAppDispatch();

    const cartData = cart.products?.find((prod) => prod.id === data.id);

    const [isBtnLoading, setIsBtnLoading] = useState(false);

    const productLink = `${RoutePath.product}${data.id}`;

    const addToCartHandler = useCallback(
        async (productId: number) => {
            dispatch(addProductToCart(productId));
        },
        [dispatch]
    );

    const removeFromCartHandler = useCallback(
        async (productId: number) => {
            dispatch(removeProductFromCart(productId));
        },
        [dispatch]
    );

    return (
        <div className={generateClassNames(cls.ProductCard, className)}>
            <AppLink theme={AppLinkTheme.CLEAR} to={productLink}>
                <GalleryViewer
                    useStab
                    data={data.media.map((image) => image.link)}
                    slideHeight={200}
                />
            </AppLink>

            <AppLink
                to={productLink}
                theme={AppLinkTheme.CLEAR}
                className={generateClassNames(cls.title)}
            >
                {data.title}
            </AppLink>
            {cartData?.qty ? (
                <div className={cls.setting}>
                    <Button
                        onClick={() => removeFromCartHandler(data.id)}
                        showLoader={isBtnLoading}
                        className={cls.cartBtn}
                        theme={ThemeButton.SECONDARY}
                    >
                        -
                    </Button>
                    <span>{cartData.qty}</span>
                    <Button
                        onClick={() => addToCartHandler(data.id)}
                        showLoader={isBtnLoading}
                        className={cls.cartBtn}
                        theme={ThemeButton.SECONDARY}
                    >
                        +
                    </Button>
                </div>
            ) : (
                <Button
                    onClick={() => addToCartHandler(data.id)}
                    // showLoader={getCartAmountQuery.isFetching}
                    className={cls.cartBtn}
                >
                    В корзину
                </Button>
            )}
        </div>
    );
};

export default memo(ProductCard);
