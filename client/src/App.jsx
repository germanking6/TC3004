import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import Login from "./components/Login/Login";
import Dashboard from "./components/dashboard";
import { UserContext } from "./context/AuthContext";

import { ThemeContext } from "./context/themeContext";

function App() {
  const AuthCtx = React.useContext(UserContext);

  const [value, setValue] = useState(localStorage.getItem("value"));
  React.useEffect(() => {
    localStorage.setItem("value", value);
  }, [value]);
  return (
    <div className="App">
      <ThemeContext.Provider value={{ value, setValue }}>
        {AuthCtx.token ? <Dashboard /> : <Login />}
      </ThemeContext.Provider>
    </div>
  );
}
export default App;
