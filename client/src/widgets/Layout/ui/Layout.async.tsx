import { lazy } from "react";

const LayoutAsync = lazy(() => import("./Layout"));

export { LayoutAsync as Layout };
