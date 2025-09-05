import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - StoreIt",
  description: "Cloud Storage Platform"
};

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-screen">
      <Sidebar />

      <section className="flex-1">
        <Header />

        {children}
      </section>
    </main>
  );
};

export default HomeLayout;