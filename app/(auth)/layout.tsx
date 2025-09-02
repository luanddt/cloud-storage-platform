import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Auth - StoreIt",
  description: "Cloud Storage Platform"
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="bg-primary p-10 xl:w-2/5 w-1/2 lg:flex-center hidden">
        <div className="max-w-[430px] flex flex-col items-center gap-12">
          <div className="w-full">
            <Image
              src="/assets/icons/logo-full-white.svg"
              alt="StoreIt"
              width={224}
              height={82}
              className="object-contain"
            />
          </div>

          <div className="flex flex-col gap-5 text-primary-foreground">
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
            className="object-contain hover:rotate-2 hover:scale-105 transition-all"
          />
        </div>
      </section>

      <section className="flex-center flex-1 flex-col max-lg:justify-start gap-16 bg-background p-10 max-lg:px-4">
        <Image
          src="/assets/icons/logo-full-primary.svg"
          alt="StoreIt"
          width={224}
          height={82}
          className="object-contain lg:hidden"
        />

        {children}
      </section>
    </div>
  );
};

export default AuthLayout;