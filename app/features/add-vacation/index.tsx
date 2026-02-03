import { useState } from "react";
import Button from "../../components/button";
import Modal from "../../components/modal";
import { useFetch } from "../../hooks/use-fetch";
import ENDPOINT from "../../constants/endpoint";

interface AddVacationProps {
  close: () => void;
};

export default function AddVacation({ close }: AddVacationProps) {
  const { execute, status } = useFetch();

  const [form, setForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
    status: "pending",
  });

  const formHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  const confirmNewVacation = () => {
    execute(ENDPOINT.VACATIONS.POST, {
      method: "POST",
      body: JSON.stringify(form),
    });
  };

  return (
    <Modal
      header={
        <h3 className="font-bold text-[20px] text-[#52555E]">
          Solicitar férias para colaborador
        </h3>
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
              />
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
                  />
                </div>
              </div>
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
                <Button
                  text="Cancelar"
                  onClick={close}
                />
                <Button
                  disabled={status !== "initial"}
                  text="Confirmar Solicitação"
                  variant="active"
                  onClick={() => confirmNewVacation()}
                />
              </div>
            </>
          )}
          {status === "loading" && <p>Enviando solicitação...</p>}
          {status === "error" && (
            <>
              <p>
                Ocorreu um erro ao enviar a solicitação. Tente novamente mais
                tarde.
              </p>
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
