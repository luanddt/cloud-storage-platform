import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex">
      <section className="bg-primary xl:w-2/5 w-1/2 p-10 lg:flex-center hidden">
        <div className="max-w-[430px] flex flex-col items-center gap-12">
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

      <section className="p-10 max-lg:px-4 flex-1 flex-center flex-col max-lg:justify-start gap-16">
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