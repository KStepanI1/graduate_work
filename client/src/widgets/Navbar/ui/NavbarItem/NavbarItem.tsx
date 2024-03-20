import React, { memo } from "react";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import cls from "./NavbarItem.module.scss";
import { NavLink } from "react-router-dom";

export interface NavbarItemProps {
  to: string;
  className?: string;
  title: string;
}

const NavbarItem = (props: NavbarItemProps) => {
  const { to, className, title } = props;

  return (
    <li className={generateClassNames(cls.NavbarItem, className)}>
      <NavLink
        to={to}
        className={({ isActive, isPending }) =>
          generateClassNames(cls.link, {
            [cls.active]: isActive,
            [cls.pending]: isPending,
          })
        }>
        {title}
      </NavLink>
    </li>
  );
};

export default memo(NavbarItem);
