"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/constants";
import { cn } from "@/lib/utils";

const Sidebar = ({ fullName, email, avatar }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className="p-7 xl:w-81.25 lg:w-70 w-27 sm:flex flex-col gap-7 hidden overflow-auto">
      <Link href="/">
        <Image
          src="/assets/icons/logo-full.svg"
          alt="StoreIt"
          width={162}
          height={52}
          className="h-13 max-lg:hidden"
        />

        <Image
          src="/assets/icons/logo.svg"
          alt="StoreIt"
          width={52}
          height={52}
          className="h-13 lg:hidden"
        />
      </Link>

      <div className="flex-1 flex flex-col gap-5">
        {navItems.map(({ name, icon, url }) => (
          <Link
            key={name}
            href={url}
            className={cn(
              "hover:bg-primary lg:px-8.5 p-3.5 lg:rounded-full rounded-2xl shadow-drop-2 group flex items-center gap-4.5",
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
        ))}
      </div>

      <Image
        src="/assets/images/files-bg.png"
        alt="Files"
        width={500}
        height={500}
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

        <div className="flex flex-col gap-0.5 max-lg:hidden overflow-auto">
          <h5 className="h5">
            {fullName}
          </h5>

          <p className="body-2 text-muted-foreground">
            {email}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;