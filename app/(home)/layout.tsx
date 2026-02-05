import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/actions/user.actions";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import MobileNavigation from "@/components/mobile-navigation";

export const metadata: Metadata = {
  title: "Home - StoreIt",
  description: "Cloud Storage Platform"
};

const HomeLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return redirect("/login");

  return (
    <div className="flex h-screen">
      <Sidebar {...currentUser} />

      <div className="flex-1 flex flex-col">
        <MobileNavigation />

        <Header />

        <main className="bg-[#F2F4F8] md:px-9 px-5 md:py-10 py-7 sm:mr-7 sm:mb-7 sm:rounded-[30px] overflow-auto flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default HomeLayout;