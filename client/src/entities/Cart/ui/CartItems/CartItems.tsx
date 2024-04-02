import React, { FC, memo } from "react";
import cls from "./CartItems.module.scss";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import { CartProduct } from "entities/Cart/model/types/CartProduct";
import CartItem from "../CartItem/CartItem";

export interface CartItemsProps {
    items: CartProduct[];
    onChange?: () => void;
    className?: string;
}

const CartItems: FC<CartItemsProps> = (props) => {
    const { items, onChange, className } = props;
    return (
        <div className={generateClassNames(cls.CartItems, className)}>
            {items.map((item) => (
                <CartItem
                    key={item.id}
                    data={item}
                    onAdd={onChange}
                    onRemove={onChange}
                />
            ))}
        </div>
    );
};

export default memo(CartItems);
