import React, { memo } from "react";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import cls from "./Sidebar.module.scss";
import { NavLink } from "react-router-dom";

export interface SidebarProps {
  data: { title: string; path: string }[];
  className?: string;
  title?: string;
}

const Sidebar = (props: SidebarProps) => {
  const { data, className, title } = props;

  return (
    <nav className={generateClassNames(cls.Sidebar, className)}>
      {title && <h3>{title}</h3>}
      <ul>
        {data.map((applink) => (
          <li
            key={applink.path}
            className={generateClassNames(cls.NavbarItem, className)}>
            <NavLink
              to={applink.path}
              className={({ isActive, isPending }) =>
                generateClassNames(cls.link, {
                  [cls.active]: isActive,
                  [cls.pending]: isPending,
                })
              }>
              {applink.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default memo(Sidebar);
