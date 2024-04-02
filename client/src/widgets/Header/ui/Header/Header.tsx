import React, { memo, useState } from "react";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import cls from "./Header.module.scss";
import { Navbar } from "widgets/Navbar";
import { ThemeSwitcher } from "../../../Buttons/ui/ThemeSwitcher";
import { LoginModal } from "features/AuthByEmail";
import { logout } from "entities/User/model/services/loguot/logout";
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";
import { LoginButton } from "../../../Buttons/ui/LoginButton";
import { CartButton } from "entities/Cart";

export interface HeaderProps {
    className?: string;
}

const Header = (props: HeaderProps) => {
    const { className } = props;
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();

    const loginHandler = (isAuth: boolean) => {
        if (isAuth) {
            dispatch(logout());
        } else {
            setIsOpen(true);
        }
    };

    return (
        <>
            <div className={generateClassNames(cls.Header, className)}>
                <div className={generateClassNames(cls.logo)}></div>
                <Navbar />
                <div className={generateClassNames(cls.rightBox)}>
                    <CartButton />
                    <LoginButton onClick={loginHandler} />
                    <ThemeSwitcher />
                </div>
            </div>
            <LoginModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
};

export default memo(Header);
