import { AboutPage } from "pages/About";
import {
  AdministrationLayout,
  ProductAdminPage,
} from "pages/AdministrationPage";
import { MainPage } from "pages/Main";
import { NotFoundPage } from "pages/NotFoundPage";
import { ProductPage } from "pages/ProductPage";
import { RouteProps } from "react-router-dom";

export type AppRouteProps = Omit<RouteProps, "children" | "index"> & {
  authOnly?: boolean;
  adminOnly?: boolean;
  children?: AppRouteProps[];
  index?: boolean;
};

export enum AppRoute {
  MAIN = "main",
  ABOUT = "about",
  PRODUCT_DETAILS = "product",
  ADMINISTRATION = "administration",
  PRODUCT_ADMIN = "administration_product",
  NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRoute, string> = {
  [AppRoute.MAIN]: "/",
  [AppRoute.ABOUT]: "/about",
  [AppRoute.PRODUCT_DETAILS]: "/product/",
  [AppRoute.ADMINISTRATION]: `/${AppRoute.ADMINISTRATION}`,
  [AppRoute.PRODUCT_ADMIN]: `/${AppRoute.ADMINISTRATION}/product`,
  [AppRoute.NOT_FOUND]: "*",
};

export const RouteName: Record<string, string> = {
  [RoutePath.main]: "Главная",
  [RoutePath.about]: "О нас",
  [RoutePath.administration]: "Админ панель",
  [RoutePath.administration_product]: "Администрирование товаров",
  [RoutePath.not_found]: "Страница не найдена",
};

export const routeConfig: { [key in AppRoute]?: AppRouteProps } = {
  [AppRoute.MAIN]: {
    index: true,
    path: RoutePath.main,
    element: <MainPage />,
  },
  [AppRoute.ABOUT]: {
    path: RoutePath.about,
    element: <AboutPage />,
  },
  [AppRoute.PRODUCT_DETAILS]: {
    path: `${RoutePath.product}:id`,
    element: <ProductPage />,
  },
  [AppRoute.ADMINISTRATION]: {
    path: RoutePath.administration,
    authOnly: true,
    adminOnly: true,
    element: <AdministrationLayout />,
    children: [
      {
        path: RoutePath.administration_product,
        element: <ProductAdminPage />,
      },
    ],
  },
  [AppRoute.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
};
