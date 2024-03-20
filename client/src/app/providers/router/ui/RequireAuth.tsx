import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RoutePath } from "../routeConfig/routeConfig";
import { getUserAuthData } from "entities/User";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const auth = useSelector(getUserAuthData);
    const location = useLocation();

    if (!auth) {
        return (
            <Navigate to={RoutePath.main} state={{ from: location }} replace />
        );
    }

    return children;
};

export default RequireAuth;
