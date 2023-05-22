import { ITarea } from "@/interfaces/interfaces";
import React from "react";
import { formatearFecha } from "@/helpers/FormatearFecha";
import useProyecto from "@/hooks/useProyecto";
import EliminarModal from "../EliminarModal";
import useAdmin from "@/hooks/useAdmin";

interface Props {
  tarea: ITarea;
}

const Tarea: React.FC<Props> = ({ tarea }) => {
  const { descripcion, fechaEntrega, nombre, prioridad, _id, estado } = tarea;
  const {
    asignarTarea,
    tarea: tareaState,
    handleModalEliminar,
    completarTarea,
  } = useProyecto();

  const handleEditar = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    asignarTarea(tarea);
  };

  const admin = useAdmin();

  const handleEliminar = () => {
    if (tarea._id) {
      handleModalEliminar(tarea);
    }
  };

  console.log(tarea)

  return (
    <>
      <div className="border-b p-5 flex flex-col gap-3 md:flex-row md:justify-between items-center">
        <div>
          <p className="text-xl mb-1">{nombre}</p>
          <p className="text-sm text--gray-500 uppercase mb-1">{descripcion}</p>
          <p className="text-xl mb-1">{formatearFecha(fechaEntrega)}</p>
          <p className="text-xl text-gray-600 mb-1">Prioridad: {prioridad}</p>
          {estado && <p>Completado por: {`${tarea.completado?.nombre}`}</p>}

        </div>
        <div className="flex items-center gap-1">
          {admin && (
            <button
              className="bg-indigo-600 
                    px-3 
                    py-2 
                    text-white
                    uppercase 
                    hover:pointer
                    rounded-lg
                    font-bold
                    hover:shadow
                    hover:bg-indigo-700
                    transition-colors"
              onClick={(e) => handleEditar(e)}
            >
              Editar
            </button>
          )}

          <button
            className={
              `${estado ? "bg-sky-600" : "bg-slate-700"} 
              px-3 
              py-2 
              text-white
              uppercase 
              hover:pointer
              rounded-lg
              font-bold
              hover:shadow
              hover:bg-sky-700
              transition-colors`
            }
            onClick={() => {
              if (_id) {
                completarTarea(_id);
              }
            }}
          >
            {estado ? "Completo" : "Incompleto"}
          </button>

          <button
            type="button"
            className="bg-red-600 
                    px-3 
                    py-2 
                    text-white
                    uppercase 
                    hover:pointer
                    rounded-lg
                    font-bold
                    hover:shadow
                    hover:bg-red-700
                    transition-colors"
            onClick={() => handleEliminar()}
          >
            Eliminar
          </button>
        </div>
      </div>
      <EliminarModal />
    </>
  );
};

export default Tarea;
