import { render, screen, fireEvent } from "@testing-library/react";
import { useFetch } from "../../hooks/use-fetch";
import { useValidation } from "../../hooks/use-validation";
import AddVacation from ".";

jest.mock("../../hooks/use-fetch");
jest.mock("../../hooks/use-validation");

const mockExecute = jest.fn();
const mockValidate = jest.fn();

(useValidation as jest.Mock).mockReturnValue({
  handleValidation: mockValidate,
  formErrors: {},
});

describe("AddVacation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading screen", () => {
      (useFetch as jest.Mock).mockReturnValue({
          execute: mockExecute,
          status: "loading",
      });
      render(<AddVacation close={jest.fn()} />);

      expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("renders fallback screen", () => {
      (useFetch as jest.Mock).mockReturnValue({
          execute: mockExecute,
          status: "error",
      });
      render(<AddVacation close={jest.fn()} />);

      expect(screen.getByTestId("fallback")).toBeInTheDocument();
  });

  it("renders modal title", () => {
    (useFetch as jest.Mock).mockReturnValue({
        execute: mockExecute,
        status: "initial",
    });
      render(<AddVacation close={jest.fn()} />);

      expect(
          screen.getByText("Solicitar férias para colaborador"),
      ).toBeInTheDocument();
  });

  it("renders all form fields", () => {
    (useFetch as jest.Mock).mockReturnValue({
        execute: mockExecute,
        status: "initial",
    });
    render(<AddVacation close={jest.fn()} />);

    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("Data Inicial")).toBeInTheDocument();
    expect(screen.getByLabelText("Data Final")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Aguardando aprovação pelo gestor"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Férias aprovadas pelo gestor"),
    ).toBeInTheDocument();
  });

  it("updates name input value", () => {
    (useFetch as jest.Mock).mockReturnValue({
        execute: mockExecute,
        status: "initial",
    });
    render(<AddVacation close={jest.fn()} />);

    const input = screen.getByLabelText("Nome") as HTMLInputElement;
    
    fireEvent.change(input, {
      target: { value: "João Silva" },
    });

    expect(input.value).toBe("João Silva");
  });

  it("updates date inputs", () => {
    (useFetch as jest.Mock).mockReturnValue({
        execute: mockExecute,
        status: "initial",
    });
    render(<AddVacation close={jest.fn()} />);

    const start = screen.getByLabelText("Data Inicial") as HTMLInputElement;
    const end = screen.getByLabelText("Data Final") as HTMLInputElement;

    fireEvent.change(start, {
      target: { value: "2026-02-10" },
    });

    fireEvent.change(end, {
      target: { value: "2026-02-20" },
    });

    expect(start.value).toBe("2026-02-10");
    expect(end.value).toBe("2026-02-20");
  });

  it("changes status when radio selected", () => {
    (useFetch as jest.Mock).mockReturnValue({
        execute: mockExecute,
        status: "initial",
    });
    render(<AddVacation close={jest.fn()} />);

    const approvedRadio = screen.getByLabelText(
      "Férias aprovadas pelo gestor",
    ) as HTMLInputElement;

    fireEvent.click(approvedRadio);

    expect(approvedRadio.checked).toBe(true);
  });

  it("calls close when clicking Cancelar button", () => {
    (useFetch as jest.Mock).mockReturnValue({
        execute: mockExecute,
        status: "initial",
    });
    const closeMock = jest.fn();

    render(<AddVacation close={closeMock} />);

    const cancelButton = screen.getByText("Cancelar");

    fireEvent.click(cancelButton);

    expect(closeMock).toHaveBeenCalledTimes(1);
  });

  it("should call fetch when clicking Confirmar Solicitação button", () => {
    const closeMock = jest.fn();

    (useFetch as jest.Mock).mockReturnValue({
        execute: mockExecute,
        status: "initial",
    });
    render(<AddVacation close={closeMock} />);

    const input = screen.getByLabelText("Nome") as HTMLInputElement;
    const start = screen.getByLabelText("Data Inicial") as HTMLInputElement;
    const end = screen.getByLabelText("Data Final") as HTMLInputElement;

    fireEvent.change(input, {
      target: { value: "João Silva" },
    });

    fireEvent.change(start, {
      target: { value: "2026-02-10" },
    });

    fireEvent.change(end, {
      target: { value: "2026-02-20" },
    });

    const confirmButton = screen.getByText("Confirmar Solicitação");

    fireEvent.click(confirmButton);

    expect(mockExecute).toHaveBeenCalledTimes(1);
  });

  it("should prevent fetch when clicking Confirmar Solicitação button if name has errors", () => {
    (useFetch as jest.Mock).mockReturnValue({
        execute: mockExecute,
        status: "initial",
    });
    (useValidation as jest.Mock).mockReturnValue({
      handleValidation: mockValidate,
      formErrors: { name: "O campo deve ter no mínimo 3 caracteres." },
    });

    const closeMock = jest.fn();

    render(<AddVacation close={closeMock} />);

    const input = screen.getByLabelText("Nome") as HTMLInputElement;
    const errorMessage = screen.getByText(
      "O campo deve ter no mínimo 3 caracteres.",
    ) as HTMLParagraphElement;

    fireEvent.change(input, {
      target: { value: "Jo" },
    });

    fireEvent.blur(input);

    const confirmButton = screen.getByText("Confirmar Solicitação");

    fireEvent.click(confirmButton);

    expect(errorMessage).toBeInTheDocument();

    expect(mockExecute).not.toHaveBeenCalled();
  });

  it("should prevent fetch when clicking Confirmar Solicitação button if date has errors", () => {
    (useFetch as jest.Mock).mockReturnValue({
        execute: mockExecute,
        status: "initial",
    });
    (useValidation as jest.Mock).mockReturnValue({
      handleValidation: mockValidate,
      formErrors: {
        startDate: "A data final deve ser posterior a 10/03/2026.",
      },
    });

    const closeMock = jest.fn();

    render(<AddVacation close={closeMock} />);

    const start = screen.getByLabelText("Data Inicial") as HTMLInputElement;
    const end = screen.getByLabelText("Data Final") as HTMLInputElement;
    const errorMessage = screen.getByText(
      "A data final deve ser posterior a 10/03/2026.",
    ) as HTMLParagraphElement;

    fireEvent.change(start, {
      target: { value: "2026-02-10" },
    });

    fireEvent.change(end, {
      target: { value: "2026-02-09" },
    });

    fireEvent.blur(start);
    fireEvent.blur(end);

    const confirmButton = screen.getByText("Confirmar Solicitação");

    fireEvent.click(confirmButton);

    expect(errorMessage).toBeInTheDocument();

    expect(mockExecute).not.toHaveBeenCalled();
  });
});
