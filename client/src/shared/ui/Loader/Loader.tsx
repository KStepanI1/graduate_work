import React, { memo } from "react";
import cls from "./Loader.module.scss";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";

export enum LoaderVariant {
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large",
}

export interface LoaderProps {
    className?: string;
    variant?: LoaderVariant;
}

const Loader = (props: LoaderProps) => {
    const { className, variant = LoaderVariant.MEDIUM } = props;

    return (
        <div
            className={generateClassNames(cls.Loader, className, cls[variant])}
        ></div>
    );
};

export default memo(Loader);
