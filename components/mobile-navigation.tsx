"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import { logoutUser } from "@/lib/actions/user.actions";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Search from "@/components/search";
import FileUploader from "@/components/file-uploader";
import ModeToggle from "@/components/mode-toggle";

const MobileNavigation = ({ fullName, email, avatar }: MobileNavigationProps) => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-5 sm:hidden flex-between">
      <Link href="/">
        <Image
          src="/assets/icons/logo.svg"
          alt="Storage"
          width={52}
          height={52}
        />
      </Link>

      <Search />

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Menu className="hover:opacity-70 cursor-pointer" />
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <Image
              src={avatar}
              alt={fullName}
              width={52}
              height={52}
              className="object-cover object-center rounded-full"
            />

            <div className="flex flex-col gap-1 overflow-auto">
              <SheetTitle>{fullName}</SheetTitle>

              <SheetDescription>{email}</SheetDescription>
            </div>
          </SheetHeader>

          <Separator />

          <ul className="flex-1 flex flex-col gap-5 overflow-auto">
            {navItems.map((nav) => {
              return (
                <li key={nav.name}>
                  <Link
                    href={nav.url}
                    className={cn("hover:bg-primary px-7.5 py-3.5 shadow-2 rounded-full group flex items-center gap-4.5", nav.url === pathname && "bg-primary hover:bg-primary/90")}
                  >
                    <Image
                      src={nav.icon}
                      alt={nav.name}
                      width={24}
                      height={24}
                      className={cn("invert dark:invert-0 opacity-25 dark:opacity-100 group-hover:invert-0 group-hover:opacity-100", nav.url === pathname && "invert-0 opacity-100")}
                    />

                    <h5 className={cn("h5 group-hover:text-primary-foreground", nav.url === pathname && "text-primary-foreground")}>
                      {nav.name}
                    </h5>
                  </Link>
                </li>
              );
            })}
          </ul>

          <Separator />

          <FileUploader />

          <Separator />

          <ModeToggle />

          <Separator />

          <Button
            type="button"
            variant="logout"
            size="logout"
            onClick={async () => await logoutUser()}
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
    </div>
  );
};

export default MobileNavigation;