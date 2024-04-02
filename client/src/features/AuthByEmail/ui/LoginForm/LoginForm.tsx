import React, { memo, useCallback, useEffect, useRef } from "react";
import cls from "./LoginForm.module.scss";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import { useSelector } from "react-redux";
import { loginActions, loginReducer } from "../../model/slice/loginSlice";
import Button from "shared/ui/Button/Button";
import DynamicModuleLoader, {
    ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { loginByEmail } from "../../model/services/loginByPhoneNumber/loginByEmail";
import { getLoginError } from "../../model/selectors/getLoginError/getLoginError";
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import Input from "shared/ui/Input/Input";
import Text from "shared/ui/Text/Text";
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";
import { getLoginEmail } from "features/AuthByEmail/model/selectors/getLoginEmail/getLoginEmail";
import { getLoginPassword } from "features/AuthByEmail/model/selectors/getLoginPassword/getLoginPassword";

export interface LoginFormProps {
    className?: string;
    onSuccess: VoidFunction;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm = memo((props: LoginFormProps) => {
    const { className, onSuccess } = props;

    const dispatch = useAppDispatch();
    const submitButtonRef = useRef<HTMLButtonElement>(null);

    const email = useSelector(getLoginEmail);
    const password = useSelector(getLoginPassword);
    const error = useSelector(getLoginError);
    const isLoading = useSelector(getLoginIsLoading);

    const onChangeEmail = useCallback(
        (value: string) => {
            dispatch(loginActions.setEmail(value));
        },
        [dispatch]
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch]
    );

    const onSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
        async (e) => {
            e.preventDefault();

            const result = await dispatch(loginByEmail({ email, password }));

            if (result.meta.requestStatus === "fulfilled") {
                onSuccess();
            }
        },
        [dispatch, email, onSuccess, password]
    );

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Enter") {
            submitButtonRef.current?.click();
        }
    }, []);

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [onKeyDown]);

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUmount>
            <form
                onSubmit={onSubmit}
                className={generateClassNames(cls.LoginForm, className)}
            >
                <Text
                    text="Пришлём SMS. Введите последние четыре цифры номера телефона
                    или код из SMS-сообщения."
                    title="войти или зарегистрироваться"
                />
                <Input
                    type="email"
                    name="login_email"
                    autoFocus
                    placeholder="Ввести email"
                    onChange={onChangeEmail}
                    value={email}
                    error={!!error}
                    hint={error}
                />
                <Input
                    type="password"
                    name="login_password"
                    autoFocus
                    placeholder="Ввести пароль"
                    onChange={onChangePassword}
                    value={password}
                    error={!!error}
                    hint={error}
                />
                <Button
                    className={cls.submitBtn}
                    disabled={isLoading}
                    type="submit"
                    ref={submitButtonRef}
                >
                    получить код
                </Button>
            </form>
        </DynamicModuleLoader>
    );
});

LoginForm.displayName = "LoginForm";

export default LoginForm;
