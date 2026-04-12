"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navItems } from "@/constants";
import { cn } from "@/lib/utils";

const Sidebar = ({ fullName, email, avatar }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className="p-7 xl:w-81.25 lg:w-70 w-27 sm:flex flex-col gap-7 hidden overflow-auto">
      <Link
        href="/"
        className="flex items-center gap-3"
      >
        <Image
          src="/assets/icons/logo.svg"
          alt="Storage"
          width={52}
          height={52}
          className="h-13"
          priority
        />

        <p className="logo-min text-primary max-lg:hidden">
          Storage
        </p>
      </Link>

      <ul className="flex-1 flex flex-col gap-5">
        {navItems.map(({ name, icon, link }) => (
          <li key={name}>
            <Link
              href={link}
              className={cn(
                "hover:bg-primary lg:px-8 p-3.5 lg:rounded-full rounded-12 shadow-2 group flex items-center gap-4.5",
                pathname === link && "bg-primary hover:bg-primary/80"
              )}
            >
              <Image
                src={icon}
                alt={name}
                width={24}
                height={24}
                className={cn(
                  "invert group-hover:invert-0 opacity-25 group-hover:opacity-100",
                  pathname === link && "invert-0 opacity-100"
                )}
              />

              <h5 className={cn("h5 group-hover:text-primary-foreground flex-1 max-lg:hidden", pathname === link && "text-primary-foreground")}>
                {name}
              </h5>
            </Link>
          </li>
        ))}
      </ul>

      <Image
        src="/assets/images/files-bg.png"
        alt="Files"
        width={506}
        height={418}
        className="h-52.25 max-lg:hidden"
      />

      <div className="flex items-center gap-3.5">
        <Image
          src={avatar}
          alt={fullName}
          width={52}
          height={52}
          className="object-cover rounded-full"
        />

        <div className="flex-1 flex flex-col gap-1 max-lg:hidden overflow-auto">
          <h5 className="h5 line-clamp-1">
            {fullName}
          </h5>

          <p className="font-normal text-[14px] leading-6 text-[#A3B2C7] line-clamp-1">
            {email}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;