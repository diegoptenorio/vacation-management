import { render, screen } from "@testing-library/react";
import Modal from ".";

describe("Modal", () => {
  it("should render header and body", () => {
    render(
      <Modal header={<div>Header Content</div>} body={<div>Body Content</div>} />,
    );

    expect(screen.getByText("Header Content")).toBeInTheDocument();
    expect(screen.getByText("Body Content")).toBeInTheDocument();
  });
});
