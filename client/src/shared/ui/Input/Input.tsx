import React, { InputHTMLAttributes, forwardRef, memo } from "react";
import cls from "./Input.module.scss";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import Text from "../Text/Text";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange?: (
    newValue: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  hint?: string;
  error?: boolean;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    error = false,
    hint,
    label,
    ...otherProps
  } = props;

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange?.(e.target.value, e);
  };

  const generalMods = {
    [cls.error]: error,
  };

  return (
    <div className={generateClassNames(cls.InputGroup, generalMods)}>
      <input
        className={generateClassNames(cls.Input, className, generalMods)}
        value={value}
        onChange={changeHandler}
        {...otherProps}
      />
      {hint && (
        <Text
          text={hint}
          className={generateClassNames(cls.InputHint, generalMods)}
        />
      )}
    </div>
  );
});

Input.displayName = "Input";

export default memo(Input);
