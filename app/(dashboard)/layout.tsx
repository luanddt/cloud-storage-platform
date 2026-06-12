import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/actions/user.actions";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import MobileNavigation from "@/components/mobile-navigation";

export const metadata: Metadata = {
  title: "Dashboard - Storage",
  description: "Cloud Storage Platform"
};

const DashboardLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return redirect("/login");

  return (
    <div className="h-screen flex">
      <Sidebar {...currentUser} />

      <div className="flex-1 flex flex-col">
        <Header />

        <MobileNavigation {...currentUser} />

        <main className="bg-main sm:mr-7 sm:mb-7 sm:px-9 px-5 sm:py-10 py-7 sm:rounded-30 overflow-auto flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;