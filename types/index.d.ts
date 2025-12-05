type FormType = "sign-in" | "sign-up";

interface AuthFormProps {
  type: FormType;
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