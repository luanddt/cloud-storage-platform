"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logout } from "@/lib/actions/user.actions";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import Search from "@/components/Search";

const MobileNavigation = ({ fullName, email, avatar }: MobileNavigationProps) => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="p-5 sm:hidden flex-between">
      <Link href="/">
        <Image
          src="/assets/icons/logo.svg"
          alt="Storage"
          width={52}
          height={52}
          className="h-13"
        />
      </Link>

      <Search />

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Image
            src="/assets/icons/menu.svg"
            alt="Menu"
            width={24}
            height={24}
            className="opacity-70 hover:opacity-100 cursor-pointer"
          />
        </SheetTrigger>

        <SheetContent>
          <Image
            src="/assets/icons/close-black.svg"
            alt="Close"
            width={24}
            height={24}
            className="absolute top-1 right-1 opacity-70 hover:opacity-100 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />

          <div className="flex items-center gap-3.5">
            <Image
              src={avatar}
              alt={fullName}
              width={52}
              height={52}
              className="object-cover rounded-full"
            />

            <SheetHeader>
              <SheetTitle>{fullName}</SheetTitle>

              <SheetDescription>{email}</SheetDescription>
            </SheetHeader>
          </div>

          <Separator />

          <ul className="flex flex-col gap-5">
            {navItems.map(({ name, icon, link }) => (
              <li key={name}>
                <Link
                  href={link}
                  className={cn(
                    "hover:bg-primary px-8 py-3.5 rounded-full shadow-2 group flex items-center gap-4.5",
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

                  <h5 className={cn("h5 group-hover:text-primary-foreground flex-1", pathname === link && "text-primary-foreground")}>
                    {name}
                  </h5>
                </Link>
              </li>
            ))}
          </ul>

          <Separator />

          <FileUploader />

          <Separator />

          <Button
            type="button"
            className="bg-primary/10 hover:bg-primary/20 py-3.5"
            onClick={logout}
          >
            <Image
              src="/assets/icons/logout.svg"
              alt="Logout"
              width={24}
              height={24}
            />

            <h5 className="h5 text-primary">
              Logout
            </h5>
          </Button>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;