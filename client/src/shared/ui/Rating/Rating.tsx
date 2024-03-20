import React, { memo, useMemo, useState } from "react";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import cls from "./Rating.module.scss";
import Star16 from "shared/assets/icons/Star/Star16.svg";
import Star24 from "shared/assets/icons/Star/Star24.svg";
import Star32 from "shared/assets/icons/Star/Star32.svg";

export type RatingStarSize = 16 | 24 | 32;

export enum RatingVariant {
    PRIMARY = "primary",
    MIN = "min",
}

export interface RatingProps {
    className?: string;
    size?: RatingStarSize;
    value?: number;
    readonly?: boolean;
    onChange?: (index: number) => void;
    disabled?: boolean;
    variant?: RatingVariant;
}

const Rating = (props: RatingProps) => {
    const {
        className,
        size = 24,
        value,
        readonly = false,
        onChange,
        disabled,
        variant = RatingVariant.PRIMARY,
    } = props;

    const [currentRating, setCurrentRating] = useState(value ?? 0);
    const [imaginaryRating, setImaginaryRating] = useState<number | null>(null);

    const minVariant = useMemo(() => variant === RatingVariant.MIN, [variant]);
    const canEdit = !readonly && !minVariant;

    const MainClassName = generateClassNames(
        cls.Rating,
        className,
        cls[variant],
        {
            [cls["disabled"]]: disabled,
        }
    );
    const StarClassName = (filled: boolean) =>
        generateClassNames(cls.Star, {
            [cls["filled"]]: filled,
        });

    const Star = useMemo(() => {
        switch (size) {
            case 16:
                return Star16;
            case 24:
                return Star24;
            case 32:
                return Star32;
        }
    }, [size]);

    const clickHandler = (e: React.MouseEvent, index: number) => {
        if (canEdit) {
            setCurrentRating(index);
            onChange?.(index);
        }
    };

    if (minVariant) {
        return (
            <div className={MainClassName}>
                {Array.from(new Array(1)).map((_, i) => (
                    <Star key={i} className={StarClassName(true)} />
                ))}
                {value}
            </div>
        );
    }

    return (
        <div className={MainClassName}>
            {Array.from(new Array(5)).map((_, i) => {
                const filled = imaginaryRating
                    ? imaginaryRating > i
                    : currentRating > i;

                return (
                    <Star
                        key={i}
                        className={StarClassName(filled)}
                        onClick={(e) => clickHandler(e, i + 1)}
                        onMouseEnter={() =>
                            canEdit && setImaginaryRating(i + 1)
                        }
                        onMouseLeave={() => setImaginaryRating(null)}
                    />
                );
            })}
        </div>
    );
};

export default memo(Rating);
