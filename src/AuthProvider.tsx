import React, { useEffect, useState, createContext } from "react";
import firebase from "./database/firebase";
import { auth } from "./database/firebase";

interface AuthProviderProps {
  currentUser: firebase.User | null;
  authenticated: boolean;
  setCurrentUser: any;
  loadingAuthState: boolean;
}

export const AuthContext = createContext<Partial<AuthProviderProps>>({});

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState(null as firebase.User | null);
  const [loadingAuthState, setLoadingAuthState] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (userCredentials: firebase.User | null) => {
        setCurrentUser(userCredentials);
        console.log(userCredentials);
        setLoadingAuthState(false);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        authenticated: currentUser !== null,
        setCurrentUser,
        loadingAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
