import React, { memo } from "react";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import cls from "./Layout.module.scss";
import { Outlet } from "react-router-dom";
import { Header } from "widgets/Header";

export interface LayoutProps {
  className?: string;
}

const Layout = (props: LayoutProps) => {
  const { className } = props;
  return (
    <div className={generateClassNames(cls.Layout, className)}>
      <Header />
      <main className={cls.Layout__Content}>
        <Outlet />
      </main>
    </div>
  );
};

export default memo(Layout);
