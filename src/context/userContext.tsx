"use client";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface UserContextState {
  logoutLoading: boolean;
  setLogoutLoading: Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextState | undefined>(undefined);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [logoutLoading, setLogoutLoading] = useState(false);
  return (
    <UserContext.Provider
      value={{
        logoutLoading,
        setLogoutLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("Something went wrong in user context api");
  }

  return context;
};

export { UserContextProvider, useUserContext };
