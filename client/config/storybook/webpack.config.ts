import { buildCssLoader } from "../build/loaders/buildCssLoader";
import path from "path";
import { Configuration, DefinePlugin, RuleSetRule } from "webpack";
import { BuildPaths } from "../build/types/config";

export default ({ config }: { config: Configuration }) => {
    const paths: BuildPaths = {
        build: "",
        html: "",
        entry: "",
        src: path.resolve(__dirname, "..", "..", "src"),
    };
    config!.resolve!.modules!.push(paths.src);
    config!.resolve!.extensions!.push(".ts", ".tsx");

    config!.module!.rules = config.module!.rules!.map((rule) => {
        const r = rule as unknown as RuleSetRule;

        if (/svg/.test(r.test as string)) {
            return { ...r, exclude: /\.svg$/i };
        }

        return rule;
    });

    config!.module!.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
    });
    config!.module!.rules.push(buildCssLoader(true));

    config!.plugins!.push(
        new DefinePlugin({
            __IS_DEV__: JSON.stringify(true),
            __API__: JSON.stringify(""),
        })
    );
    return config;
};
