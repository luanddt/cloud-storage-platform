"use client";

import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { navItems } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";

const MobileNavigation = ({ fullName, email, avatar }: MobileNavigationProps) => {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  return (
    <header className="p-5 sm:hidden flex-between">
      <Image
        src="/assets/icons/logo-full.svg"
        alt="StoreIt"
        width={161}
        height={52}
      />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Image
            src="/assets/icons/menu.svg"
            alt="Menu"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Hello, User</SheetTitle>
          </SheetHeader>

          <Separator />

          <div className="flex items-center gap-4">
            <Image
              src={avatar}
              alt={fullName}
              width={52}
              height={52}
              className="rounded-full object-cover"
            />

            <div className="flex flex-col gap-1">
              <h5 className="h5">
                {fullName}
              </h5>

              <p className="font-normal text-[14px] leading-6 text-[#A3B2C7]">
                {email}
              </p>
            </div>
          </div>

          <Separator />

          <ul className="flex flex-col gap-6">
            {navItems.map(({ name, icon, url }) => (
              <li key={name}>
                <Link
                  href={url}
                  className={cn(
                    "hover:bg-primary px-[30px] py-3.5 shadow-drop-2 rounded-full group flex items-center gap-4",
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

                  <h5 className={cn("h5 group-hover:text-primary-foreground", pathname === url && "text-primary-foreground")}>
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
            type="submit"
            className="bg-primary/10 hover:bg-primary/20 p-3.5"
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