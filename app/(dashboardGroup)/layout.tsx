import { redirect } from "next/navigation";
import { getMe } from "@/service/getMe";
import { Navbar } from "@/components/navbar/Navbar";
import { DashboardSidebar } from "./_components/DashboardSidebar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getMe();

  if (!user.success) {
    redirect("/login");
  }

  return (
    <div>
      <Navbar user={user} />
      <div className="mx-auto flex max-w-7xl">
        <DashboardSidebar />
        <main className="min-h-[calc(100vh-4rem)] flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;