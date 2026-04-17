type FormMode = "login" | "create-account";

type FileType = "document" | "image" | "video" | "audio" | "other";

type HandleErrorOptions = {
  code?: string;
  showDetails?: boolean;
};

interface AuthFormProps {
  mode: FormMode;
};

interface CreateAccountProps {
  fullName: string;
  email: string;
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
  fullName: string;
  email: string;
  avatar: string;
  accountId: string;
  $id: string;
};

interface ThumbnailProps {
  name: string;
  type: string;
  extension: string;
  url?: string;
  className?: string;
  imageClassName?: string;
};

interface UploadFileProps {
  file: File;
  ownerId: string;
  accountId: string;
  path: string;
};

interface FileUploaderProps {
  accountId: string;
  ownerId: string;
  onClose?: () => void;
};

interface HomeProps {
  params?: Promise<SegmentParams>;
};