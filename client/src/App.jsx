import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import Login from "./components/Login/Login";
import SideBar from "./components/sidebar";

function App() {
  return (
    <div className="App">
      <SideBar/>
    </div>
  )
}
export default App;
