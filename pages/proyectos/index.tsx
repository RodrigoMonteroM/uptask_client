import PreviewProyecto from "@/components/Proyecto/PreviewProyecto";
import Alerta from "@/components/alerta/Alerta";
import RutaProtegida from "@/components/layout/RutaProtegida";
import cliente from "@/config/client";

import useProyecto from "@/hooks/useProyecto";
import { Config, IProyecto } from "@/interfaces/interfaces";
import { GetServerSidePropsContext } from "next";
import React, { useEffect } from "react";

interface ProyectosProps {
  proyectosDb: Array<IProyecto> | null;
  error: string | null;
}

const Proyectos = ({ proyectosDb, error }: ProyectosProps) => {
  const { obtenerProyectos: obtenerProyectos, proyectos } = useProyecto();

  useEffect(() => {
    if (proyectosDb) {
      obtenerProyectos(proyectosDb);

      return;
    }

    if (error) {
      return;
    }
  }, []); /* eslint-disable-line */
  return (
    <RutaProtegida>
      <h1 className="text-4xl font-black">Proyectos</h1>
      <div className="bg-white shadow mt-10 rounded-lg">
        {proyectos.length ? (
          proyectos.map((proyecto: IProyecto) => (
            <PreviewProyecto proyecto={proyecto} key={proyecto._id} />
          ))
        ) : (
          <p className="mt-5 text-center text-gray-600 uppercase">
            No hay proyectos
          </p>
        )}
      </div>
    </RutaProtegida>
  );
};

export default Proyectos;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const token = context.req.headers.cookie?.split("=")[1];

    const config: Config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // TODO: Bug cors
    
    const { data: proyectosDb } = await cliente("/proyectos", config);

    return {
      props: {
        proyectosDb,
        error: null,
      },
    };
  } catch (error: any) {
    return {
      props: {
        error: error?.response?.data ?? "Error Inesperado",
      },
    };
  }
}
