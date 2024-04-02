import React, { FC, VideoHTMLAttributes } from "react";
import cls from "./Video.module.scss";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";

export interface VideoProps extends VideoHTMLAttributes<HTMLVideoElement> {}

const Video: FC<VideoProps> = (props) => {
    const { className, src, ...otherProps } = props;

    return (
        <video
            muted={true}
            loop={true}
            className={generateClassNames(cls.Video, className)}
            src={`${__SERVER__}/${src}`}
            {...otherProps}
        />
    );
};

export default Video;
