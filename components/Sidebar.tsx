"use client";

import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ fullName, email, avatar }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className="px-5 py-7 flex flex-col max-sm:hidden">
      <Link href="/">
        <Image
          src="/assets/icons/logo-full.svg"
          alt="StoreIt"
          width={162}
          height={52}
          className="h-[52px] max-lg:hidden"
        />

        <Image
          src="/assets/icons/logo.svg"
          alt="StoreIt"
          width={52}
          height={52}
          className="h-[52px] lg:hidden"
        />
      </Link>

      <ul className="mt-7 flex-1 flex flex-col gap-5">
        {navItems.map(({ name, icon, url }) => (
          <li key={name}>
            <Link
              href={url}
              className={cn(
                "hover:bg-primary lg:px-8 p-3.5 shadow-drop-2 lg:rounded-full rounded-[12px] group flex items-center gap-5",
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

      <div className="relative h-40 max-lg:hidden">
        <Image
          src="/assets/images/files-background.png"
          alt="Files"
          fill
        />
      </div>

      <div className="lg:mt-4 flex items-center gap-3.5">
        <Image
          src={avatar}
          alt={fullName}
          width={52}
          height={52}
          className="object-cover rounded-full"
        />

        <div className="lg:flex flex-col gap-0.5 hidden">
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