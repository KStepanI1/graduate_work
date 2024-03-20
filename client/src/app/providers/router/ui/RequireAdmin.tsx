import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RoutePath } from "../routeConfig/routeConfig";
import { getUserAuthData } from "entities/User";
import { UserRole } from "entities/User/model/types/User";

const RequireAdmin = ({ children }: { children: JSX.Element }) => {
    const auth = useSelector(getUserAuthData);
    const location = useLocation();

    // if (auth?.user?.role !== UserRole.ADMIN) {
    //   return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
    // }

    return children;
};

export default RequireAdmin;
