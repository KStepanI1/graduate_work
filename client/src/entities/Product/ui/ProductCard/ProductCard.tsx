import React, { memo, useCallback, useState } from "react";
import cls from "./ProductCard.module.scss";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import { ProductSchema } from "entities/Product/model/types/Product";
import { GalleryViewer } from "widgets/GalleryViewer";
import AppLink, { AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { RoutePath } from "app/providers/router/routeConfig/routeConfig";
import Button, { ThemeButton } from "shared/ui/Button/Button";
import { basketApi } from "shared/api/BasketApi";
import { useAppSelector } from "shared/hooks/useAppSelector/useAppSelector";
import { getUserId } from "entities/User";
import { useIntersectionObserver, useLocalStorage } from "@uidotdev/usehooks";
import { CART_LOCALSTORAGE_KEY } from "shared/const/localStorage";

export interface ProductCardProps {
    className?: string;
    data: ProductSchema;
    root?: Element | Document;
    rootMargin?: string;
}

const ProductCard = (props: ProductCardProps) => {
    const { className, data, root = null, rootMargin = "0px" } = props;
    const userId = useAppSelector(getUserId);
    const [isBtnLoading, setIsBtnLoading] = useState(false);
    const [cartStorage, setCartStorage] = useLocalStorage(
        CART_LOCALSTORAGE_KEY,
        JSON.stringify([])
    );
    const [isCart, setInCart] = useState(false);

    const [ref, entry] = useIntersectionObserver({
        threshold: 0,
        root,
        rootMargin,
    });

    const productLink = `${RoutePath.product}${data.id}`;

    const addToCartHandler = useCallback(
        async (productId: number) => {
            if (userId) {
                await basketApi
                    .add(userId, productId)
                    .then(() => setIsBtnLoading(true))
                    .finally(() => {
                        setIsBtnLoading(false);
                    });
            } else {
                setCartStorage((state) =>
                    JSON.stringify([
                        ...(JSON.parse(state) as number[]),
                        productId,
                    ])
                );
            }
        },
        [setCartStorage, userId]
    );

    const removeFromCartHandler = useCallback(
        async (productId: number) => {
            if (userId) {
                await basketApi
                    .add(userId, productId)
                    .then(() => setIsBtnLoading(true))
                    .finally(() => {
                        setIsBtnLoading(false);
                    });
            } else {
                setCartStorage((state) =>
                    JSON.stringify(
                        (JSON.parse(state) as number[]).filter(
                            (id) => id !== productId
                        )
                    )
                );
            }
        },
        [setCartStorage, userId]
    );

    return (
        <div
            className={generateClassNames(cls.ProductCard, className)}
            ref={ref}
        >
            {entry?.isIntersecting && (
                <>
                    <AppLink theme={AppLinkTheme.CLEAR} to={productLink}>
                        <GalleryViewer
                            useStab
                            data={data.files.map((image) => image.link)}
                            slideHeight={200}
                        />
                    </AppLink>

                    <div>{data.name}</div>
                    <AppLink
                        to={productLink}
                        theme={AppLinkTheme.CLEAR}
                        className={generateClassNames(cls.description)}
                    >
                        {data.description}
                    </AppLink>
                    <Button
                        onClick={() => addToCartHandler(data.id)}
                        showLoader={isBtnLoading}
                        className={cls.cartBtn}
                    >
                        В корзину
                    </Button>
                </>
            )}
        </div>
    );
};

export default memo(ProductCard);
