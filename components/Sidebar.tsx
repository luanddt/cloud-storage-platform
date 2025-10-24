"use client";

import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ fullName, email, avatar }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className="xl:w-[325px] lg:w-[280px] w-[90px] px-5 py-7 sm:flex flex-col hidden">
      <Link href="/">
        <Image
          src="/assets/icons/logo-full.svg"
          alt="StoreIt"
          width={161}
          height={52}
          className="max-lg:hidden"
        />

        <Image
          src="/assets/icons/logo.svg"
          alt="StoreIt"
          width={52}
          height={52}
          className="lg:hidden"
        />
      </Link>

      <ul className="mt-9 flex-1 flex flex-col gap-6">
        {navItems.map(({ name, icon, url }) => (
          <li key={name}>
            <Link
              href={url}
              className={cn(
                "hover:bg-primary hover:shadow-drop-2 p-3.5 lg:px-[30px] lg:rounded-full rounded-xl group flex-center lg:justify-start gap-4",
                pathname === url && "bg-primary hover:bg-primary/90 shadow-drop-2"
              )}
            >
              <Image
                src={icon}
                alt={name}
                width={24}
                height={24}
                className={cn(
                  "invert opacity-25 group-hover:invert-0 group-hover:opacity-100",
                  pathname === url && "invert-0 opacity-100"
                )}
              />

              <h5 className={cn("h5 group-hover:text-primary-foreground max-lg:hidden", pathname === url && "text-primary-foreground")}>
                {name}
              </h5>
            </Link>
          </li>
        ))}
      </ul>

      <div className="relative w-full h-[209px] max-lg:hidden">
        <Image
          src="/assets/images/files-bg.png"
          alt="Files"
          fill
        />
      </div>

      <div className="lg:mt-4 flex items-center gap-4">
        <Image
          src={avatar}
          alt={fullName}
          width={54}
          height={54}
          className="rounded-full"
        />

        <div className="flex flex-col gap-0.5 max-lg:hidden">
          <h5 className="h5">
            {fullName}
          </h5>

          <p className="body-1">
            {email}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;