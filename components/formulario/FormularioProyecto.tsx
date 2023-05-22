import { IAlerta, IProyecto } from "@/interfaces/interfaces";
import React, { useEffect, useState } from "react";
import Alerta from "../alerta/Alerta";
import useProyecto from "@/hooks/useProyecto";
import { GetServerSidePropsContext } from "next";


const INITIAL_STATE_FORM: IProyecto = {
  nombre: "",
  cliente: "",
  descripcion: "",
  fechaEntrega: "",
};

interface FormularioProyectoProps {
  params?: string;
}

function FormularioProyecto({ params }: FormularioProyectoProps) {
  const [proyectoInput, setproyectoInput] =
    useState<IProyecto>(INITIAL_STATE_FORM);
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setproyectoInput({
      ...proyectoInput,
      [e.target.name]: e.target.value,
    });
  };

  //Context
  const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyecto();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values({ ...proyectoInput }).includes("")) {
      mostrarAlerta({
        error: true,
        mensaje: "Todos los casmpos son obligatorios",
      });
      return;
    }

    
    await submitProyecto({ ...proyectoInput });
    // reset the form
    setproyectoInput(INITIAL_STATE_FORM);
  };

  useEffect(() => {
    if (params) {
      setproyectoInput({...proyecto});
     
    }


  }, []); //eslint-disable-line


  return (
    <form
      className="bg-white py-10 px-5 md:w-5/6 rounded-lg shadow mt-10"
      onSubmit={(e) => handleSubmit(e)}
    >
      {alerta.mensaje && <Alerta alerta={alerta} />}
      <div className="mb-5">
        <label
          htmlFor="nombre"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Nombre Proyecto
        </label>
        <input
          name="nombre"
          id="nombre"
          className="border-2 w-full p-2 mt-2 placeholder:-gray-400 rounded-md "
          type="text"
          placeholder="Nombre del Proyecto"
          value={proyectoInput.nombre}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="descripcion"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Descipcion Proyecto
        </label>
        <textarea
          name="descripcion"
          id="descripcion"
          className="border-2 w-full p-2 mt-2 placeholder:-gray-400 rounded-md "
          placeholder="Nombre del Proyecto"
          value={proyectoInput.descripcion}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="fechaEntrega"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          fecha Entrega del Proyecto
        </label>
        <input
          name="fechaEntrega"
          id="fechaEntrega"
          className="border-2 w-full p-2 mt-2 placeholder:-gray-400 rounded-md "
          type="date"
          value={proyectoInput?.fechaEntrega?.split("T")[0]}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="cliente"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Cliente del Proyecto
        </label>
        <input
          name="cliente"
          id="cliente"
          value={proyectoInput.cliente}
          className="border-2 w-full p-2 mt-2 placeholder:-gray-400 rounded-md "
          type="text"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <input
        className="w-full font-bold bg-sky-600 py-2 
        text-white rounded-lg hover:bg-sky-700 transition-colors"
        type="submit"
        value={proyectoInput._id ? "Editar Proyecto" : "Crear Proyecto"}
      />
    </form>
  );
}

export default FormularioProyecto;
