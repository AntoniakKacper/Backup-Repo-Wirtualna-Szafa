export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmedPassword: string;
}
export interface User {
  username: string;
  email: string;
  password: string;
  isAuthenticated: boolean;
  token: string;
}
export interface SignInFormValues {
  email: string;
  password: string;
}
