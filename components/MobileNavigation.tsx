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
import { navItems } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";

interface MobileNavigationProps {
  fullName: string;
  email: string;
  avatar: string;
};

const MobileNavigation = ({
  fullName,
  email,
  avatar
}: MobileNavigationProps) => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="p-5 flex-between sm:hidden">
      <Image
        src="/assets/icons/logo-full-primary.svg"
        alt="StoreIt"
        width={161}
        height={52}
        className="object-contain"
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
            className="object-contain"
          />
        </SheetTrigger>

        <SheetContent>
          <SheetTitle>
            <div className="lg:mt-4 bg-primary/10 lg:p-3 p-1 rounded-full flex items-center gap-3">
              <Image
                src={avatar}
                alt={fullName}
                width={52}
                height={52}
                className="object-cover rounded-full"
              />

              <div className="lg:hidden flex flex-col gap-0.5">
                <h5 className="h5">
                  {fullName}
                </h5>

                <p className="body-2">
                  {email}
                </p>
              </div>
            </div>
          </SheetTitle>

          <ul className="mt-9 flex flex-col gap-5">
            {navItems.map(({ name, icon, link }) => (
              <li key={name}>
                <Link
                  href={link}
                  className={cn(
                    "px-8 py-3.5 hover:bg-primary rounded-full flex items-center gap-4",
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
                    "h5 lg:hidden",
                    pathname === link && "text-primary-foreground"
                  )}>
                    {name}
                  </h5>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-5">
            <FileUploader />

            <Button
              type="submit"
              variant="logout"
              size="logout"
            >
              <Image
                src="/assets/icons/logout.svg"
                alt="Logout"
                width={24}
                height={24}
                className="object-contain"
              />

              Logout
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;