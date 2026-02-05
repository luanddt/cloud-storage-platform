type FormMode = "login" | "create-account";

interface AuthFormProps {
  mode: FormMode;
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