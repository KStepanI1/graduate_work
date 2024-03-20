import {
  AppRoute,
  RouteName,
  RoutePath,
} from "app/providers/router/routeConfig/routeConfig";

export const AppNavigation: Record<
  string,
  { path: string; title: string; hidden?: boolean }
> = {
  [AppRoute.MAIN]: {
    path: RoutePath[AppRoute.MAIN],
    title: RouteName[RoutePath[AppRoute.MAIN]],
  },
  [AppRoute.ABOUT]: {
    path: RoutePath[AppRoute.ABOUT],
    title: RouteName[RoutePath[AppRoute.ABOUT]],
  },
  [AppRoute.ADMINISTRATION]: {
    path: RoutePath[AppRoute.ADMINISTRATION],
    title: RouteName[RoutePath[AppRoute.ADMINISTRATION]],
  },
};
