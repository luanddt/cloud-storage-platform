"use client";

import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({
  fullName,
  email,
  avatar
}: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className="px-5 py-7 xl:w-[325px] lg:w-[280px] overflow-auto sm:flex flex-col hidden">
      <Link href="/">
        <Image
          src="/assets/icons/logo-full.svg"
          alt="StoreIt"
          width={160}
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

      <div className="relative h-40 lg:mt-5 max-lg:hidden">
        <Image
          src="/assets/images/files-bg.png"
          alt="Files"
          fill
        />
      </div>

      <div className="mt-5 flex items-center gap-4">
        <Image
          src={avatar}
          alt={fullName}
          width={52}
          height={52}
          className="object-cover rounded-full"
        />

        <div className="flex flex-col gap-1 max-lg:hidden">
          <h5 className="h5 line-clamp-1">
            {fullName}
          </h5>

          <p className="body-2 text-muted-foreground line-clamp-1">
            {email}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;