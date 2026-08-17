export type AuthMode = "login" | "create-account";

export interface AuthFormProps {
  mode: AuthMode;
};

export interface CreateAccountProps {
  fullName: string;
  email: string;
};

export interface OTPModalProps {
  accountId: string;
  email: string;
};