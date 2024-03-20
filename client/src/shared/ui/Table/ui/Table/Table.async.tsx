import { lazy } from "react";
import Table from "./Table";

const TableAsync = lazy(() => import("./Table")) as typeof Table;

export { TableAsync };
