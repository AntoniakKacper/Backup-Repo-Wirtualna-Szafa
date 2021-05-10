export interface User {
    username: string;
    email: string;
    id: string;
    imageUrl: string;
  }

  
  export interface AuthState {
    user: User | null;
    authenticated: boolean;
    loading: boolean;
    error: string | null;
    needVerification: boolean;
    success: string | null;
  }
  
  export interface SignUpData {
    username: string;
    email: string;
    password: string;
    confirmedPassword: string;
  }
  
  export interface SignInData {
    email: string;
    password: string;
  }