import { createContext, useState } from "react";

export const UserContext = createContext({
    token: "",
    setToken() { },
    logout() { },
    login() {},
});

export function UserProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));


    return (
        <UserContext.Provider value={{
            token,
            setToken,
            login() {
                setToken("el pepe");
                localStorage.setItem("token", "elpepe");
            },
            logout() {
                localStorage.clear();
                setToken(null);
            },
        }}>
            {children}
        </UserContext.Provider>
    );
}