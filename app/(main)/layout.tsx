import type { Metadata } from "next";
import Header from "@/components/shared/header";
import Sidebar from "@/components/shared/sidebar";
import MobileNavigation from "@/components/shared/mobile-navigation";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Main - Storage",
  description: "Cloud Storage Platform"
};

const MainLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return redirect("/login");

  return (
    <div className="h-screen flex">
      <Sidebar {...currentUser} />

      <div className="flex-1 flex flex-col">
        <MobileNavigation />

        <Header />

        <main className="bg-main sm:p-7 p-5 sm:mr-7 sm:mb-7 sm:rounded-30 flex-1 overflow-auto transition-all">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;