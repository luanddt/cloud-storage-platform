import FileSearch from "@/components/file/file-search";
import FileUpload from "@/components/file/file-upload";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { logout } from "@/lib/actions/user.actions";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Header = () => {
  return (
    <header className="py-7 sm:mr-7 sm:flex-between hidden">
      <FileSearch />

      <div className="flex items-center gap-4">
        <FileUpload />

        <ModeToggle />

        <form
          action={async () => {
            "use server";

            await logout();
          }}
        >
          <Button type="submit" variant="icon" size="icon">
            <Image
              src="/assets/icons/logout.svg"
              alt="Logout"
              width={24}
              height={24}
            />
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;