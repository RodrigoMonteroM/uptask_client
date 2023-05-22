import Alerta from "@/components/alerta/Alerta";
import FormularioColaborador from "@/components/formulario/FormularioColaborador";
import useProyecto from "@/hooks/useProyecto";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const NuevoColaborador = () => {
  const { proyecto, colaborador, cargando, agregarColaborador, alerta } =
    useProyecto();
  const router = useRouter();

  console.log(colaborador)

  const handleClick = async () => {
    if(proyecto._id)
    await agregarColaborador(proyecto._id, colaborador.email);
  };

  useEffect(() => {
    if (!proyecto._id) {
      router.push("/proyectos");
    }
  }, []); //eslint-disable-line

  return (
    <>
      <h1 className="text-4xl font-black text-center mt-10">
        Añadir Calaborador
      </h1>
      <h3 className="text-2xl text-center mt-5 font-black">
        {" "}
        <span className="text-sky-500">Proyeco: </span> {proyecto.nombre}
      </h3>
      <div className="mt-10 flex justify-center">
        <FormularioColaborador />
      </div>

      {cargando ? (
        <p className="text-center">Cargando</p>
      ) : (
        colaborador._id && (
          <div className="flex justify-center mt-10 ">
            <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
              <h2 className="text-center mb-10 text-2xl font-bold">
                Resultado
              </h2>
              {alerta.mensaje && <Alerta alerta={alerta} />}

              <div className="flex justify-evenly items-center ">
                <p className="font-bold">{colaborador.nombre}</p>
                <button
                  type="button"
                  className="bg-slate-500 px-5 py-5 rounded-lg text-white font-bold text-sm hover:bg-slate-600 transition-colors"
                  onClick={() => handleClick()}
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default NuevoColaborador;
