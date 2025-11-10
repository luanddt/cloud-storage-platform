import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const HomeLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="bg-[#F2F4F8] md:px-9 px-5 md:py-10 py-7 sm:mr-7 md:mb-7 sm:rounded-[30px] flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default HomeLayout;