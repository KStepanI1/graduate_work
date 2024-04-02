import React, { FC } from "react";
import cls from "./CartInfo.module.scss";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import { Cart } from "entities/Cart/model/types/Cart";
import Button from "shared/ui/Button/Button";
import Text from "shared/ui/Text/Text";
import Block from "shared/ui/Block/Block";
import { useAppSelector } from "shared/hooks/useAppSelector/useAppSelector";
import { getCart } from "entities/Cart/model/selectors/getCart/getCart";

export interface CartInfoProps {
    data: Cart;
    className?: string;
}

const CartInfo: FC<CartInfoProps> = (props) => {
    const { data, className } = props;

    const cart = useAppSelector(getCart);

    return (
        <div className={generateClassNames(cls.CartInfo, className)}>
            <Block className={cls.cartInfoContent}>
                <div className={cls.section}>
                    <Button className={cls.orderBtn}>
                        Перейти к оформлению
                    </Button>
                    <Text
                        text="Доступные способы и время доставки можно выбрать при оформлении заказа"
                        className={cls.orderHint}
                    />
                </div>
                <div className={cls.section}>
                    <Text title="Ваша корзина" />
                    <div className={cls.field}>
                        <span className={cls.fieldName}>
                            Товары ({cart.totalQty})
                        </span>
                        <span className={cls.fieldValue}>
                            {data.totalPrice} ₽
                        </span>
                    </div>
                </div>
            </Block>
        </div>
    );
};

export default CartInfo;
