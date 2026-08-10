export type AuthMode = "login" | "create-account";

export interface AuthFormProps {
  mode: AuthMode;
};

export interface CreateAccountProps {
  fullName: string;
  email: string;
};