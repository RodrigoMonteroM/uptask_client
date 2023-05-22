import cliente from "@/config/client";
import { Config, IUsuario } from "@/interfaces/interfaces";
import { useRouter } from "next/router";
import React, { Context, use, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  auth: IUsuario;
}

const AuthContext = React.createContext<AuthContextProps>(
  {} as AuthContextProps
);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  //use state
  const [auth, setAuth] = useState<IUsuario>({} as IUsuario);

  const router = useRouter();

  // registro el token en el header
  useEffect(() => {
    const autenticar = async () => {
      const token = Cookies.get("token");
      if (token) {
        const config: Config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const { data }: { data: IUsuario } = await cliente(
            "/usuarios/perfil",
            config
          );

          setAuth(data);
        } catch (error: any) {
          console.log(error);
        }
      }
    };
    autenticar();
    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
