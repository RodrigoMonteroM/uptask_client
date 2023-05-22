import useProyecto from "@/hooks/useProyecto";
import { IColaborador } from "@/interfaces/interfaces";
import React from "react";
import ModalEliminarColaborador from "./ModalEliminarColaborador";

interface Props {
  colaborador: IColaborador;
}

const Colaborador = ({ colaborador }: Props) => {
  const {changeModalEliminarColaborador } =
    useProyecto();

  return (
    <>
      <div className="border-b p-5 flex justify-between items-center">
        <div>
          <p>{colaborador.nombre}</p>
          <p className="text-gray-600 text-sm">{colaborador.email}</p>
        </div>
        <div>
          <button
            type="button"
            className="bg-red-600 px-3 uppercase font-bold text-white py-5 rounded-lg text-center hover:bg-red-700 transition-colors"
            onClick={() => changeModalEliminarColaborador(colaborador)}
          >
            Eliminar
          </button>
        </div>
      </div>
      <ModalEliminarColaborador />
    </>
  );
};

export default Colaborador;
