import { useState } from "react";
import Button from "../../components/button";
import Modal from "../../components/modal";
import { useFetch } from "../../hooks/use-fetch";
import { useValidation } from "../../hooks/use-validation";
import ENDPOINT from "../../constants/endpoint";
import Title from "../../components/title";
import Loading from "../../components/loading";
import Fallback from "../../components/fallback";

interface AddVacationProps {
  close: () => void;
};

export default function AddVacation({ close }: AddVacationProps) {
  const [form, setForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
    status: "pending",
  });

  const { execute, status } = useFetch();
  const { formErrors, handleValidation } = useValidation({
    name: form.name,
    startDate: form.startDate,
    endDate: form.endDate
  });

  const formHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  const confirmNewVacation = () => {
    execute(ENDPOINT.VACATIONS, {
      method: "POST",
      body: JSON.stringify(form),
    });
  };

  const isFormCorrect = Object.values(formErrors).every(
    (error) => error === "",
  );
  const isFormFilled = Object.values(form).every((value) => value !== "");
  const formIsValid = status === "initial" && isFormCorrect && isFormFilled;

  return (
    <Modal
      header={
        <Title type="h3">Solicitar férias para colaborador</Title>
      }
      body={
        <>
          {status === "initial" && (
            <>
              <label htmlFor="add-vacation-name">Nome</label>
              <input
                type="text"
                id="add-vacation-name"
                name="name"
                className="w-full p-2 rounded-md border border-gray-300 mb-4"
                value={form.name}
                onChange={formHandler}
                maxLength={80}
                onBlur={(e) => handleValidation({ e, rules: { minLength: 3 } })}
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm mb-4">{formErrors.name}</p>
              )}
              <div
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:justify-between
"
              >
                <div className="flex flex-col sm:w-[48%] w-full">
                  <label
                    htmlFor="add-vacation-starts"
                    className="text-[#1D1D1D] font-[15px]"
                  >
                    Data Inicial
                  </label>
                  <input
                    type="date"
                    id="add-vacation-starts"
                    name="startDate"
                    className="w-full p-2 rounded-md border border-gray-300 mb-4"
                    value={form.startDate}
                    onChange={formHandler}
                    onBlur={(e) =>
                      handleValidation({ e, rules: { isBefore: form.endDate } })
                    }
                    max={form.endDate}
                  />
                </div>
                <div className="flex flex-col sm:w-[48%] w-full">
                  <label
                    htmlFor="add-vacation-ends"
                    className="text-[#1D1D1D] font-[15px]"
                  >
                    Data Final
                  </label>
                  <input
                    type="date"
                    id="add-vacation-ends"
                    name="endDate"
                    className="w-full p-2 rounded-md border border-gray-300 mb-4"
                    value={form.endDate}
                    onChange={formHandler}
                    onBlur={(e) =>
                      handleValidation({
                        e,
                        rules: { isAfter: form.startDate },
                      })
                    }
                    min={form.startDate}
                  />
                </div>
              </div>
              {formErrors.startDate && (
                <p className="text-red-500 text-sm mb-4">
                  {formErrors.startDate}
                </p>
              )}
              {formErrors.endDate && (
                <p className="text-red-500 text-sm mb-4">
                  {formErrors.endDate}
                </p>
              )}
              <div className="flex flex-col">
                <label className="mb-2 text-[#1D1D1D] font-[15px]">
                  Situação
                </label>
                <div className="flex items-center left mb-2">
                  <input
                    type="radio"
                    id="status-pending"
                    name="status"
                    value="pending"
                    checked={form.status === "pending"}
                    onChange={formHandler}
                  />
                  <label
                    htmlFor="status-pending"
                    className="ml-2 text-[#1D1D1D] font-[15px]"
                  >
                    Aguardando aprovação pelo gestor
                  </label>
                </div>
                <div className="flex items-center left">
                  <input
                    type="radio"
                    id="status-approved"
                    name="status"
                    value="approved"
                    checked={form.status === "approved"}
                    onChange={formHandler}
                  />
                  <label
                    htmlFor="status-approved"
                    className=" ml-2 text-[#1D1D1D] font-[15px]"
                  >
                    Férias aprovadas pelo gestor
                  </label>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:justify-between mt-8">
                <Button text="Cancelar" onClick={close} />
                <Button
                  disabled={!formIsValid}
                  text="Confirmar Solicitação"
                  variant="active"
                  onClick={() => confirmNewVacation()}
                />
              </div>
            </>
          )}
          {status === "loading" && <Loading />}
          {status === "error" && (
            <>
              <Fallback />
              <div className="w-full flex items-center justify-end mt-8">
                <Button text="Fechar" onClick={close} />
              </div>
            </>
          )}
          {status === "success" && (
            <>
              <p>Solicitação enviada com sucesso!</p>
              <div className="w-full flex items-center justify-end mt-8">
                <Button text="Fechar" onClick={close} />
              </div>
            </>
          )}
        </>
      }
    />
  );
}
