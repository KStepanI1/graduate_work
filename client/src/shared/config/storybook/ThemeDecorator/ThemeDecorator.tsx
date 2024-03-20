import { StoryFn } from "@storybook/react";
import { Theme } from "app/providers/ThemeProvider";
import React from "react";

export const ThemeDecorator = (theme: Theme) =>
    function ThemeDecoratorFn(Story: StoryFn) {
        document.documentElement.setAttribute("data-theme", theme);
        return <Story />;
    };
