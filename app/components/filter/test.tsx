/* eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Filter } from "./Filter";

jest.mock("next/image", () => ({
    __esModule: true,
    default: (props: object) => {
        return <img {...props} alt="Buscar" />;
    },
}));

describe("Filter component", () => {
    const mockAction = jest.fn();

    const options = [
        { label: "Name", value: "name" },
        { label: "Email", value: "email" },
    ];

    const setup = () =>
        render(<Filter action={mockAction} options={options} />);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render all filter options", () => {
        setup();

        expect(
            screen.getByRole("option", { name: "Name" }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("option", { name: "Email" }),
        ).toBeInTheDocument();
    });

    it("should initialize select with the first option value", () => {
        setup();

        const select = screen.getByRole("combobox");

        expect(select).toHaveValue("name");
    });

    it("should update select value when user changes option", async () => {
        const user = userEvent.setup();
        setup();

        const select = screen.getByRole("combobox");

        await user.selectOptions(select, "email");

        expect(select).toHaveValue("email");
    });

    it("should update input value when typing", async () => {
        const user = userEvent.setup();
        setup();

        const input = screen.getByRole("textbox");

        await user.type(input, "John");

        expect(input).toHaveValue("John");
    });

    it("should call action with correct payload when form is submitted", async () => {
        const user = userEvent.setup();
        setup();

        const input = screen.getByRole("textbox");
        const button = screen.getByRole("button", { name: /buscar/i });

        await user.type(input, "Maria");
        await user.click(button);

        expect(mockAction).toHaveBeenCalledWith({
            page: 1,
            filterType: "name",
            filterValue: "Maria",
        });
    });

    it("should submit updated select value in payload", async () => {
        const user = userEvent.setup();
        setup();

        const select = screen.getByRole("combobox");
        const button = screen.getByRole("button", { name: /buscar/i });

        await user.selectOptions(select, "email");
        await user.click(button);

        expect(mockAction).toHaveBeenCalledWith({
            page: 1,
            filterType: "email",
            filterValue: "",
        });
    });

    it("should render search button with icon", () => {
        setup();

        const button = screen.getByRole("button", { name: /buscar/i });
        const image = screen.getByAltText("Buscar");

        expect(button).toBeInTheDocument();
        expect(image).toBeInTheDocument();
    });
});
