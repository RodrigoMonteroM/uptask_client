import AuthLayout from "@/components/layout/AuthLayout";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import cliente from "@/config/client";
import axios from "axios";
import { IAlerta } from "@/interfaces/interfaces";
import Alerta from "@/components/alerta/Alerta";
import Cookie from "js-cookie";

interface ConfirmarCuentaProps {
  token: string;
}

const ConfirmarCuenta: React.FC<ConfirmarCuentaProps> = ({ token }) => {
  const [alerta, setAlerta] = useState<IAlerta>({ error: false, mensaje: "" });
  const router = useRouter();
  let times = 0;

  useEffect(() => {
    const confirmar = async () => {
      try {
        const { data } = await cliente.get(`/usuarios/confirmar/${token}`);
        setAlerta({
          error: false,
          mensaje: data.msj,
        });

        Cookie.remove("token");
        router.push("/");
      } catch (error: any) {
        setAlerta({
          error: true,
          mensaje: error.response.data,
        });
      }
    };

    if (times < 1) {
      confirmar();
      times++;
    }
  }, [token, times, router]);
  return (
    <AuthLayout>
      <h1 className="text-sky-600 font-black text-6xl capitalize mb-10">
        Confirma tu cuenta para gestionar tu cuenta{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>
      {alerta.mensaje && <Alerta alerta={alerta} />}
    </AuthLayout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.params?.token;

  return {
    props: {
      token,
    },
  };
}

export default ConfirmarCuenta;
