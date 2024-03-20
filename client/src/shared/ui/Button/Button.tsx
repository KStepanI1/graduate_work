import { ButtonHTMLAttributes, FC, forwardRef, memo } from "react";
import cls from "./Button.module.scss";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import Loader from "../Loader/Loader";

export enum ThemeButton {
    CLEAR = "clear",
    PRIMARY = "primary",
    SECONDARY = "secondary",
    CIRCLE = "circle",
    SHADOW = "shadow",
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ThemeButton | ThemeButton[];
    showLoader?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {
        className,
        children,
        theme = ThemeButton.PRIMARY,
        showLoader = false,
        ...otherProps
    } = props;

    const arrayTheme = Array.isArray(theme) ? theme : [theme];

    return (
        <button
            type="button"
            ref={ref}
            className={generateClassNames(
                cls.Button,
                className,
                arrayTheme.map((theme) => cls[theme])
            )}
            {...otherProps}
        >
            {showLoader && (
                <div className={generateClassNames(cls.loader)}>
                    <Loader />
                </div>
            )}

            {children}
        </button>
    );
});

Button.displayName = "Button";

export default memo(Button);
