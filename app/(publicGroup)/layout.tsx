import { Navbar } from "@/components/navbar/Navbar";
import React from "react";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="mx-auto max-w-7xl px-4">{children}</div>
    </div>
  );
};

export default PublicLayout;
