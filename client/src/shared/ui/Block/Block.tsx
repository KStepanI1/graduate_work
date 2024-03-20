import React, { memo } from "react";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import cls from "./Block.module.scss";

export interface BlockProps {
    rounded?: boolean;
    shadow?: boolean;
    className?: string;
    children: React.ReactNode;
}

const Block = (props: BlockProps) => {
    const { rounded, shadow, className, children } = props;

    return (
        <div
            className={generateClassNames(cls.Block, className, {
                shadow,
                rounded,
            })}
        >
            {children}
        </div>
    );
};

export default memo(Block);
