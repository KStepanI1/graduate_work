import React from "react";
import cls from "./NotFoundPage.module.scss";
import AppLink, { AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { RoutePath } from "app/providers/router/routeConfig/routeConfig";

export interface NotFoundPageProps {}

const NotFoundPage = (props: NotFoundPageProps) => {
    return (
        <div className={cls.NotFoundPage}>
            <h1>
                упс... <br />
                страница не найдена
            </h1>
            <p>
                Можете перейти на{" "}
                <AppLink to={RoutePath.main} theme={AppLinkTheme.PRIMARY}>
                    главную
                </AppLink>{" "}
                или посмотреть подборку популярных товаров.
            </p>
        </div>
    );
};

export default NotFoundPage;
