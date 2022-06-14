import React, { useState } from "react";
import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import Login from "./components/Login/Login";
import SideBar from "./components/sidebar";
function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <SideBar />
    </div>
  );
}
export default App;
