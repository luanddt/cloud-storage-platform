import Image from "next/image";
import { logout } from "@/lib/actions/user.actions";
import { Button } from "@/components/ui/button";
import Search from "@/components/Search";
import FileUploader from "@/components/FileUploader";

const Header = ({
  accountId,
  userId
}: {
  accountId: string;
  userId: string;
}) => {
  return (
    <div className="py-7 sm:mr-7 sm:flex-between hidden">
      <Search />

      <div className="flex items-center gap-4">
        <FileUploader
          accountId={accountId}
          ownerId={userId}
        />

        <form
          action={async () => {
            "use server";

            await logout();
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
    </div>
  );
};

export default Header;