import React, { useRef, useState } from "react";
import FilesDropzonePreview from "../FilesDropzonePreview/FilesDropzonePreview";
import { Accept, DropEvent, FileRejection, useDropzone } from "react-dropzone";
import FilesDropzoneValue from "../FilesDropzoneValue/FilesDropzoneValue";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import cls from "./FielsDropzone.module.scss";

interface FilesDropzoneProps {
  /**
   * Значение должно быть объектом с общим типом MIME в качестве ключей и массивом расширений файлов в качестве значений.
   * Пример:
   * accept: **{**
   * **'image/png': ['.png'],**
   * **'text/html': ['.html', '.htm'],**
   * **}**
   */
  accept?: Accept;
  className?: string;
  disabled?: boolean;
  readonly?: boolean;
  onChange?: (
    fileList: File[] | null,
    fileRejections?: FileRejection[],
    event?: DropEvent
  ) => void;
  /**
   * Возможность грузить несколько файлов
   */
  multi?: boolean;
  name?: string;
}

const FilesDropzone = ({
  className,
  onChange,
  accept,
  multi,
  disabled = false,
  readonly = false,
  name,
}: FilesDropzoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<File[] | null>(null);

  const canAddFile = !readonly && !disabled;

  const handleChange: typeof onChange = (fileList, fileRejections, event) => {
    const files: File[] = fileList ?? [];

    // если пользователь через Drag'N'Drop кинул несколько файлов в режиме multi = false
    if (
      !multi &&
      fileList?.length === 0 &&
      fileRejections &&
      fileRejections.length > 0
    ) {
      const accept = getInputProps().accept;
      if (accept?.includes(fileRejections?.[0].file.type))
        files.push(fileRejections?.[0].file);
    }

    onChange?.(files, fileRejections, event);
    setValue(files);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleChange,
    noClick: !canAddFile,
    noKeyboard: !canAddFile,
    accept,
    multiple: multi,
  });

  const handleOpenFileSelector = () => {
    inputRef.current?.click();
  };

  return (
    <div
      {...getRootProps({
        className: generateClassNames(cls.FilesDropzone, className),
      })}>
      <input
        {...getInputProps({ className: generateClassNames(cls.input) })}
        name={name}
        style={{
          display: "block",
          opacity: "0",
          pointerEvents: "none",
          height: "0px",
        }}
      />
      {canAddFile && <FilesDropzonePreview onOpen={handleOpenFileSelector} />}
      <FilesDropzoneValue value={value} />
    </div>
  );
};

export default FilesDropzone;
