/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";
import path from "path";

const config: Config = {
    globals: {
        __IS_DEV__: true,
        __API__: "",
    },
    clearMocks: true,
    testEnvironment: "jsdom",
    coveragePathIgnorePatterns: ["\\\\node_modules\\\\"],
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
    moduleDirectories: ["node_modules"],
    modulePaths: ["<rootDir>src"],
    testMatch: [
        // Обнаружил разницу между МАК ОС и ВИНДОУС!!!
        "<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)",
    ],
    rootDir: "../../",
    setupFilesAfterEnv: ["<rootDir>config/jest/setupTests.ts"],
    moduleNameMapper: {
        "\\.s?css$": "identity-obj-proxy",
        "\\.svg": path.resolve(__dirname, "jestEmptyComponent.tsx"),
    },
    transform: {
        "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
    },
};

export default config;
