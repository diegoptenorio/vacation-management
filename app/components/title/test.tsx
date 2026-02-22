import { render, screen } from "@testing-library/react";
import Title from ".";

describe("Title", () => {
  it("should render correct heading based on type", () => {
    render(<Title type="h1">My Heading</Title>);

    expect(screen.getByText("My Heading")).toBeInTheDocument();
  });
});
