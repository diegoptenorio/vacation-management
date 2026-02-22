import { render, screen } from "@testing-library/react";
import Table from ".";

describe("Table", () => {
  it("should render table headers", () => {
    render(<Table header={["Col A", "Col B"]} content={[]} />);

    expect(screen.getByText("Col A")).toBeInTheDocument();
    expect(screen.getByText("Col B")).toBeInTheDocument();
  });
});
