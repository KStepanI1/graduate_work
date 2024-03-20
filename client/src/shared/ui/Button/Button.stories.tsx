import type { Meta, StoryObj } from "@storybook/react";

import Button, { ThemeButton } from "./Button";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";

const meta = {
    title: "shared/Button",
    component: Button,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        children: "Button",
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: { theme: ThemeButton.PRIMARY },
};

export const PrimaryDark: Story = {
    args: { theme: ThemeButton.PRIMARY },
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Clear: Story = {
    args: {
        theme: ThemeButton.CLEAR,
    },
};

export const ClearDark: Story = {
    args: {
        theme: ThemeButton.CLEAR,
    },
};
ClearDark.decorators = [ThemeDecorator(Theme.DARK)];
