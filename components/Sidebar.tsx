"use client";

import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ fullName, email, avatar }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className="px-5 py-7 sm:flex hidden flex-col gap-5">
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

      <ul className="flex flex-1 flex-col gap-6">
        {navItems.map(({ name, icon, url }) => (
          <li key={name}>
            <Link
              href={url}
              className={cn(
                "hover:bg-primary lg:px-[30px] p-3.5 shadow-drop-2 lg:rounded-full rounded-[12px] group flex items-center gap-4",
                pathname === url && "bg-primary hover:bg-primary/90"
              )}
            >
              <Image
                src={icon}
                alt={name}
                width={24}
                height={24}
                className={cn(
                  "invert group-hover:invert-0 opacity-25 group-hover:opacity-100",
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

      <div className="flex items-center gap-4">
        <Image
          src={avatar}
          alt={fullName}
          width={52}
          height={52}
          className="rounded-full object-cover"
        />

        <div className="lg:flex hidden flex-col gap-1">
          <h5 className="h5">
            {fullName}
          </h5>

          <p className="font-normal text-[14px] leading-6 text-[#A3B2C7]">
            {email}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;