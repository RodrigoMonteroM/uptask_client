import { Fragment, useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ITarea, ModalProps } from "@/interfaces/interfaces";
import useProyecto from "@/hooks/useProyecto";
import Alerta from "./alerta/Alerta";
import Router from "next/router";

const INITIAL_STATE_FORM: ITarea = {
  descripcion: "",
  fechaEntrega: "",
  nombre: "",
  prioridad: "",
};

const PRIORIDAD = ["", "Baja", "Media", "Alta"];

import React from "react";

const ModalTarea = () => {
  const {
    modal,
    changeModal,
    mostrarAlerta,
    alerta,
    submitTarea,
    proyecto,
    tarea,
    asignarTarea
  } = useProyecto();
  const [tareaForm, setTareaForm] = useState<ITarea>(INITIAL_STATE_FORM);

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {
    setTareaForm({
      ...tareaForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { prioridad, descripcion, nombre, fechaEntrega } = tareaForm;
    if ([prioridad, descripcion, nombre, fechaEntrega].includes("")) {
      mostrarAlerta({
        error: true,
        mensaje: "Todos los campos son Obligatorios",
      });
      return;
    }

    if (proyecto._id) {
      const updatedTareaForm: ITarea = {
        ...tareaForm,
        proyecto: proyecto._id,
      };
      await submitTarea(updatedTareaForm);

      changeModal();
      setTareaForm(INITIAL_STATE_FORM);
    }
  };

  useEffect(() => { 
    if (tarea._id) {
      setTareaForm(tarea);
    }else{
   
      setTareaForm(INITIAL_STATE_FORM)
    }

   
  }, [tarea]); // eslint-disable-line

  
  return (
    <Transition.Root show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => changeModal()}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => changeModal()}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-bold text-gray-900"
                  >
                    {tarea._id ? "Editar Tarea" : "Crear Tarea"}
                  </Dialog.Title>
                  <form className="my-10" onSubmit={(e) => handleSubmit(e)}>
                    {alerta.mensaje && <Alerta alerta={alerta} />}

                    <div className="mb-5">
                      <label
                        htmlFor="nombre"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Nombre tarea:
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        id="nombre"
                        placeholder="Nombre de la tarea"
                        className="border-2 w-full placeholder-gray-400 p-2 mt-2 rounded-md"
                        value={tareaForm.nombre}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="descripcion"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        descripcion tarea:
                      </label>
                      <textarea
                        name="descripcion"
                        id="descripcion"
                        placeholder="descripcion de la tarea"
                        className="border-2 w-full placeholder-gray-400 p-2 mt-2 rounded-md"
                        value={tareaForm.descripcion}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="fechaEntrega"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Fecha de Entraga tarea:
                      </label>
                      <input
                        type="date"
                        id="fechaEntrega"
                        name="fechaEntrega"
                        className="border-2 w-full placeholder-gray-400 p-2 mt-2 rounded-md"
                        value={tareaForm?.fechaEntrega?.split("T")[0]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Fecha limite"
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="prioridad"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Prioridad
                      </label>
                      <select
                        className="w-full"
                        id="prioridad"
                        name="prioridad"
                        onChange={(e) => handleChange(e)}
                        value={tareaForm.prioridad}
                      >
                        {PRIORIDAD.map((prioridad) => (
                          <option key={prioridad}> {prioridad}</option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="submit"
                      value={tarea._id ? "Salvar Cambio" : "Agregar Tarea"}
                      className="w-full p-2 text-center bg-sky-500 text-white font-bold rounded-lg uppercase hover:bg-sky-600 transition-colors mt-5"
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalTarea;
