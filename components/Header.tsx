import Image from "next/image";
import { Button } from "@/components/ui/button";
import Search from "@/components/Search";
import FileUploader from "@/components/FileUploader";
import { signOutUser } from "@/lib/actions/user.actions";

const Header = () => {
  return (
    <header className="py-7 mr-7 flex-between max-sm:hidden">
      <Search />

      <div className="flex-center gap-4">
        <FileUploader />

        <form
          action={async () => {
            "use server";

            await signOutUser();
          }}
        >
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
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;