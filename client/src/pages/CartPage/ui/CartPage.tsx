import React, { FC } from "react";
import cls from "./CartPage.module.scss";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import { CartItems } from "entities/Cart";
import { useQuery } from "@tanstack/react-query";
import { cartApi } from "shared/api/CartApi";
import Loader from "shared/ui/Loader/Loader";
import { useAppSelector } from "shared/hooks/useAppSelector/useAppSelector";
import { getUserAuthData } from "entities/User";
import { useIsFirstRender } from "@uidotdev/usehooks";
import PageLoader from "widgets/PageLoader/PageLoader";
import CartInfo from "entities/Cart/ui/CartInfo/CartInfo";

const CartPage: FC = () => {
    const authData = useAppSelector(getUserAuthData);

    const isFirstRender = useIsFirstRender();

    const cartQuery = useQuery({
        enabled: !!authData,
        queryKey: ["cart"],
        queryFn: () => cartApi.get(),
    });

    const cart = cartQuery.data?.data;

    return (
        <div className={generateClassNames(cls.CartPage)}>
            {(!cartQuery.isFetching && cart.products) || !isFirstRender ? (
                <>
                    <CartItems
                        items={cart.products}
                        className={cls.cartItems}
                    />
                    <CartInfo data={cart} className={cls.cartInfo} />
                </>
            ) : (
                <PageLoader />
            )}
        </div>
    );
};

export default CartPage;
