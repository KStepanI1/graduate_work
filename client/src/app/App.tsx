import { useTheme } from "app/providers/ThemeProvider";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import { AppRouter } from "./providers/router";
import { useEffect } from "react";
import { cehckAuth } from "entities/User";
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";
import { useLocation } from "react-router-dom";
import { useDocumentTitle } from "shared/hooks/useDocumentTitle/useDocumentTitle";
import { RouteName } from "./providers/router/routeConfig/routeConfig";
import { useSelector } from "react-redux";
import { getUserMounted } from "entities/User/model/selectors/getUserMounted/getUserMounted";
import PageLoader from "widgets/PageLoader/PageLoader";

const App = () => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const mounted = useSelector(getUserMounted);

    useDocumentTitle(RouteName[location.pathname]);

    useEffect(() => {
        dispatch(cehckAuth());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={generateClassNames("app", theme)}>
            {mounted ? <AppRouter /> : <PageLoader />}
        </div>
    );
};

export default App;
