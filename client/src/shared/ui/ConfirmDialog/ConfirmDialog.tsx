import React, { FC } from "react";
import cls from "./ConfirmDialog.module.scss";
import Modal from "../Modal/Modal";
import Text from "../Text/Text";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import Button, { ThemeButton } from "../Button/Button";

export interface ConfirmDialogProps {
    title: string;
    description: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}

const ConfirmDialog: FC<ConfirmDialogProps> = (props) => {
    const { title, description, onCancel, onConfirm } = props;

    return (
        <Modal variant="center" isOpen={true} lazy onClose={() => onCancel()}>
            <Text title={title} text={description} />
            <div className={generateClassNames(cls.footer)}>
                <Button theme={ThemeButton.SECONDARY} onClick={onCancel}>
                    Отмена
                </Button>
                <Button theme={ThemeButton.SECONDARY} onClick={onConfirm}>
                    Подтвердить
                </Button>
            </div>
        </Modal>
    );
};

export default ConfirmDialog;
