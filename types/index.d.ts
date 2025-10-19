type AuthMode = "sign-in" | "sign-up";

interface AuthFormProps {
  mode: AuthMode;
};

interface OTPModalProps {
  accountId: string;
  email: string;
};