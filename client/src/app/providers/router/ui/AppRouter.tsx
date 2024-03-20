import { Suspense, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import {
    AppRoute,
    AppRouteProps,
    routeConfig,
} from "app/providers/router/routeConfig/routeConfig";
import { Layout } from "widgets/Layout";
import PageLoader from "widgets/PageLoader/PageLoader";
import RequireAuth from "./RequireAuth";
import { PageError } from "widgets/PageError";
import { ErrorBoundary } from "app/providers/ErrorBoundary";
import { NotFoundPage } from "pages/NotFoundPage";
import RequireAdmin from "./RequireAdmin";

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRouteProps) => {
        let susspensedElement = (
            <Suspense fallback={<PageLoader />}>
                <ErrorBoundary fallback={<PageError />}>
                    <div className="page-wrapper">{route.element}</div>
                </ErrorBoundary>
            </Suspense>
        );

        if (route.authOnly) {
            susspensedElement = <RequireAuth>{susspensedElement}</RequireAuth>;
        }

        if (route.adminOnly) {
            susspensedElement = (
                <RequireAdmin>{susspensedElement}</RequireAdmin>
            );
        }

        return (
            <Route
                key={route.path}
                element={susspensedElement}
                path={route.path}
                index={route.index as any}
            >
                {route.children?.map(renderWithWrapper)}
            </Route>
        );
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {Object.values(routeConfig).map(renderWithWrapper)}
            </Route>
            <Route element={<NotFoundPage />} path={AppRoute.NOT_FOUND} />
        </Routes>
    );
};

export { AppRouter };
