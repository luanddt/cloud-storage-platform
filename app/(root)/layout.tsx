import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Home - StoreIt",
  description: "Cloud Storage Platform"
};

const HomeLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <main className="flex bg-background min-h-screen">
      <Sidebar />

      <section className="flex-1">
        <Header />

        {children}
      </section>
    </main>
  );
};

export default HomeLayout;