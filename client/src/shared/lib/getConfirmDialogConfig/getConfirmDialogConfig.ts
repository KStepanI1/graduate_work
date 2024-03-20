import { ConfirmDialogProps } from "shared/ui/ConfirmDialog/ConfirmDialog";

export enum ConfirmDialogConfigName {
    DELETE = "delete",
}

export interface GetConfirmDialogConfigArgs {
    configName: ConfirmDialogConfigName;
    objectName?: string;
    onConfirm?: () => void;
    onClose?: () => void;
}

export type ConfirmDialogConfig = Omit<ConfirmDialogProps, "isOpen"> | null;

export const getConfirmDialogConfig = ({
    configName,
    objectName = "объект",
    onClose,
    onConfirm,
}: GetConfirmDialogConfigArgs): ConfirmDialogConfig => {
    switch (configName) {
        case ConfirmDialogConfigName.DELETE:
            return {
                title: `Подтверждение удаления "${objectName}"`,
                description: `Подтвердите удаление "${objectName}"`,
                onConfirm: () => {
                    onConfirm?.();
                    onClose?.();
                },
                onCancel: onClose,
            };
    }

    return null;
};
