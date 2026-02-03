/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

interface ValidationRules {
  minLength?: number;
  isBefore?: string;
  isAfter?: string;
}

interface handleValidationProps {
  e: React.ChangeEvent<HTMLInputElement>;
  rules?: ValidationRules;
}

interface validationProps extends ValidationRules {
  event: React.ChangeEvent<HTMLInputElement>;
}

function formatDate (date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR");
};

function parseYMD (s: string) {
  const [y, m, d] = s.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
};

function compareDates(a: string, b: string) {
  return Boolean(a && b) && parseYMD(a) < parseYMD(b);
};

export function useValidation(form: any) {
  const [formErrors, setFormErrors] = useState(form);

  const validation = ({
    event,
    minLength = 0,
    isBefore,
    isAfter,
  }: validationProps) => {
    const { value } = event.target;
    let error = "";
    if (minLength && value.length < minLength) {
      error = `O campo deve ter no mínimo ${minLength} caracteres.`;
    }
    if (isBefore && compareDates(isBefore, value)) {
      error = `A data deve ser anterior ou igual a ${formatDate(isBefore)}.`;
    }
    if (isAfter && compareDates(value, isAfter)) {
      error = `A data deve ser posterior ou igual a ${formatDate(isAfter)}.`;
    }
    return error;
  };

  const handleValidation = ({ e, rules }: handleValidationProps) => {
    setFormErrors((state: object) => {
      return {
        ...state,
        [e.target.name]: validation({ event: e, ...rules }),
      };
    });
  };
  return {
    handleValidation,
    formErrors,
    setFormErrors,
  };
}
