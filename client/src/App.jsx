import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import Login from "./components/Login/Login";
import Dashboard from "./components/dashboard";
import { UserContext } from "./context/AuthContext";

function App() {
  const AuthCtx = React.useContext(UserContext);
  return (
    <div className="App">
      {AuthCtx.token? <Dashboard /> : <Login />}
    </div>
  );
}
export default App;
