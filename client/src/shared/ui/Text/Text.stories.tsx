import React from "react";
import Text, { TextTheme } from "shared/ui/Text/Text";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
    title: "shared/Text",
    component: Text,
    argTypes: {},
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
Primary.args = {
    title: "Title lorem ipsun",
    text: "Description Description Description Description",
};

export const Error: Story = { args: { theme: TextTheme.ERROR } };
Error.args = {
    title: "Title lorem ipsun",
    text: "Description Description Description Description",
    theme: TextTheme.ERROR,
};

export const OnlyTitle: Story = {};
OnlyTitle.args = {
    title: "Title lorem ipsun",
};

export const OnlyText: Story = {};
OnlyText.args = {
    text: "Description Description Description Description",
};

export const PrimaryDark: Story = {};
PrimaryDark.args = {
    title: "Title lorem ipsun",
    text: "Description Description Description Description",
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTitleDark: Story = {};
OnlyTitleDark.args = {
    title: "Title lorem ipsun",
};
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTextDark: Story = {};
OnlyTextDark.args = {
    text: "Description Description Description Description",
};
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];
