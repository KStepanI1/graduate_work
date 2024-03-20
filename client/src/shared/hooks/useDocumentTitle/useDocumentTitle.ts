import { useEffect } from "react";
import { APP_MAIN_TITLE } from "shared/const/app";

export const useDocumentTitle = (title: string): void => {
    useEffect(() => {
        document.title = title ?? APP_MAIN_TITLE;
    }, [title]);
};
