import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../header/Header";

interface RutaProtegidaProps {
  children: React.ReactNode;
}

const RutaProtegida: React.FC<RutaProtegidaProps> = ({ children }) => {
  return (
    <div className="bg-gray-100">
      <Header />
      <div className="md:flex md:min-h-screen">
        <Sidebar />
        <main className="md:w-1/2">{children}</main>
      </div>
    </div>
  );
};

export default RutaProtegida;
