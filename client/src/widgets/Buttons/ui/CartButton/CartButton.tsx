import React, { FC } from "react";
import cls from "./CartButton.module.scss";
import Cart24 from "shared/assets/icons/Cart/Cart24.svg";
import { Link } from "react-router-dom";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import HeaderButton from "../HeaderButton/HeaderButton";
import { useAppSelector } from "shared/hooks/useAppSelector/useAppSelector";
import { getUserId } from "entities/User";
import { useQuery } from "@tanstack/react-query";
import { basketApi } from "shared/api/BasketApi";
import { useLocalStorage } from "@uidotdev/usehooks";
import { CART_LOCALSTORAGE_KEY } from "shared/const/localStorage";

const CartButton: FC = () => {
    const userId = useAppSelector(getUserId);
    const [cartStorage] = useLocalStorage<string>(CART_LOCALSTORAGE_KEY);

    const amountQuery = useQuery({
        queryKey: ["basket", userId],
        queryFn: () => userId && basketApi.getAmount(userId),
    });

    const amount = userId ? amountQuery.data : JSON.parse(cartStorage).length;

    return (
        <Link to="/basket">
            <HeaderButton
                className={generateClassNames(cls.CartButton)}
                aria-label="Корзина"
            >
                <Cart24 />
                {amount && (
                    <span className={cls.amount}>
                        {amount > 99 ? "99+" : amount}
                    </span>
                )}
            </HeaderButton>
        </Link>
    );
};

export default CartButton;
