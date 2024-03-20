import React from "react";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import Button, { ButtonProps, ThemeButton } from "shared/ui/Button/Button";
import cls from "./HeaderButton.module.scss";

export interface HeaderButtonProps extends Omit<ButtonProps, "ref" | "theme"> {}

const HeaderButton = (props: HeaderButtonProps) => {
    const { className, ...otherProps } = props;

    return (
        <Button
            className={generateClassNames(cls.HeaderButton, className)}
            theme={[ThemeButton.CIRCLE, ThemeButton.CLEAR, ThemeButton.SHADOW]}
            aria-label="Тема"
            {...otherProps}
        />
    );
};

export default HeaderButton;
