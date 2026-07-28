import { Navbar } from "@/components/navbar/Navbar";
import React from "react";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar></Navbar>
      <div>{children}</div>
    </div>
  );
};

export default AuthLayout;
