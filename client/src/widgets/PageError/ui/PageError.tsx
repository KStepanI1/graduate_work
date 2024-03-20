import React, { memo } from "react";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import cls from "./PageError.module.scss";
import Button from "shared/ui/Button/Button";

export interface PageErrorProps {
  className?: string;
}

const PageError = (props: PageErrorProps) => {
  const { className } = props;

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className={generateClassNames(cls.PageError, className)}>
      <h2 className={generateClassNames(cls.PageError__Text)}>
        Произошла непредвиденная ошибка
      </h2>
      <Button
        className={generateClassNames(cls.PageError__ReloadButton)}
        onClick={reloadPage}>
        Обновить страницу
      </Button>
    </div>
  );
};

export default memo(PageError);
