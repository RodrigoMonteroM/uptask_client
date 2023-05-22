import Alerta from "@/components/alerta/Alerta";
import AuthLayout from "@/components/layout/AuthLayout";
import cliente from "@/config/client";
import { IAlerta } from "@/interfaces/interfaces";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface ResetPasswordProps {
  token: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ token }) => {
  const [alerta, setALerta] = useState<IAlerta>({ error: false, mensaje: "" });
  const [tokenValido, setTokenValido] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password) {
      setALerta({
        error: true,
        mensaje: "El campo es obligatorio",
      });
      return;
    }

    if (password.length < 6) {
      setALerta({
        error: true,
        mensaje: "La password debe tener 7 characteres",
      });
      return;
    }

    try {
      const { data } = await cliente.post(`usuarios/olvide-password/${token}`, {
        password,
      });

      setALerta({
        error: false,
        mensaje: data.msj,
      });

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error: any) {
      setALerta({
        error: true,
        mensaje: error.response.data,
      });

     
    }
  };

  useEffect(() => {
    const confirmarToken = async (): Promise<void> => {
      try {
        const { data } = await cliente(`/usuarios/olvide-password/${token}`);
        setALerta({
          error: false,
          mensaje: data.msj,
        });
        
        setTokenValido(true);
      } catch (error: any) {
      
        setALerta({
          error: true,
          mensaje: error.response.data,
        });
        setTokenValido(false);
      }
    };

    confirmarToken();
  }, [token]);

  return (
    <AuthLayout>
      <h1 className="text-sky-600 font-black text-6xl capitalize mb-10">
        Restablece tu password y no pierdas el accesso de tus
        <span className="text-slate-700">proyectos</span>
      </h1>
      {alerta.mensaje && <Alerta alerta={alerta} />}

      {tokenValido && (
        <form
          className="mt-10 bg-white shadow-lg rounded-lg p-10"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className=" my-5 ">
            <label className="block uppercase text-gray-600" htmlFor="password">
              Password:{" "}
            </label>
            <input
              id="password"
              name="password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
              type="password"
              value={password}
              placeholder="Escribe tu nueva passowrd"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Restablece tu password"
            className="uppercase w-full p-2 bg-sky-700 rounded-lg 
      text-white hover:bg-sky-800 transition-colors 
      cursor-pointer font-bold text-lg mb-5"
          />
        </form>
      )}
    </AuthLayout>
  );
};

export function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      token: context.params?.token,
    },
  };
}

export default ResetPassword;
