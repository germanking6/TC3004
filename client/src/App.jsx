import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import Login from "./components/Login/Login";
import SideBar from "./components/sidebar";
import { UserContext } from "./context/AuthContext";

function App() {
  const [count, setCount] = useState(0);
  const AuthCtx = React.useContext(UserContext);

  return (
    <div className="App">
      {AuthCtx.token ?
        <SideBar /> :
        <Login />
      }
    </div>
  );
}
export default App;
