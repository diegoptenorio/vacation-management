import { render, screen } from "@testing-library/react";
import Badge, { BadgeProps } from ".";

describe("Badge component", () => {
    it("should render label correctly", () => {
        render(<Badge intention="default" label="Teste" />);

        expect(screen.getByText("Teste")).toBeInTheDocument();
    });

    it("should apply base classes correctly", () => {
        render(<Badge intention="default" label="Base" />);

        const badge = screen.getByText("Base");

        expect(badge).toHaveClass(
            "px-4",
            "py-2",
            "rounded-full",
            "text-[#555555]",
            "text-[12px]",
        );
    });

    it("should apply the correct class for each intention", () => {
        const intentions = {
            default: "bg-[#E6E6E6]",
            waiting: "bg-[#EDE1F7]",
            warning: "bg-[#FCE5A8]",
            danger: "bg-[#FFD3D3]",
            success: "bg-green-500",
        } as const;

        Object.entries(intentions).forEach(([intention, expectedClass]) => {
            render(
                <Badge intention={intention as BadgeProps["intention"]} label={intention} />,
            );

            const badge = screen.getByText(intention);
            expect(badge).toHaveClass(expectedClass);
        });
    });
});
