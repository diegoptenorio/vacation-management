import { render, screen } from "@testing-library/react";
import Card from ".";

describe("Card", () => {
  it("should render children content", () => {
    render(
      <Card>
        <span>Conteúdo do Card</span>
      </Card>,
    );

    expect(screen.getByText("Conteúdo do Card")).toBeInTheDocument();
  });
});
