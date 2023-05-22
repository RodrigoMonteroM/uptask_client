import { AuthProvider } from "@/context/AuthProvider";
import { ProyectoProvider } from "@/context/ProyectoProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ProyectoProvider>
        <Component {...pageProps} />
      </ProyectoProvider>
    </AuthProvider>
  );
}
