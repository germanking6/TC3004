<<<<<<< HEAD
import React, { useState} from 'react'
import logo from './logo.svg'
import './App.css'
import HeaderComponent from './components/HeaderComponent'
import SideBar from './components/sidebar'

import Reports from "./pages/Reports";


function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
      <Reports/>
    </div>
  )
}

=======
import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import Login from "./components/Login/Login";
function App() {
  const [count, setCount] = useState(0);
  return <div className="App"></div>;
>>>>>>> 277d09fe7be363559ddca18fea1ee8c31cab2e6e
export default App;
