declare module "*.scss" {
    interface IClassNames {
        [className: string]: string;
    }
    const classNames: IClassNames;
    export = classNames;
}

declare module "*.svg" {
    import React from "react";
    const SVG: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default SVG;
}
declare module "*.jpeg";
declare module "*.jpg";
declare module "*.png";

declare const __IS_DEV__: boolean;
declare const __API__: string;
declare const __SERVER__: string;
