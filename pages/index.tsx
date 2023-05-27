import Alerta from "@/components/alerta/Alerta";
import AuthLayout from "@/components/layout/AuthLayout";
import cliente from "@/config/client";
import useAuth from "@/hooks/useAuth";
import { IAlerta, IUsuario } from "@/interfaces/interfaces";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import cookie from "js-cookie";


interface Login {
  email: string;
  password: string;
}

const Home = () => {
  const [login, setLogin] = useState<Login>({ email: "", password: "" });
  const [alerta, setAlerta] = useState<IAlerta>({ error: false, mensaje: "" });
  const { auth } = useAuth();
  const router = useRouter();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (Object.values(login).includes("")) {
      setAlerta({
        error: true,
        mensaje: "Todos los campos son obligatorios",
      });
      return;
    }

    try {
      const { data }: { data: IUsuario } = await cliente.post(
        "/usuarios/login",
        { ...login }
      );

      cookie.set("token", data.token, { expires: 30 });
      router.push("/proyectos");
    } catch (error: any) {
      setAlerta({
        error: true,
        mensaje: error.response.data,
      });
    }
  };

  useEffect(() => {
    const jwt = cookie.get("token");
    if (jwt) router.push("/proyectos");

    // eslint-disable-next-line
  }, []);
  //no se



  return (
    <AuthLayout>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Inicia session y administra tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>
      <form
        className="mt-10 bg-white shadow-lg rounded-lg p-10"
        onSubmit={(e) => handleSubmit(e)}
      >
        {alerta.mensaje && <Alerta alerta={alerta} />}
        <div className="my-5 ">
          <label className="block uppercase text-gray-600" htmlFor="email">
            Email:{" "}
          </label>
          <input
            id="email"
            name="email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
            type="email"
            placeholder="Tu email"
            value={login.email}
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div className="my-5 ">
          <label className="block uppercase text-gray-600" htmlFor="password">
            Password:{" "}
          </label>
          <input
            id="password"
            name="password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
            type="password"
            placeholder="Tu password"
            value={login.password}
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="uppercase w-full p-2 bg-sky-700 rounded-lg 
          text-white hover:bg-sky-800 transition-colors 
          cursor-pointer font-bold text-lg mb-5"
        />
      </form>
      <nav className="lg:flex lg:justify-between mt-3">
        <Link
          href="/registrar"
          className="block text-center my-5  text-slate-500 uppercase text-sm"
        >
          Aun no tienes una cuenta, registrate
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

export default Home;
