import { IAlerta } from "@/interfaces/interfaces";
import React from "react";

interface AlertaProps {
  alerta: IAlerta;
}

const Alerta: React.FC<AlertaProps> = ({ alerta }) => {
  return (
    <div
      className={`${
        alerta.error ? "from-red-400 to-red-600" : "from-sky-400 to-sky-600"
      } bg-gradient-to-br w-full rounded-lg font-white font-bold text-center py-2 text-sm mb-10  text-white`}
    >
      {alerta.mensaje}
    </div>
  );
};

export default Alerta;
