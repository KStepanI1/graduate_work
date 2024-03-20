import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import cls from "./Text.module.scss";
import { memo } from "react";

export enum TextTheme {
    PRIMARY = "primary",
    ERROR = "error",
}

interface TextProps {
    className?: string;
    title?: React.ReactNode;
    text?: React.ReactNode;
    theme?: TextTheme;
}

const Text = (props: TextProps) => {
    const { className, text, title, theme = TextTheme.PRIMARY } = props;

    return (
        <div
            className={generateClassNames(cls.Text, { [cls[theme]]: true }, [
                className,
            ])}
        >
            {title && <h2 className={cls.title}>{title}</h2>}
            {text && <p className={cls.text}>{text}</p>}
        </div>
    );
};

export default memo(Text);
