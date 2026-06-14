type AuthMode = "login" | "create-account";

type FileType = "document" | "image" | "video" | "audio" | "other";

interface AuthFormProps {
  mode: AuthMode;
};

interface OTPModalProps {
  accountId: string;
  email: string;
};

interface SidebarProps {
  fullName: string;
  email: string;
  avatar: string;
};

interface MobileNavigationProps {
  $id: string;
  accountId: string;
  fullName: string;
  email: string;
  avatar: string;
};

interface HomeProps {
  params: Promise<{ slug: string }>;
};

interface ThumbnailProps {
  name: string;
  type: string;
  extension: string;
  size: number;
  url?: string;
  className?: string;
  iconClassName?: string;
};

interface FileUploaderProps {
  ownerId: string;
  accountId: string;
  onClose?: () => void;
};

interface HeaderProps {
  userId: string;
  accountId: string;
};