import type { Metadata } from "next";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Home - StoreIt",
  description: "Cloud Storage Platform"
};

const HomeLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="h-screen flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="bg-[#F2F4F8] md:px-9 px-5 md:py-10 py-7 sm:mr-7 sm:mb-7 sm:rounded-[30px] flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default HomeLayout;