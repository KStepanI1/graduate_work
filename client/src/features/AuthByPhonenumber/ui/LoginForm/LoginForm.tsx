import React, { memo, useCallback, useEffect, useRef } from "react";
import cls from "./LoginForm.module.scss";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import { useSelector } from "react-redux";
import { loginActions, loginReducer } from "../../model/slice/loginSlice";
import Button from "shared/ui/Button/Button";
import { getLoginPhoneNumber } from "../../model/selectors/getLoginPhoneNumber/getLoginPhoneNumber";
import DynamicModuleLoader, {
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { loginByPhoneNumber } from "../../model/services/loginByPhoneNumber/loginByPhoneNumber";
import { getLoginError } from "../../model/selectors/getLoginError/getLoginError";
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import Input from "shared/ui/Input/Input";
import Text from "shared/ui/Text/Text";
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";

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

  const phoneNumber = useSelector(getLoginPhoneNumber);
  const error = useSelector(getLoginError);
  const isLoading = useSelector(getLoginIsLoading);

  const onChangePhoneNumber = useCallback(
    (value: string) => {
      dispatch(loginActions.setPhoneNumber(value));
    },
    [dispatch]
  );

  const onSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();

      const result = await dispatch(loginByPhoneNumber(phoneNumber));

      if (result.meta.requestStatus === "fulfilled") {
        onSuccess();
      }
    },
    [dispatch, onSuccess, phoneNumber]
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
        className={generateClassNames(cls.LoginForm, className)}>
        <Text
          text="Пришлём SMS. Введите последние четыре цифры номера телефона
                    или код из SMS-сообщения."
          title="войти или зарегистрироваться"
        />
        <Input
          type="tel"
          name="tel"
          autoFocus
          onChange={onChangePhoneNumber}
          value={phoneNumber}
          error={!!error}
          hint={error}
        />
        <Button
          className={cls.submitBtn}
          disabled={isLoading}
          type="submit"
          ref={submitButtonRef}>
          получить код
        </Button>
      </form>
    </DynamicModuleLoader>
  );
});

LoginForm.displayName = "LoginForm";

export default LoginForm;
