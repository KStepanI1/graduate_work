import React from "react";
import { useSelector } from "react-redux";
import { getUserState } from "entities/User";
import User24 from "shared/assets/icons/User/User24.svg";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import cls from "./LoginButton.module.scss";
import HeaderButton from "../../HeaderButton/HeaderButton";

export interface LoginButtonProps {
    onClick: (isAuth: boolean) => void;
}

const LoginButton = (props: LoginButtonProps) => {
    const { onClick } = props;
    const user = useSelector(getUserState);

    const logined = !!user.authData;

    return (
        <HeaderButton
            className={generateClassNames(cls.LoginButton, {
                [cls.logined]: logined,
            })}
            onClick={() => onClick(logined)}
            aria-label="Авторизация"
        >
            <User24 />
        </HeaderButton>
    );
};

export default LoginButton;
