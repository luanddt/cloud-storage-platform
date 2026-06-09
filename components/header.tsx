import Image from "next/image";
import { logoutUser } from "@/lib/actions/user.actions";
import { Button } from "@/components/ui/button";
import Search from "@/components/search";
import ModeToggle from "@/components/mode-toggle";
import FileUploader from "@/components/file-uploader";

const Header = () => {
  return (
    <header className="py-7 sm:mr-7 sm:flex-between hidden">
      <Search />

      <div className="flex items-center gap-6">
        <FileUploader />

        <ModeToggle />

        <form
          action={async () => {
            "use server";

            await logoutUser();
          }}
        >
          <Button type="submit" variant="logout" size="logout">
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