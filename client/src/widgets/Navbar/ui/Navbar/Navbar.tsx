import React, { memo } from "react";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import cls from "./Navbar.module.scss";
import {
  AppRoute,
  RoutePath,
} from "app/providers/router/routeConfig/routeConfig";
import NavbarItem from "../NavbarItem/NavbarItem";
import { AppNavigation } from "../../config/navigation";

export interface NavbarProps {
  className?: string;
}

const Navbar = memo((props: NavbarProps) => {
  const { className } = props;

  return (
    <nav className={generateClassNames(cls.Navbar, className)}>
      <ul className={generateClassNames(cls.NavbarItems)}>
        {Object.keys(RoutePath)
          .filter((route) => !!AppNavigation[route])
          .map((route: AppRoute) => (
            <NavbarItem
              key={route}
              title={AppNavigation[route].title}
              to={AppNavigation[route].path}></NavbarItem>
          ))}
      </ul>
    </nav>
  );
});

Navbar.displayName = "Navbar";

export { Navbar };
