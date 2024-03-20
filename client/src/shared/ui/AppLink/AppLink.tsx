import React, { memo } from "react";
import { Link, LinkProps } from "react-router-dom";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import cls from "./AppLink.module.scss";

export enum AppLinkTheme {
  PRIMARY = "primary",
  CLEAR = "clear",
}

export interface AppLinkProps extends LinkProps {
  theme?: AppLinkTheme;
  nav?: boolean;
}

const AppLink = (props: AppLinkProps) => {
  const { className, children, theme = AppLinkTheme.PRIMARY } = props;

  return (
    <Link
      {...props}
      className={generateClassNames(cls.AppLink, className, cls[theme])}>
      {children}
    </Link>
  );
};

export default memo(AppLink);
