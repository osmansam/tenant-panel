import { createContext, PropsWithChildren, useContext, useState } from "react";
import { User } from "../types";
import { readStoredUser } from "../utils/persistedContext";
import { logout as authLogout } from "../utils/auth";

type UserContextType = {
  user?: User;
  setUser: (user?: User) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType>({
  setUser: () => {},
  logout: () => {},
  user: undefined,
});

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | undefined>(readStoredUser);

  const logout = (showMessage: boolean = true) => {
    // Clear user state
    setUser(undefined);

    // Use centralized logout utility
    authLogout(showMessage);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
