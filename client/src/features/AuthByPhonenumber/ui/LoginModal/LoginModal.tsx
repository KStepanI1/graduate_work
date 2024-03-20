import React, { Suspense } from "react";
import Modal, { ExtendableModalProps } from "shared/ui/Modal/Modal";
import { LoginFormAsync } from "../LoginForm/LoginForm.async";
import Loader from "shared/ui/Loader/Loader";

export interface LoginModalProps extends ExtendableModalProps {}

const LoginModal = (props: LoginModalProps) => {
    const { onClose, ...otherProps } = props;

    return (
        <Modal {...otherProps} onClose={onClose} lazy>
            <Suspense fallback={<Loader />}>
                <LoginFormAsync onSuccess={onClose} />
            </Suspense>
        </Modal>
    );
};

export default LoginModal;
