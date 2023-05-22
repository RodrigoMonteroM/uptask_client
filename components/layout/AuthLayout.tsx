import React from "react";
interface AuthLayoutProps {
  children: React.ReactNode;
}
const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <main className="container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center">
        <div className="md:w-1/3 lg:w-2/5 ">{children}</div>
      </main>
    </>
  );
};

export default AuthLayout;
