import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import MobileNavigation from "@/components/MobileNavigation";

export const metadata: Metadata = {
  title: "Home - StoreIt",
  description: "Cloud Storage Platform"
};

const HomeLayout = async ({
  children
}: {
  children: React.ReactNode;
}) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return redirect("/sign-in");

  return (
    <main className="flex bg-background min-h-screen">
      <Sidebar {...currentUser} />

      <section className="flex-1">
        <MobileNavigation {...currentUser} />

        <Header userId={currentUser.$id} accountId={currentUser.accountId} />

        {children}
      </section>
    </main>
  );
};

export default HomeLayout;