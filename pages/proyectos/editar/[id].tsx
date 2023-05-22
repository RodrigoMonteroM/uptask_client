import Alerta from "@/components/alerta/Alerta";
import FormularioProyecto from "@/components/formulario/FormularioProyecto";
import RutaProtegida from "@/components/layout/RutaProtegida";
import cliente from "@/config/client";
import { FetchObtenerProyecto } from "@/helpers/fetchObtenerProyecto";
import useProyecto from "@/hooks/useProyecto";
import { Config, IAlerta, IFechProyectoProps } from "@/interfaces/interfaces";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const EditarProyecto: React.FC<IFechProyectoProps> = ({
  _error,
  _id,
  _proyecto,
  _token,
}) => {
  const {
    proyecto,
    conseguirProyecto,
    eliminarProyecto,
  } = useProyecto();
  const { nombre } = proyecto;
  const router = useRouter();

  const handleEliminar = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const respuesta = confirm("Quieres eliminar el Proyecto?");

    if (respuesta) {
      await eliminarProyecto(_id);

      setTimeout(() => {
        router.push("")
      }, 2000);
    }
  };

  useEffect(() => {
    if (_proyecto) {
      conseguirProyecto(_proyecto);
      return;
    }

    if (_error) {
      //console.error(_error)

      return;
    }

    // eslint-disable-next-line
  }, []);

  return (
    <RutaProtegida>
      <div className="mt-10 ">
        <div className="flex flex-col   md:flex-row md:gap-0 md:justify-between items-center">
          <h1 className="font-black text-4xl">{nombre}</h1>
          <div className="flex gap-1 hover:text-gray-400 items-center text-sm">
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
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>

            <button
              className="uppercase font-bold"
              onClick={(e) => handleEliminar(e)}
            >
              Eliminar Proyecto
            </button>
          </div>
        </div>
        <FormularioProyecto params={_id} />
      </div>
    </RutaProtegida>
  );
};

export default EditarProyecto;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;
  const id = params?.id ?? "";
  const _token = context.req.headers.cookie?.split("=")[1] ?? "";

  const result: IFechProyectoProps = await FetchObtenerProyecto(
    id.toString(),
    _token
  );

  return {
    props: {
      ...result,
      _token,
    },
  };
}
