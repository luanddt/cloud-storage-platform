import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Auth - StoreIt",
  description: "Cloud Storage Platform"
};

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="min-h-screen flex">
      <section className="bg-primary p-10 xl:w-2/5 w-1/2 lg:flex-center hidden">
        <div className="max-w-107.5 flex items-center flex-col gap-12">
          <div className="w-full">
            <Image
              src="/assets/icons/logo-full-white.svg"
              alt="StoreIt"
              width={224}
              height={82}
            />
          </div>

          <div className="text-primary-foreground flex flex-col gap-5">
            <h1 className="h1">
              Manage your files the best way
            </h1>

            <p className="body-1">
              Awesome, we&#39;ve created the perfect place for you to store all your documents.
            </p>
          </div>

          <Image
            src="/assets/images/files.png"
            alt="Files"
            width={342}
            height={342}
            className="hover:rotate-2 hover:scale-105 transition-all"
          />
        </div>
      </section>

      <section className="p-10 max-lg:px-4 flex-1 flex-center max-lg:justify-start flex-col gap-16">
        <Image
          src="/assets/icons/logo-full.svg"
          alt="StoreIt"
          width={224}
          height={82}
          className="lg:hidden"
        />

        {children}
      </section>
    </div>
  );
};

export default AuthLayout;