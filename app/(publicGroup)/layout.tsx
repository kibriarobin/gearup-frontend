import { Navbar } from "@/components/navbar/Navbar";
import { getMe } from "@/service/getMe";
import React from "react";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getMe();
  return (
    <div>
      <Navbar user={user}></Navbar>
      <div>{children}</div>
    </div>
  );
};

export default PublicLayout;