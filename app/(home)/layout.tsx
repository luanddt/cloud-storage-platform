import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MobileNavigation from "@/components/MobileNavigation";
import { getCurrentUser } from "@/lib/actions/user.actions";

export const metadata: Metadata = {
  title: "Home - StoreIt",
  description: "Cloud Storage Platform"
};

const HomeLayout = async ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return redirect("/sign-in");

  return (
    <div className="flex h-screen">
      <Sidebar {...currentUser} />

      <div className="flex-1 flex flex-col">
        <MobileNavigation {...currentUser} />

        <Header />

        <main className="bg-[#F2F4F8] sm:px-9 px-5 sm:py-10 py-7 sm:mr-7 sm:mb-7 sm:rounded-[30px] flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default HomeLayout;