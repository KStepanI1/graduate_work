import React from "react";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";

interface FilesDropzoneValueProps {
  value?: File[] | null;
}

const MAIN_CLASSNAME = "dragndrop-files";

const FilesDropzoneValue = ({ value }: FilesDropzoneValueProps) => {
  const isMulti = !!value?.length && value.length > 1;

  const ClassName = generateClassNames(MAIN_CLASSNAME, {
    [MAIN_CLASSNAME + "--multi"]: isMulti,
    [MAIN_CLASSNAME + "--single"]: !isMulti,
  });

  if (!isMulti) {
    return <h4 className={ClassName}>{value?.map((file) => file.name)}</h4>;
  }

  return (
    <ul className={ClassName}>
      {value?.map((file) => (
        <li key={file.lastModified}>{file.name}</li>
      ))}
    </ul>
  );
};

export default FilesDropzoneValue;
