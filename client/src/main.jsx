import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
//import {EmployeesPage} from "./pages\home-page/employees-page";
import CssBaseline from '@mui/material/CssBaseline';
import EmployeesPage from './pages/home-page/employees-page';


ReactDOM.render(
  <React.StrictMode>
    <CssBaseline/>
    <EmployeesPage />
  </React.StrictMode>,
  document.getElementById('root')
)
