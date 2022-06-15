import { set } from "date-fns";
import { createContext, useState } from "react";

export const UserContext = createContext({
  token: "",
  email:"",
  role:"",
  setToken() {},
  logout() {},
  login() {},
});

export function UserProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        email,
        setEmail,
        role,
        setRole,
        login(newtoken) {
          let jsn = JSON.parse(newtoken);
          localStorage.setItem("email", jsn.email);
          localStorage.setItem("token", jsn.id);
          localStorage.setItem("role", jsn.role);
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
