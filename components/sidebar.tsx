"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navItems } from "@/constants";
import { cn } from "@/lib/utils";

const Sidebar = ({ fullName, email, avatar }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className="xl:w-81.25 lg:w-70 w-27 p-7 sm:flex flex-col gap-7 hidden overflow-auto">
      <Link
        href="/"
        className="flex items-center gap-3"
      >
        <Image
          src="/assets/icons/logo.svg"
          alt="Storage"
          width={52}
          height={52}
        />

        <p className="logo-24 text-primary max-lg:hidden">
          Storage
        </p>
      </Link>

      <ul className="flex-1 flex flex-col gap-5">
        {navItems.map((nav) => {
          return (
            <li key={nav.name}>
              <Link
                href={nav.url}
                className={cn("hover:bg-primary lg:px-7.5 p-3.5 shadow-2 lg:rounded-full rounded-12 group flex items-center gap-4.5", nav.url === pathname && "bg-primary hover:bg-primary/90")}
              >
                <Image
                  src={nav.icon}
                  alt={nav.name}
                  width={24}
                  height={24}
                  className={cn("invert dark:invert-0 opacity-25 dark:opacity-100 group-hover:invert-0 group-hover:opacity-100", nav.url === pathname && "invert-0 opacity-100")}
                />

                <h5 className={cn("h5 group-hover:text-primary-foreground max-lg:hidden", nav.url === pathname && "text-primary-foreground")}>
                  {nav.name}
                </h5>
              </Link>
            </li>
          );
        })}
      </ul>

      <Image
        src="/assets/images/files-bg.png"
        alt="Files"
        width={380}
        height={314}
        className="max-lg:hidden"
      />

      <div className="flex items-center gap-3.5">
        <Image
          src={avatar}
          alt={fullName}
          width={52}
          height={52}
          className="object-cover object-center rounded-full"
        />

        <div className="flex flex-col gap-1 max-lg:hidden overflow-auto">
          <h5 className="h5 line-clamp-1">
            {fullName}
          </h5>

          <p className="body-3 text-muted-foreground line-clamp-1">
            {email}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;