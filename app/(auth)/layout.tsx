import Image from "next/image";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth - Storage",
  description: "Cloud Storage Platform",
};

const AuthLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <div className="flex min-h-screen">
      <section className="bg-primary p-4 xl:w-2/5 w-1/2 text-primary-foreground lg:flex-center hidden">
        <div className="max-w-107.5 flex flex-col items-center gap-12">
          <div className="w-full flex items-center gap-4">
            <Image
              src="/assets/icons/logo-white.svg"
              alt="Storage"
              width={56}
              height={56}
              priority
            />

            <p className="logo-36">Storage</p>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="h1">Manage your files the best way</h1>

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

      <section className="bg-background p-4 flex-1 flex-center max-lg:justify-start flex-col gap-12">
        <div className="lg:hidden flex items-center gap-3">
          <Image
            src="/assets/icons/logo.svg"
            alt="Storage"
            width={36}
            height={36}
            priority
          />

          <p className="logo-24 text-primary">Storage</p>
        </div>

        {children}
      </section>
    </div>
  );
};

export default AuthLayout;
