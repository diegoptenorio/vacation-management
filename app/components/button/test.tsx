import { render, screen, fireEvent } from "@testing-library/react";
import Button from ".";

describe("Button", () => {
  it("should  when clicked", () => {
    const handleClick = jest.fn();
    render(<Button text="Salvar" onClick={handleClick} />);
    fireEvent.click(screen.getByText("Salvar"));
    expect(screen.getByText("Salvar")).toBeInTheDocument();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
