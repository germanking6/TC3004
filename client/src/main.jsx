import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import CssBaseline from '@mui/material/CssBaseline';
import { UserProvider } from './context/AuthContext';


ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <CssBaseline />
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
