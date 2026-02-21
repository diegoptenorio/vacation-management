/* eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react";
import { Detail } from "./Detail";
import mountStringByQuantity from "../../../utils/match-string-to-quantity";
import { BadgeProps } from "../badge";

jest.mock("next/image", () => ({
    __esModule: true,
    default: (props: object) => {
        return <img {...props} alt="Seta direita" />;
    },
}));

jest.mock("../../components/badge", () => ({
    __esModule: true,
    default: ({ intention, label }: BadgeProps) => (
        <div data-testid="badge">
            {intention}-{label}
        </div>
    ),
}));

jest.mock("../../../utils/match-string-to-quantity", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("Detail component", () => {
    const defaultProps = {
        quantity: "1",
        intention: "default" as const,
        alternativeText: "Example label",
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should renders without crashing", () => {
        (mountStringByQuantity as jest.Mock).mockReturnValue("1 pessoa");

        render(<Detail {...defaultProps} />);

        expect(screen.getByTestId("badge")).toBeInTheDocument();
    });

    it("should passes correct props to Badge", () => {
        (mountStringByQuantity as jest.Mock).mockReturnValue("1 pessoa");

        render(<Detail {...defaultProps} />);

        expect(screen.getByTestId("badge")).toHaveTextContent(
            "default-Example label",
        );
    });

    it("should renders singular quantity text", () => {
        (mountStringByQuantity as jest.Mock).mockReturnValue("1 pessoa");

        render(<Detail {...defaultProps} />);

        expect(screen.getByText("1 pessoa")).toBeInTheDocument();

        expect(mountStringByQuantity).toHaveBeenCalledWith({
            quantity: "1",
            singular: " pessoa",
            plural: " pessoas",
        });
    });

    it("should renders plural quantity text", () => {
        (mountStringByQuantity as jest.Mock).mockReturnValue("3 pessoas");

        render(<Detail {...defaultProps} quantity="3" />);

        expect(screen.getByText("3 pessoas")).toBeInTheDocument();
    });

    it("should renders arrow icon image", () => {
        (mountStringByQuantity as jest.Mock).mockReturnValue("1 pessoa");

        render(<Detail {...defaultProps} />);

        const image = screen.getByAltText("Seta direita");

        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("width", "10");
        expect(image).toHaveAttribute("height", "10");
    });
});
