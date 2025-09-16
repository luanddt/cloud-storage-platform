"use client";

import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  fullName: string;
  email: string;
  avatar: string;
};

const Sidebar = ({ fullName, email, avatar }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className="bg-background px-5 py-7 sm:flex flex-col hidden">
      <Link href="/">
        <Image
          src="/assets/icons/logo-full-primary.svg"
          alt="StoreIt"
          width={161}
          height={52}
          className="object-contain max-lg:hidden"
        />

        <Image
          src="/assets/icons/logo.svg"
          alt="StoreIt"
          width={52}
          height={52}
          className="object-contain lg:hidden"
        />
      </Link>

      <ul className="mt-9 xl:w-[325px] lg:w-[280px] flex flex-1 flex-col gap-5">
        {navItems.map(({ name, icon, link }) => (
          <li key={name}>
            <Link
              href={link}
              className={cn(
                "lg:px-8 p-3.5 hover:bg-primary lg:rounded-full rounded-[12px] flex-center lg:justify-start gap-4",
                pathname === link && "bg-primary hover:bg-primary/90 shadow-drop-2"
              )}
            >
              <Image
                src={icon}
                alt={name}
                width={24}
                height={24}
                className={cn(
                  "object-contain invert opacity-25",
                  pathname === link && "invert-0 opacity-100"
                )}
              />

              <h5 className={cn(
                "h5 max-lg:hidden",
                pathname === link && "text-primary-foreground"
              )}>
                {name}
              </h5>
            </Link>
          </li>
        ))}
      </ul>

      <div className="relative w-full h-[209px] max-lg:hidden">
        <Image
          src="/assets/images/files-home.png"
          alt="Files"
          fill
          className="object-contain"
        />
      </div>

      <div className="lg:mt-4 bg-primary/10 lg:p-3 p-1 rounded-full flex items-center gap-3">
        <Image
          src={avatar}
          alt={fullName}
          width={52}
          height={52}
          className="object-cover rounded-full"
        />

        <div className="lg:flex hidden flex-col gap-0.5">
          <h5 className="h5">
            {fullName}
          </h5>

          <p className="body-2">
            {email}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;