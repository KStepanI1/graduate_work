import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import cls from "./Modal.module.scss";
import Button from "../Button/Button";
import Portal from "../Portal/Portal";

export interface ModalProps {
    className?: string;
    children: React.ReactNode;
    isOpen?: boolean;
    onClose?: VoidFunction;
    lazy?: boolean;
    variant?: "center" | "left";
}

export interface ExtendableModalProps extends Omit<ModalProps, "children"> {}

const ANIMATION_DELAY = 300;

const Modal = memo((props: ModalProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        lazy,
        variant = "left",
    } = props;

    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const timerRef = useRef<NodeJS.Timeout>();

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
                setIsMounted(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeHandler();
            }
        },
        [closeHandler]
    );

    useEffect(() => {
        if (isOpen) {
            window.addEventListener("keydown", onKeyDown);
        }

        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    const classMods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    console.log(lazy && !isMounted);

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div
                className={generateClassNames(cls.Modal, className, classMods)}
            >
                <div
                    className={generateClassNames(cls.overlay)}
                    onMouseUp={closeHandler}
                >
                    <div
                        className={generateClassNames(
                            cls.contentWrapper,
                            cls[variant]
                        )}
                        onMouseUp={(e) => e.stopPropagation()}
                    >
                        <Button onClick={closeHandler}>Закрыть</Button>
                        <div className={generateClassNames(cls.content)}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    );
});

Modal.displayName = "Modal";

export default Modal;
