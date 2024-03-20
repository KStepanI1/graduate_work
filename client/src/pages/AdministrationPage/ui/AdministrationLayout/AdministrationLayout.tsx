import { RoutePath } from "app/providers/router/routeConfig/routeConfig";
import React from "react";
import { Outlet } from "react-router-dom";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import Sidebar from "widgets/Sidebar/Sidebar";
import cls from "./AdministrationLayout.module.scss";

const AdministrationLayout = () => {
  return (
    <div className={generateClassNames(cls.AdministrationLayout)}>
      <Sidebar
        title="Панель администратора"
        data={[
          {
            path: RoutePath.administration,
            title: "Главная",
          },
          {
            path: RoutePath.administration_product,
            title: "Товары",
          },
        ]}
      />
      <Outlet />
    </div>
  );
};

export default AdministrationLayout;
