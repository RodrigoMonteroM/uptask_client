import useProyecto from "@/hooks/useProyecto";
import React, { useState } from "react";
import Alerta from "../alerta/Alerta";


const FormularioColaborador = () => {
  const [email, setEmail] = useState<string>("");
  const { mostrarAlerta, alerta, submitColaborador } = useProyecto();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "") {
      mostrarAlerta({
        error: true,
        mensaje: "El Campo es Obligatorio",
      });

      return;
    }

    await submitColaborador(email);

    setEmail("")
  };


 
  return (
    <div>
      <form
        className="bg-white py-10 px-5 md:w1/2 rounded-lg shadow"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="mb-5">
          <div className="mb-5">
            {alerta.mensaje && <Alerta alerta={alerta} />}
            <label
              htmlFor="email"
              className="text-gray-700 uppercase font-bold text-sm"
            >
              Email Colaborador
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              className="border-2 w-full placeholder-gray-400 p-2 mt-2 rounded-md"
              placeholder="Email del Colaborador"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Añadir Colaborador"
            className="w-full p-2 text-center bg-sky-500 text-white font-bold rounded-lg uppercase hover:bg-sky-600 transition-colors mt-5"
          />
        </div>
      </form>
    </div>
  );
};

export default FormularioColaborador;


