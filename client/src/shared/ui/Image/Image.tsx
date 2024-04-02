import React, { FC, ImgHTMLAttributes } from "react";
import cls from "./Image.module.scss";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

const Image: FC<ImageProps> = (props) => {
    const { className, src, ...otherProps } = props;
    return (
        <img
            className={generateClassNames(cls.Image, className)}
            loading="lazy"
            src={`${__SERVER__}/${src}`}
            {...otherProps}
        />
    );
};

export default Image;
