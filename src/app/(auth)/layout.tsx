import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Auth - Storage",
  description: "Cloud Storage Platform"
};

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="min-h-screen flex">
      <section className="bg-primary xl:w-2/5 w-1/2 p-10 text-primary-foreground lg:flex-center hidden">
        <div className="max-w-107.5 flex items-center flex-col gap-12">
          <div className="w-full flex items-center gap-5">
            <Image
              src="/assets/icons/logo-white.svg"
              alt="Storage"
              width={82}
              height={82}
            />

            <p className="logo">
              Storage
            </p>
          </div>

          <div className="flex flex-col gap-5">
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
            priority
            className="hover:rotate-2 hover:scale-105 transition-all"
          />
        </div>
      </section>

      <section className="p-10 max-lg:px-5 flex-1 flex-center max-lg:justify-start flex-col gap-16">
        <div className="lg:hidden flex items-center gap-5">
          <Image
            src="/assets/icons/logo.svg"
            alt="Storage"
            width={52}
            height={52}
          />

          <p className="logo-mobile text-primary">
            Storage
          </p>
        </div>

        {children}
      </section>
    </div>
  );
};

export default AuthLayout;