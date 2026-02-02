/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import Menu, { MenuItem } from ".";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe("Menu component", () => {
  const actions: MenuItem[] = [
    {
      id: "1",
      label: "Criar férias",
      leftIcon: <span>ICON1</span>,
      onClick: jest.fn(),
    },
    {
      id: "2",
      label: "Listar férias",
      leftIcon: <span>ICON2</span>,
      onClick: jest.fn(),
    },
  ];

  it("should render all menu items", () => {
    render(<Menu actions={actions} />);

    expect(screen.getByText("Criar férias")).toBeInTheDocument();
    expect(screen.getByText("Listar férias")).toBeInTheDocument();
  });

  it("should render left icons", () => {
    render(<Menu actions={actions} />);

    expect(screen.getByText("ICON1")).toBeInTheDocument();
    expect(screen.getByText("ICON2")).toBeInTheDocument();
  });

  it("should call correct handler when clicking item", () => {
    render(<Menu actions={actions} />);

    fireEvent.click(screen.getByText("Criar férias"));
    expect(actions[0].onClick).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText("Listar férias"));
    expect(actions[1].onClick).toHaveBeenCalledTimes(1);
  });

  it("should render arrow image for each item", () => {
    render(<Menu actions={actions} />);

    const arrows = screen.getAllByAltText("Seta direita");
    expect(arrows).toHaveLength(actions.length);
  });
});
