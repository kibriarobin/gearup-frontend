import { Navbar } from "@/components/navbar/Navbar";
import { getMe } from "@/service/getMe";
import React from "react";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getMe();
  return (
    <div>
      <Navbar user={user}></Navbar>
      <div className="mx-auto max-w-7xl px-4 py-8">{children}</div>
    </div>
  );
};

export default PublicLayout;