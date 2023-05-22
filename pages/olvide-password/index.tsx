import Alerta from "@/components/alerta/Alerta";
import AuthLayout from "@/components/layout/AuthLayout";
import cliente from "@/config/client";
import { IAlerta, IUsuario } from "@/interfaces/interfaces";
import Link from "next/link";
import React, { useState } from "react";

const Registrar = () => {
  const [email, setEmail] = useState<string>("");
  const [alerta, setAlerta] = useState<IAlerta>({ error: false, mensaje: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setAlerta({
        error: true,
        mensaje: "El campo es obligatorio",
      });
      return;
    }

    try {
      const { data } = await cliente.post("/usuarios/olvide-password", { email });
      setAlerta({
        error: false,
        mensaje: data.msj
      });
    } catch (error: any) {
      setAlerta({
        error: true,
        mensaje: error.response.data,
      });
   
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        recupera tu accesso y no pierdas tu accesso a tus
        <span className="text-slate-700">proyectos</span>
      </h1>
      <form
        className="mt-10 bg-white shadow-lg rounded-lg p-10"
        onSubmit={(e) => handleSubmit(e)}
      >
        {alerta.mensaje && <Alerta alerta={alerta}/>}
        <div className=" my-5 ">
          <label className="block uppercase text-gray-600" htmlFor="email">
            Email:{" "}
          </label>
          <input
            id="email"
            name="email"
            value={email}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
            type="email"
            placeholder="Tu email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Recuperar Cuenta"
          className="uppercase w-full p-2 bg-sky-700 rounded-lg 
        text-white hover:bg-sky-800 transition-colors 
        cursor-pointer font-bold text-lg mb-5"
        />
      </form>
      <nav className="lg:flex lg:justify-center mt-3">
        <Link
          href="/"
          className="block text-center my-5  text-slate-500 uppercase text-sm"
        >
          Ya tienes una cuenta, inicia session
        </Link>
      </nav>
    </AuthLayout>
  );
};

export default Registrar;
