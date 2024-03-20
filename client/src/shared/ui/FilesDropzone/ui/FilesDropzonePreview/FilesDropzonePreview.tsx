import React from "react";
import Button, { ThemeButton } from "../../../Button/Button";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";

interface FilesDropzonePreviewProps {
  text?: string;
  onOpen?: () => void;
}

const MAIN_CLASSNAME = "dragndrop-preview";

const FilesDropzonePreview = ({
  text = "Перетащите файлы или выберите на компьютере",
  onOpen,
}: FilesDropzonePreviewProps) => {
  const ClassName = generateClassNames(MAIN_CLASSNAME);

  return (
    <div className={ClassName}>
      <p>{text}</p>
      <Button theme={ThemeButton.SECONDARY} onClick={onOpen}>
        Открыть
      </Button>
    </div>
  );
};

export default FilesDropzonePreview;
