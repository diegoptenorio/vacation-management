import { renderHook, act } from "@testing-library/react";
import { useValidation } from ".";

describe("useValidation hook", () => {
  it("should initialize formErrors with initial form", () => {
    const initialForm = { name: "", startDate: "" };

    const { result } = renderHook(() => useValidation(initialForm));

    expect(result.current.formErrors).toEqual(initialForm);
  });

  it("should set error when minLength rule fails", () => {
    const { result } = renderHook(() => useValidation({ name: "" }));

    const event = {
      target: {
        name: "name",
        value: "ab",
      },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleValidation({
        e: event,
        rules: { minLength: 5 },
      });
    });

    expect(result.current.formErrors.name).toBe(
      "O campo deve ter no mínimo 5 caracteres.",
    );
  });

  it("should not set error when minLength passes", () => {
    const { result } = renderHook(() => useValidation({ name: "" }));

    const event = {
      target: {
        name: "name",
        value: "abcdef",
      },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleValidation({
        e: event,
        rules: { minLength: 5 },
      });
    });

    expect(result.current.formErrors.name).toBe("");
  });

  it("should set error when date is after allowed (isBefore)", () => {
    const { result } = renderHook(() => useValidation({ start: "" }));

    const event = {
      target: {
        name: "start",
        value: "2024-01-10",
      },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleValidation({
        e: event,
        rules: { isBefore: "2024-01-05" },
      });
    });

    expect(result.current.formErrors.start).toBe(
      "A data deve ser anterior ou igual a 05/01/2024.",
    );
  });

  it("should set error when date is before allowed (isAfter)", () => {
    const { result } = renderHook(() => useValidation({ end: "" }));

    const event = {
      target: {
        name: "end",
        value: "2024-01-01",
      },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleValidation({
        e: event,
        rules: { isAfter: "2024-01-05" },
      });
    });

    expect(result.current.formErrors.end).toBe(
      "A data deve ser posterior ou igual a 05/01/2024.",
    );
  });

  it("should allow updating multiple fields independently", () => {
    const { result } = renderHook(() => useValidation({ name: "", age: "" }));

    const nameEvent = {
      target: { name: "name", value: "a" },
    } as React.ChangeEvent<HTMLInputElement>;

    const ageEvent = {
      target: { name: "age", value: "123" },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleValidation({
        e: nameEvent,
        rules: { minLength: 3 },
      });

      result.current.handleValidation({
        e: ageEvent,
        rules: { minLength: 2 },
      });
    });

    expect(result.current.formErrors).toEqual({
      name: "O campo deve ter no mínimo 3 caracteres.",
      age: "",
    });
  });
});
