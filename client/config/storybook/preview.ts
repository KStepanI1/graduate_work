import { Theme } from "./../../src/app/providers/ThemeProvider/lib/ThemeContext";
import { ThemeDecorator } from "./../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import type { Preview } from "@storybook/react";
import "app/styles/index.scss";

const preview: Preview = {
    decorators: [ThemeDecorator(Theme.LIGHT)],
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
