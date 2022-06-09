import { createContext, useState } from "react";

export const UserContext = createContext({
  token: "",
  setToken() {},
  logout() {},
  login() {},
});

export function UserProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        login(newtoken) {
          setToken(newtoken);
          localStorage.setItem("token", newtoken);
        },
        logout() {
          localStorage.clear();
          setToken(null);
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
