import React from "react";
import cls from "./ThemeSwitcher.module.scss";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import { Theme, useTheme } from "app/providers/ThemeProvider";
import Sun24 from "shared/assets/icons/Sun/Sun24.svg";
import Moon24 from "shared/assets/icons/Moon/Moon24.svg";
import HeaderButton from "../../HeaderButton/HeaderButton";

export interface ThemeSwitcherProps {
    className?: string;
}

const ThemeSwitcher = (props: ThemeSwitcherProps) => {
    const { className } = props;
    const { theme, toggleTheme } = useTheme();

    return (
        <HeaderButton
            className={generateClassNames(cls.ThemeSwitcher, className)}
            onClick={toggleTheme}
            aria-label="theme"
        >
            {theme === Theme.DARK ? <Moon24 /> : <Sun24 />}
        </HeaderButton>
    );
};

export default ThemeSwitcher;
