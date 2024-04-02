import React, { FC, memo, useEffect } from "react";
import cls from "./CartButton.module.scss";
import Cart24 from "shared/assets/icons/Cart/Cart24.svg";
import { Link } from "react-router-dom";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import HeaderButton from "../../../../widgets/Buttons/ui/HeaderButton/HeaderButton";
import { useAppSelector } from "shared/hooks/useAppSelector/useAppSelector";
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";
import { initCart } from "entities/Cart/model/services/initCart";
import { getCart } from "entities/Cart/model/selectors/getCart/getCart";
import { RoutePath } from "app/providers/router/routeConfig/routeConfig";
import { getUserAuthData } from "entities/User";

const CartButton: FC = () => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector(getCart);
    const authData = useAppSelector(getUserAuthData);

    useEffect(() => {
        dispatch(initCart());
    }, [authData, dispatch]);

    const amount = cart.totalQty;

    return (
        <Link to={RoutePath.cart}>
            <HeaderButton
                className={generateClassNames(cls.CartButton)}
                aria-label="Корзина"
            >
                <Cart24 />
                {!!amount && (
                    <span className={cls.amount}>
                        {amount > 99 ? "99+" : amount}
                    </span>
                )}
            </HeaderButton>
        </Link>
    );
};

export default memo(CartButton);
