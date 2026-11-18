import { createContext, PropsWithChildren, useContext, useState, useRef } from "react";
import { User } from "../types";
import { readStoredUser } from "../utils/persistedContext";
import { logout as authLogout } from "../utils/auth";

type UserContextType = {
  user?: User;
  verifiedManagementIdentity?: { current: string | undefined };
  setUser: (user?: User) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType>({
  setUser: () => {},
  logout: () => {},
  user: undefined,
});

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  // Volatile verification survives layout changes, never a browser reload.
  const verifiedManagementIdentity = useRef<string>();
  const [user, setUser] = useState<User | undefined>(() => {
    const stored = readStoredUser();
    return stored ? { ...stored, roles: [] } : undefined;
  });

  const logout = (showMessage: boolean = true) => {
    // Clear user state
    setUser(undefined);

    // Use centralized logout utility
    authLogout(showMessage);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, verifiedManagementIdentity }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
