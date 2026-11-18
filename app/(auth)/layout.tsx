import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Auth - Storage",
  description: "Cloud Storage Platform",
};

const AuthLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <div className="flex min-h-screen">
      <section className="bg-primary text-primary-foreground lg:flex-center hidden w-1/2 p-4 xl:w-2/5">
        <div className="flex max-w-107.5 flex-col items-center gap-12">
          <div className="flex w-full items-center gap-4">
            <Image
              src="/assets/icons/logo-white.svg"
              alt="Storage"
              width={56}
              height={56}
            />

            <p className="logo-36">Storage</p>
          </div>

          <div className="flex flex-col gap-5">
            <h1 className="h1-46">Manage your files the best way</h1>

            <p className="body-1">
              Awesome, we&#39;ve created the perfect place for you to store all
              your documents.
            </p>
          </div>

          <Image
            src="/assets/images/files.png"
            alt="Files"
            width={342}
            height={342}
            priority
          />
        </div>
      </section>

      <section className="flex-center flex-1 flex-col gap-12 p-4 max-lg:justify-start">
        <div className="flex items-center gap-3 lg:hidden">
          <Image
            src="/assets/icons/logo.svg"
            alt="Storage"
            width={36}
            height={36}
          />

          <p className="logo-24 text-primary">Storage</p>
        </div>

        {children}
      </section>
    </div>
  );
};

export default AuthLayout;
