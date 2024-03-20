import React, { FormHTMLAttributes, FC } from "react";
import cls from "./Form.module.scss";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {}

const Form = (props: FormProps) => {
    const { className, children, ...otherProps } = props;

    return (
        <form
            className={generateClassNames(cls.Form, className)}
            {...otherProps}
        >
            {children}
        </form>
    );
};

Form.Footer = function FormFooter({
    children,
    className,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div className={generateClassNames(cls.footer, className)}>
            {children}
        </div>
    );
};

export default Form;
