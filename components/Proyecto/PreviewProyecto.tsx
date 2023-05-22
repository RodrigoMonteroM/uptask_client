import useAuth from "@/hooks/useAuth";
import { IProyecto } from "@/interfaces/interfaces";
import Link from "next/link";
import React from "react";

interface PreviewProyectoProps {
  proyecto: IProyecto;
}

const PreviewProyecto: React.FC<PreviewProyectoProps> = ({ proyecto }) => {
  const { nombre, _id, cliente, creador } = proyecto;
  const { auth } = useAuth();
  return (
    <div className={`border-b p-5 flex items-center gap-3`}>
      <p className="flex-1">
        {nombre}
        <span className="text-sm text-gray-500 uppercase"> {cliente}</span>
      </p>
      {auth._id !== creador && (
        <p className="py-2 px-3 text-white font-bold bg-sky-600 uppercase rounded text-sm">
          Colaborador{" "}
        </p>
      )}
      <Link
        className="text-gray-600 
                     hover:text-gray-800 
                     uppercase text-sm font-bold"
        href={`/proyectos/${_id}`}
      >
        Ver Proyecto
      </Link>
    </div>
  );
};

export default PreviewProyecto;
