"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import { SidebarProps } from "@/types";

const Sidebar = ({ fullName, email, avatar }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className="xl:w-81.25 lg:w-70 w-27 p-7 sm:flex flex-col gap-7 hidden overflow-auto transition-all">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/assets/icons/logo.svg"
          alt="Storage"
          width={52}
          height={52}
          priority
        />

        <p className="logo-24 text-primary max-lg:hidden">Storage</p>
      </Link>

      <ul className="flex-1 flex flex-col gap-5">
        {navItems.map((nav) => (
          <li key={nav.name}>
            <Link
              href={nav.url}
              className={cn("hover:bg-primary lg:px-7.5 p-3.5 lg:rounded-full rounded-12 shadow-drop-2 group flex items-center gap-4", pathname === nav.url && "bg-primary hover:bg-primary/80")}
            >
              <Image
                src={nav.icon}
                alt={nav.name}
                width={24}
                height={24}
                className={cn("invert dark:invert-0 group-hover:invert-0 opacity-80 group-hover:opacity-100", pathname === nav.url && "invert-0 opacity-100")}
              />

              <h5 className={cn("h5 group-hover:text-primary-foreground max-lg:hidden", pathname === nav.url && "text-primary-foreground")}>
                {nav.name}
              </h5>
            </Link>
          </li>
        ))}
      </ul>

      <Image
        src="/assets/images/files-2.png"
        alt="Files"
        width={253}
        height={209}
        priority
        className="w-full max-lg:hidden"
      />

      <div className="flex items-center gap-3">
        <Image
          src={avatar}
          alt={fullName}
          width={52}
          height={52}
          className="object-cover object-center rounded-full"
        />

        <div className="lg:flex flex-col gap-1 hidden overflow-auto">
          <h5 className="h5 line-clamp-1">
            {fullName}
          </h5>

          <p className="body-1 text-muted-foreground line-clamp-1">
            {email}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;