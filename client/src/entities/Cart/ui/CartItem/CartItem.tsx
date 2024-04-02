import React, { FC, memo, useCallback } from "react";
import cls from "./CartItem.module.scss";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import { CartProduct } from "entities/Cart/model/types/CartProduct";
import Image from "shared/ui/Image/Image";
import Button, { ThemeButton } from "shared/ui/Button/Button";
import Trash24 from "shared/assets/icons/Trash/Trash24.svg";
import Heart24 from "shared/assets/icons/Heart/Heart24.svg";
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";
import { addProductToCart } from "entities/Cart/model/services/addProductToCart";
import { removeProductFromCart } from "entities/Cart/model/services/removeProductFromCart";
import Block from "shared/ui/Block/Block";
import { useAppSelector } from "shared/hooks/useAppSelector/useAppSelector";
import { getCart } from "entities/Cart/model/selectors/getCart/getCart";

export interface CartItemProps {
    data: CartProduct;
    onAdd?: () => void;
    onRemove?: () => void;
}

const CartItem: FC<CartItemProps> = (props) => {
    const { data, onAdd, onRemove } = props;

    const product = data.product;

    const dispatch = useAppDispatch();
    const cart = useAppSelector(getCart);
    const localCartProduct = cart.products?.find(
        (prod) => prod.id === data.productId
    );

    const addToCartHandler = useCallback(
        async (productId: number) => {
            await dispatch(addProductToCart(productId));
            onAdd?.();
        },
        [dispatch, onAdd]
    );

    const removeFromCartHandler = useCallback(
        async (productId: number) => {
            await dispatch(removeProductFromCart(productId));
            onRemove?.();
        },
        [dispatch, onRemove]
    );

    console.log(localCartProduct);

    if (!product || !localCartProduct) return null;

    return (
        <Block className={generateClassNames(cls.CartItem)}>
            <Image src={product.media?.[0]?.link} className={cls.itemImg} />
            <div className={cls.itemMain}>
                <div className={cls.itemInfo}>
                    <div className={cls.titleBox}>
                        <span className={cls.title}>{product.title}</span>
                    </div>

                    <p>{product.description}</p>
                </div>

                <div className={cls.itemBtns}>
                    <Button
                        theme={ThemeButton.SECONDARY}
                        className={generateClassNames(
                            cls.itemBtn,
                            cls.trashBtn
                        )}
                    >
                        <Trash24 />
                    </Button>
                    <Button
                        theme={ThemeButton.SECONDARY}
                        className={generateClassNames(
                            cls.itemBtn,
                            cls.heartBtn
                        )}
                    >
                        <Heart24 />
                    </Button>
                </div>
            </div>
            <div className={cls.priceBox}>
                <div className={cls.setting}>
                    <Button
                        onClick={() => removeFromCartHandler(product.id)}
                        className={cls.cartBtn}
                        theme={ThemeButton.SECONDARY}
                    >
                        -
                    </Button>
                    <span>{localCartProduct.qty}</span>
                    <Button
                        onClick={() => addToCartHandler(product.id)}
                        className={cls.cartBtn}
                        theme={ThemeButton.SECONDARY}
                    >
                        +
                    </Button>
                </div>
                <div className={cls.price}>
                    {data.price * localCartProduct.qty} ₽
                </div>
            </div>
        </Block>
    );
};

export default memo(CartItem);
