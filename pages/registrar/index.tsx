import Alerta from "@/components/alerta/Alerta";
import AuthLayout from "@/components/layout/AuthLayout";
import cliente from "@/config/client";
import { IAlerta } from "@/interfaces/interfaces";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface CrearUsuario {
  nombre: string;
  email: string;
  password: string;
  repetirPassword: string;
}

const INITIAL_STATE_USUARIO: CrearUsuario = {
  email: "",
  password: "",
  repetirPassword: "",
  nombre: "",
};

const CrearCuenta = () => {
  const [usuario, setUsuario] = useState<CrearUsuario>(INITIAL_STATE_USUARIO);
  const [alerta, setAlerta] = useState<IAlerta>({ error: false, mensaje: "" });
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const { password, repetirPassword } = usuario;
    e.preventDefault();

    if (Object.values(usuario).includes("")) {
      setAlerta({
        error: true,
        mensaje: "Todos los campos son obligatorios",
      });
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({
        error: true,
        mensaje: "La password no coincide",
      });
      return;
    }

    if (password.length <= 6) {
      setAlerta({
        error: true,
        mensaje: "Password muy corto, debe tener almenos 7 caracteres",
      });
      return;
    }

    try {
      const { data } = await cliente.post("/usuarios", { ...usuario });
      setAlerta({
        error: false,
        mensaje: data.msj
      })

      setUsuario(INITIAL_STATE_USUARIO)

    } catch (err: any) {
      setAlerta({
        error: true,
        mensaje: err?.response?.data?.msj,
      });
    }
  };

  //useEffect

  useEffect(() => {
    if(alerta.mensaje && alerta.error){
      setTimeout(() => {
        setAlerta({
          error: alerta.error,
          mensaje: ""
        })
      }, 2000);
    }
  }, [alerta])

  return (
    <AuthLayout>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Crea tu cuenta y administra tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>
      <form
        className="mt-10 bg-white shadow-lg rounded-lg p-10"
        onSubmit={(e) => handleSubmit(e)}
      >
        {alerta.mensaje && <Alerta alerta={alerta} />}
        <div className=" my-5 ">
          <label className="block uppercase text-gray-600" htmlFor="nombre">
            Nombre:{" "}
          </label>
          <input
            id="nombre"
            name="nombre"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
            type="text"
            value={usuario.nombre}
            onChange={(e) => handleOnChange(e)}
            placeholder="Tu nombre"
          />
        </div>
        <div className=" my-5 ">
          <label className="block uppercase text-gray-600" htmlFor="email">
            Email:{" "}
          </label>
          <input
            id="email"
            name="email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
            type="email"
            onChange={(e) => handleOnChange(e)}
            placeholder="Tu email"
            value={usuario.email}
          />
        </div>
        <div className=" my-5 ">
          <label className="block uppercase text-gray-600" htmlFor="password">
            Password:{" "}
          </label>
          <input
            id="password"
            name="password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
            type="password"
            placeholder="Tu password"
            onChange={(e) => handleOnChange(e)}
            value={usuario.password}
          />
        </div>
        <div className=" my-5 ">
          <label
            className="block uppercase text-gray-600"
            htmlFor="repetirPassword"
          >
            Repetir Password:{" "}
          </label>
          <input
            id="repetirPassword"
            name="repetirPassword"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
            type="password"
            placeholder="Repetir Password password"
            onChange={(e) => handleOnChange(e)}
            value={usuario.repetirPassword}
          />
        </div>
        <input
          type="submit"
          value="Crear Cuenta"
          className="uppercase w-full p-2 bg-sky-700 rounded-lg 
          text-white hover:bg-sky-800 transition-colors 
          cursor-pointer font-bold text-lg mb-5"
        />
      </form>
      <nav className="lg:flex lg:justify-between mt-3">
        <Link
          href="/"
          className="block text-center my-5  text-slate-500 uppercase text-sm"
        >
          Ya tienes una cuenta, inicia session
        </Link>
        <Link
          href="/olvide-password"
          className="block text-center my-5  text-slate-500 uppercase text-sm"
        >
          Olvide my password?
        </Link>
      </nav>
    </AuthLayout>
  );
};

export default CrearCuenta;
