/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from ".";

jest.mock("next/image", () => ({
    __esModule: true,
    default: (props: any) => {
        return <img {...props} />;
    },
}));

describe("Pagination", () => {
    const onPageChange = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should display only the Next button when on the first page", () => {
        render(
            <Pagination
                totalPages={5}
                currentPage={1}
                onPageChange={onPageChange}
            />,
        );

        expect(screen.queryByText("Anterior")).not.toBeInTheDocument();
        expect(screen.getByText("Próximo")).toBeInTheDocument();
    });

    it("should display only the Previous button when on the last page", () => {
        render(
            <Pagination
                totalPages={5}
                currentPage={5}
                onPageChange={onPageChange}
            />,
        );

        expect(screen.getByText("Anterior")).toBeInTheDocument();
        expect(screen.queryByText("Próximo")).not.toBeInTheDocument();
    });

    it("should display both Previous and Next buttons when on an intermediate page", () => {
        render(
            <Pagination
                totalPages={5}
                currentPage={3}
                onPageChange={onPageChange}
            />,
        );

        expect(screen.getByText("Anterior")).toBeInTheDocument();
        expect(screen.getByText("Próximo")).toBeInTheDocument();
    });

    it("should call onPageChange with the previous page when clicking Previous", () => {
        render(
            <Pagination
                totalPages={5}
                currentPage={3}
                onPageChange={onPageChange}
            />,
        );

        fireEvent.click(screen.getByText("Anterior"));

        expect(onPageChange).toHaveBeenCalledWith(2);
        expect(onPageChange).toHaveBeenCalledTimes(1);
    });

    it("should call onPageChange with the next page when clicking Next", () => {
        render(
            <Pagination
                totalPages={5}
                currentPage={3}
                onPageChange={onPageChange}
            />,
        );

        fireEvent.click(screen.getByText("Próximo"));

        expect(onPageChange).toHaveBeenCalledWith(4);
        expect(onPageChange).toHaveBeenCalledTimes(1);
    });
});
