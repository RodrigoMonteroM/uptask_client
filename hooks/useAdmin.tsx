import React from "react";
import useProyecto from "./useProyecto";
import useAuth from "./useAuth";

const useAdmin = () => {
  const { proyecto } = useProyecto();
  const { auth } = useAuth();

  return proyecto.creador === auth._id
};

export default useAdmin;
