import { render, screen } from "@testing-library/react";
import Button, { ThemeButton } from "./Button";

describe("", () => {
    test("", () => {
        render(<Button>TEST</Button>);
        expect(screen.getByText("TEST")).toBeInTheDocument();
    });

    test("with class clear", () => {
        render(<Button theme={ThemeButton.CLEAR}>TEST</Button>);
        expect(screen.getByText("TEST")).toHaveClass("clear");
    });
});
