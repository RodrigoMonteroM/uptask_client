import Colaborador from "@/components/Colaborador";
import ModalTarea from "@/components/ModalTarea";
import Tarea from "@/components/Tarea/Tarea";
import RutaProtegida from "@/components/layout/RutaProtegida";
import { FetchObtenerProyecto } from "@/helpers/fetchObtenerProyecto";
import useAdmin from "@/hooks/useAdmin";
import useProyecto from "@/hooks/useProyecto";
import {
  IFechProyectoProps,
  ITarea,
  IColaborador,
} from "@/interfaces/interfaces";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";




const INITIAL_STATE_FORM_TAREA: ITarea = {
  descripcion: "",
  fechaEntrega: "",
  nombre: "",
  prioridad: "",
};

const VerProyecto: React.FC<IFechProyectoProps> = ({
  _proyecto,
  _error,
  _id,
}) => {
  const { conseguirProyecto, proyecto, changeModal, asignarTarea } =
    useProyecto();
  const { nombre } = proyecto;
  const [cargando, setCargando] = useState<boolean>(true);
  const [colaboradores, setColaboradores] = useState<IColaborador[]>([]);
  const admin = useAdmin();
  

  //console.log(colaboradores)
  //console.log(colaboradores)


/*   useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_URL_BACKEND}`;
s
    const socket = io("http://localhost:3100");
    socket.emit("prueba", "rodrigo");

    socket.on("respuesta", () => {
      console.log("desde el frontend")
    })
  }, []) */

  useEffect(() => {
    

    if (_proyecto) {
      setCargando(true);
      conseguirProyecto(_proyecto);
      if (proyecto.colaboradores) {
        setColaboradores(proyecto.colaboradores);
      }
      setCargando(false);

      return;
    }

    if (_error) {
      console.log(proyecto);
    }
  }, []); /* eslint-disable-line */

  useEffect(() => {
    if (proyecto.colaboradores) {
      setColaboradores(proyecto.colaboradores);
    }
  }, [proyecto]);

  return (
    <RutaProtegida>
      {!cargando ? (
        <>
          <div className="flex justify-between mt-10 items-center">
            <h1 className="text-xl font-bold uppercase">{nombre}</h1>
            {admin && (
              <div className="flex gap-2 hover:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                <Link className="uppercase" href={`/proyectos/editar/${_id}`}>
                  Editar Proyecto
                </Link>
              </div>
            )}
          </div>
          {admin && (
            <button
              onClick={() => {
                changeModal();
                asignarTarea(INITIAL_STATE_FORM_TAREA);
              }}
              type="button"
              className="text-sm px py-3 md:auto rounded-lg uppercase  font-bold bg-sky-400 text-center text-white p-2 mt-5 flex gap-2 items-center"
            >
              Nueva Tarea
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          )}
          <p className="font-bold text-xk mt-10">Tareas del proyecto</p>
          <div className="bg-white shadow mt-10 rounded-lg">
            {proyecto.tareas?.length ? (
              proyecto.tareas?.map((tarea) => (
                <Tarea key={tarea._id} tarea={tarea} />
              ))
            ) : (
              <p>No hay tareas en este proyectos</p>
            )}
          </div>
          {admin && (
            <>
              <div className="flex justify-between items-center mt-10">
                <p className="font-bold text-xl ">Colaboradores</p>
                <Link
                  href={`/proyectos/nuevo/colaborador/${proyecto._id}`}
                  className="uppercase text-gray-400 font-bold"
                >
                  Agregar Colaborador
                </Link>
              </div>
              <div className="bg-white shadow mt-10 rounded-lg">
                {proyecto.tareas?.length ? (
                  colaboradores.map((colaborador) => (
                    <Colaborador
                      key={colaborador._id}
                      colaborador={colaborador}
                    />
                  ))
                ) : (
                  <p>No hay tareas en este proyectos</p>
                )}
              </div>
            </>
          )}

          <ModalTarea />
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </RutaProtegida>
  );
};

export default VerProyecto;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;
  const id = params?.id ?? "";
  const token = context.req.headers.cookie?.split("=")[1] ?? "";

  const result: IFechProyectoProps = await FetchObtenerProyecto(
    id.toString(),
    token
  );

  return {
    props: {
      ...result,
    },
  };
}
