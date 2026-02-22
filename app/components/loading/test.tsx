import { render, screen } from "@testing-library/react";
import Loading from ".";

describe("Loading", () => {
  it("should render loading indicator", () => {
    render(<Loading />);

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });
});
