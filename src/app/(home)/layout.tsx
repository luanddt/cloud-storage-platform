import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/actions/user.actions";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MobileNavigation from "@/components/MobileNavigation";

export const metadata: Metadata = {
  title: "Home - Storage",
  description: "Cloud Storage Platform"
};

const HomeLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return redirect("/login");

  return (
    <div className="h-screen flex">
      <Sidebar {...currentUser} />

      <div className="flex-1 flex flex-col">
        <Header />

        <MobileNavigation />

        <main className="bg-[#F2F4F8] sm:px-9 px-5 sm:py-10 py-7 sm:mr-7 sm:mb-7 sm:rounded-30 flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default HomeLayout;