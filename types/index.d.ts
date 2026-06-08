type AuthMode = "login" | "create-account";

interface AuthFormProps {
  mode: AuthMode;
};

interface OTPModalProps {
  accountId: string;
  email: string;
};