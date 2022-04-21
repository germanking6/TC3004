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

export default App;
