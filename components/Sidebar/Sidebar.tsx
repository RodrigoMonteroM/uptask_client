import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  const {auth} = useAuth();
  return (

    <aside className="md:w-80 lg:w-96 px-5 py-10">
      <p className="text-xl font-bold">Hola: {auth.nombre}</p>

      <div className="btn relative inline-flex items-center justify-start overflow-hidden font-medium transition-all 
      bg-white rounded hover:bg-white group p-3 border-[1px] w-full md:w-56">
        <span className="md:w-56 h-48 rounded bg-sky-600 absolute bottom-0 left-0 
        translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 
        group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0 w-full"></span>
        <Link
          className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white"
          href={"/proyectos/nuevo-proyecto"}
        >
          Nuevo proyecto
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
