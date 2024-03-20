import React, { memo } from "react";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import cls from "./PageLoader.module.scss";
import Loader, { LoaderVariant } from "shared/ui/Loader/Loader";

export interface PageLoaderProps {
  className?: string;
}

const PageLoader = (props: PageLoaderProps) => {
  const { className } = props;

  return (
    <div className={generateClassNames(cls.PageLoader, className)}>
      <Loader variant={LoaderVariant.LARGE} className={cls.loader} />
    </div>
  );
};

export default memo(PageLoader);
