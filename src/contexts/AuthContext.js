"use client";

import { createContext } from "react";
import useAuth from "@/hooks/useAuth";
export const AuthContext = createContext({
  isTutor: false,
  userId: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const { isLoggedIn, userId, login, logout, isTutor } = useAuth();
  return (
    <AuthContext.Provider value={{ userId, isLoggedIn, login, logout, isTutor }}>
      {children}
    </AuthContext.Provider>
  );
};
