"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { navItems } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import FileUploader from "@/components/FileUploader";
import { Button } from "./ui/button";

const MobileNavigation = ({ fullName, email, avatar }: MobileNavigationProps) => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="p-5 flex-between sm:hidden">
      <Image
        src="/assets/icons/logo-full.svg"
        alt="StoreIt"
        width={120}
        height={52}
      />

      <Sheet
        open={isOpen}
        onOpenChange={setIsOpen}
      >
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
          <SheetTitle>
            <Image
              src={avatar}
              alt={fullName}
              width={54}
              height={54}
              className="rounded-full"
            />

            <div className="flex flex-col gap-0.5">
              <h5 className="h5">
                {fullName}
              </h5>

              <p className="body-1">
                {email}
              </p>
            </div>
          </SheetTitle>

          <Separator />

          <ul className="flex flex-col gap-6">
            {navItems.map(({ name, icon, url }) => (
              <li key={name}>
                <Link
                  href={url}
                  className={cn(
                    "hover:bg-primary hover:shadow-drop-2 px-[30px] py-3.5 rounded-full group flex items-center gap-4",
                    pathname === url && "bg-primary hover:bg-primary/90 shadow-drop-2"
                  )}
                >
                  <Image
                    src={icon}
                    alt={name}
                    width={24}
                    height={24}
                    className={cn(
                      "invert opacity-25 group-hover:invert-0 group-hover:opacity-100",
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

          <div className="flex flex-col gap-5">
            <FileUploader />

            <Button
              type="submit"
              className="bg-primary/10 hover:bg-primary/20 p-3.5 shadow-none button text-foreground"
              onClick={() => { }}
            >
              <Image
                src="/assets/icons/logout.svg"
                alt="Logout"
                width={24}
                height={24}
              />

              <p>Logout</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;