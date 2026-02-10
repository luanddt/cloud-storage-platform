import Image from "next/image";
import { signOutUser } from "@/lib/actions/user.actions";
import { Button } from "@/components/ui/button";
import Search from "@/components/search";
import FileUploader from "@/components/file-uploader";

const Header = () => {
  return (
    <header className="py-7 mr-7 sm:flex-between hidden">
      <Search />

      <div className="flex items-center gap-4">
        <FileUploader />

        <form
          action={async () => {
            "use server";

            await signOutUser();
          }}
        >
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
            />
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;