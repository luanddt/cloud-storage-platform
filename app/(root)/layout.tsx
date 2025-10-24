import Header from "@/components/Header";
import MobileNavigation from "@/components/MobileNavigation";
import Sidebar from "@/components/Sidebar";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return redirect("/sign-in");

  return (
    <div className="h-screen flex">
      <Sidebar {...currentUser} />

      <div className="flex-1 flex flex-col">
        <MobileNavigation />

        <Header />

        <main className="bg-[#F2F4F8] md:px-9 px-5 md:py-10 py-7 sm:mr-7 md:mb-7 sm:rounded-[30px] overflow-auto flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default HomeLayout;