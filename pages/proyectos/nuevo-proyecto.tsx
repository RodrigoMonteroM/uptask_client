import FormularioProyecto from "@/components/formulario/FormularioProyecto";
import RutaProtegida from "@/components/layout/RutaProtegida";
import React from "react";

function NuevoProyectos() {
  return (
    <RutaProtegida>
      <h1 className="text-4xl font-black text-center md:text-left mt-5">Crear Proyecto</h1>
      <div className="mt-10 flex justify-center">
         <FormularioProyecto /> 
      </div>

    </RutaProtegida>
  );
};

export default NuevoProyectos;
